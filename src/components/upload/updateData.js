//const fs = require('fs').promises;
//const { parse } = require('csv-parse/sync');
import fs from 'node:fs/promises';
import { parse } from 'csv-parse/sync';

// these paths are for testing when running the script directly
// const source = '../../../public/data/';
// const dest = '../../../public/newData/';
// when running the server, /public is the root
const source = '/data/';
const dest = '/newData/';
const animalFile = 'combined_h5n1_animal_surveillance_data.csv';
const humanFile = 'H5N1_human_surveillance_data.csv';
const stateFile = 'states.csv';
const countyFile = 'countycodes.csv';

function compare_recursive(l1, l2, max, index = 0) {
    const max_index = 2;

    // compares index, if they are equal, compare the next index
    if (l1[index] === l2[index]) {
        if (index === max_index) {
            return l1;
        } else {
            return compare_recursive(l1, l2, max, index + 1);
        }
    } else {
        if (max) {
            if (l1[index] > l2[index]) {
                // l1 is greater
                return l1;
            } else {
                return l2;
            }
        } else {
            if (l1[index] < l2[index]) {
                // l1 is less
                return l1;
            } else {
                return l2;
            }
        }
    }
}

function date_comparison(row, max = true) {
    // columns
    const d1 = 'date_occurred_low_end';
    const d2 = 'date_occurred_high_end';
    const d3 = 'date_detected';

    // dates are in the format year-mt-dy
    const date1 = row[d1].split('-');
    const date2 = row[d2].split('-');
    const date3 = row[d3].split('-');
    
    // compare 1 and 2
    const date = compare_recursive(date1, date2, max);
    // compare 1 and 3
    return compare_recursive(date, date3, max);
}

function compare_json_recursive(obj1, obj2, differences = {obj1: {}, obj2: {}}) {
    // for each key in obj1, make sure it exists in obj2
    for (const key of Object.keys(obj1)) {
        if (obj2[key] === undefined) {
            // if it doesn't exist, add it to differences
            differences.obj1[key] = obj1[key];

        } else if (Array.isArray(obj1[key])) {
            // if it does exist and is an array, compare the arrays
            if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
                differences.obj1[key] = obj1[key];
                differences.obj2[key] = obj2[key];
            }
        } else if (typeof obj1[key] === 'object' && obj1[key] !== null) {
            // if it does exist and is an object, compare the objects
            differences = compare_json_recursive(obj1[key], obj2[key], differences);
        } else {
            // if it does exist and is a primitive, compare the primitives
            if (obj1[key] !== obj2[key]) {
                differences.obj1[key] = obj1[key];
                differences.obj2[key] = obj2[key];
            }
        }
    }
    // for each key in obj2, make sure it exists in obj1
    for (const key of Object.keys(obj2)) {
        if (obj1[key] === undefined) {
            // if it doesn't exist, add it to differences
            differences.obj2[key] = obj2[key];
        } else if (Array.isArray(obj2[key])) {
            // if it does exist and is an array, compare the arrays
            // sort the arrays before comparing
            if (JSON.stringify(obj2[key].sort()) !== JSON.stringify(obj1[key].sort())) {
                // make sure to add the arrays with a deep copy
                differences.obj1[key] = [...obj1[key]];
                differences.obj2[key] = [...obj2[key]];
            } 
        } else if (typeof obj2[key] === 'object' && obj2[key] !== null) {
            // if it does exist and is an object, compare the objects
            differences = compare_json_recursive(obj2[key], obj1[key], differences);
        } else {
            // if it does exist and is a primitive, compare the primitives
            if (obj2[key] !== obj1[key]) {
                differences.obj1[key] = obj1[key];
                differences.obj2[key] = obj2[key];
            }
        }
    }
    return differences;         
}

function sort_json_recursive(obj) {
    if (Array.isArray(obj)) {
        return obj.sort();
    } else if (typeof obj === 'object' && obj !== null) {
        const sorted = {};
        for (const key of Object.keys(obj).sort()) {
            sorted[key] = sort_json_recursive(obj[key]);
        }
        return sorted;
    } else {
        return obj;
    }
}

export default async function updateData() {

    const animalData = await fs.readFile(source + animalFile, 'utf-8');
    const humanData = await fs.readFile(source + humanFile, 'utf-8');
    const stateData = await fs.readFile(source + stateFile, 'utf-8');
    const countyData = await fs.readFile(source + countyFile, 'utf-8');

    var animal = parse(animalData, { columns: true });
    var human = parse(humanData, { columns: true });
    var states = parse(stateData, { columns: true });
    var counties = parse(countyData, { columns: true });

    // fix animal data
    // remove "APHIS - HPAI Detections in " from the source column
    animal.forEach(function (row) {
        row.source = row.source.replace('APHIS - HPAI Detections in ', '');


        // change 'Mammals' source to 'Wildlife' 

        if (row.source === 'Mammals') {
            row.source = 'Wildlife';
        }

        // replace 'Livestock' with 'Dairy Farms' 

        if (row.source === 'Livestock') {
            row.source = 'Dairy Farms';
        }

        // replace 'Commercial and Backyard Flocks' with 'Poultry Farms'

        if (row.source === 'Commercial and Backyard Flocks') {
            row.source = 'Poultry Farms';
        }

        // change unicode hyphens to normal hyphens

        row.county = row.county.replace('–', '-');

        // change Clarke County to Clark County, only in washington

        if (row.county === 'Clarke' && row.state === 'Washington') {
            row.county = 'Clark';
        }


        // change Stutsman and Dickey South Dakota to North Dakota

        if (row.county === 'Stutsman' && row.state === 'South Dakota') {
            row.state = 'North Dakota';
        }
        if (row.county === 'Dickey' && row.state === 'South Dakota') {
            row.state = 'North Dakota';
        }
        // change Kewanee to Kewaunee

        if (row.county === 'Kewanee') {
            row.county = 'Kewaunee';
        }


        // sometimes a space in DeSoto and LaSalle (there are more than one) 
        // Louisiana DeSoto to De Soto

        if (row.county === 'DeSoto' && row.state === 'Louisiana') {
            row.county = 'De Soto';
        }

        // ms and fl De Soto to DeSoto
        if (row.county === 'De Soto' && row.state === 'Mississippi') {
            row.county = 'DeSoto';
        }
        if (row.county === 'De Soto' && row.state === 'Florida') {
            row.county = 'DeSoto';
        }

        // Illinois La Salle to LaSalle
        if (row.county === 'La Salle' && row.state === 'Illinois') {
            row.county = 'LaSalle';
        }

        // Texas and louisiana La Salle
        if (row.county === 'LaSalle' && row.state === 'Texas') {
            row.county = 'La Salle';
        }
        if (row.county === 'LaSalle' && row.state === 'Louisiana') {
            row.county = 'La Salle';
        }

        // Matanuska Susitna to Matanuska-Susitna
        if (row.county === 'Matanuska Susitna') {
            row.county = 'Matanuska-Susitna';
        }

        // Chugach to Valdez-Cordova, as they were split in 2019
        if (row.county === 'Chugach') {
            row.county = 'Valdez-Cordova';
        }

        // Matanuska-Sustina to Matanuska-Susitna
        if (row.county === 'Matanuska-Sustina') {
            row.county = 'Matanuska-Susitna';
        }

        // Saint Croix to St Croix
        if (row.county === 'Saint Croix') {
            row.county = 'St Croix';
        }

        // St. Mary to St Mary
        if (row.county === 'St. Mary') {
            row.county = 'St Mary';
        }

        // Rensselear to Rensselaer
        if (row.county === 'Rensselear') {
            row.county = 'Rensselaer';
        }

        // Wanship to Summit (Wanship is a census-designated place in Summit County, Utah)
        if (row.county === 'Wanship') {
            row.county = 'Summit';
        }

        // replace Macon Ohio with Brown ( macon is a region in brown county)
        if (row.county === 'Macon' && row.state === 'Ohio') {
            row.county = 'Brown';
        }

        // replace michigan with Michigan
        if (row.state === 'michigan') {
            row.state = 'Michigan';
        }
    });


    var human_locations = {};
    human.forEach(function (row) {
        // fix human data
        // remove event_guid, disease, pathogen, country columns
        delete row.event_guid;
        delete row.disease;
        delete row.pathogen;
        delete row.country;

        // rename date_reported to date_detected
        row.date_detected = row.date_reported;
        delete row.date_reported;

        // rename admin areas
        row.state = row.administrative_area_level_1
        delete row.administrative_area_level_1;
        row.county = row.administrative_area_level_2;
        delete row.administrative_area_level_2;
        
        // replace event 'Novel Influenza A (H5N1)_United States_' with ''
        row.event = row.event.replace('Novel Influenza A (H5N1)_United States_', '');

        // create a source column for human and fill with "Human"
        row.source = 'Human';

        // locations can be county level or state level, disregard country level
        // (and we have some states that have county level data and state level data)

        if (row.state === '') {
            // skip rest of this loop
            return;
        }
        var key;
        let state = row.state;
        if (row.county == '') {
            // state as string to match other keys
            key = `${state}`;
        } else {
            key = state + ', ' + row.county;
        }

        if (human_locations[key] === undefined) {
            human_locations[key] = { 'date_max': date_comparison(row), 'date_min': date_comparison(row, false), 'cuml_cases': row.cuml_cases };
        } else if (human_locations[key].date_max < date_comparison(row)) {
            human_locations[key] = { 'date_max': date_comparison(row), 'date_min': date_comparison(row, false), 'cuml_cases': row.cuml_cases };
        }
    });
    // create new empty human data sheet
    var new_human = [];
    for (var [key, value] of Object.entries(human_locations)) {
        if (key.includes(',')) {
            var sp = key.split(',');
            var state = sp[0];
            var county = sp[1];
        } else {
            var state = key;
            var county = '';
        }
        // join dates with a hyphen
        let date_max = value.date_max.join('-');
        let date_min = value.date_min.join('-');
        let cuml_cases = value.cuml_cases;

        for (var i = 0; i < cuml_cases; i++) {
            const new_row = {
                'date_occurred_low_end': date_min,
                'date_occurred_high_end': date_max,
                'source': 'Human',
                'state': state,
                'county': county,
                'cuml_cases': cuml_cases
            };
            new_human.push(new_row);
        }
    }
    
    // combine animal and human data
    const combinedData = animal.concat(new_human);

    // add state abbreviations
    combinedData.forEach(function (row) {
        const state = states.find(state => state.state === row.state);
        if (state) {
            row.abbreviation = state.abbreviation;
        }
        delete row.state;
    });


    // standardize county names
    const remove = [' City and Borough', ' County', ' Borough', ' Parish', ' Municipality', ' City', ' Census Area', '.', ' city', ' town', ' village', ' Municipio',]
    // there are a few overlaps,
    // Baltimore County, Maryland and Baltimore city, Maryland
    // St Louis County, Missouri and St Louis city, Missouri
    // Roanoke County, Virginia and Roanoke city, Virginia
    for (let i = 0; i < combinedData.length; i++) {
        for (let j = 0; j < remove.length; j++) {
            // catch the exceptions
            if (combinedData[i].county === 'baltimore' && combinedData[i].abbreviation === 'MD') {
                combinedData[i].county = 'baltimore city';
            } else if (combinedData[i].county === 'st louis' && combinedData[i].abbreviation === 'MO') {
                combinedData[i].county = 'st louis city';
            } else if (combinedData[i].county === 'roanoke' && combinedData[i].abbreviation === 'VA') {
                combinedData[i].county = 'roanoke city';
            } else {
                combinedData[i].county = combinedData[i].county.replace(remove[j], '');
            }
        }
        
        // strip and lowercase county name
        combinedData[i].county = combinedData[i].county.replace(/[^a-zA-Z\s'-]/g, '').toLowerCase().trim();

        // remove periods
        combinedData[i].county = combinedData[i].county.replace(/\./g, '');

    }
    
    // do the same to countycodes
    for (let i = 0; i < counties.length; i++) {
        for (let j = 0; j < remove.length; j++) {
            counties[i].county = counties[i].county.replace(remove[j], '');
        }
        
        // strip and lowercase county name
        counties[i].county = counties[i].county.replace(/[^a-zA-Z\s'-]/g, '').toLowerCase().trim();

        // remove periods
        counties[i].county = counties[i].county.replace(/\./g, '');

        // ensure county code is 5 digits with leading zeros
        counties[i].id = counties[i].id.padStart(5, '0');
    }

    // add county codes
    combinedData.forEach(function (row) {
        const county = counties.find(county => county.county === row.county && county.abbreviation === row.abbreviation);
        if (county) {
            row.id = county.id;
        }
        // capitalize county name, for the first char and after a space
        row.county = row.county.replace(/\b\w/g, l => l.toUpperCase());
    });

    // get unique sources
    const sources = [...new Set(combinedData.map(row => row.source))];    
    // source,county,species_or_flock_type,flock_size,hpai_strain,outbreak_date,date_detected,date_collected,date_confirmed,woah_classification,sampling_method,submitting_agency,date_occurred_low_end,date_occurred_high_end,cuml_cases,abbreviation,id
    const columns = ['source', 'county', 'species_or_flock_type', 'flock_size', 'hpai_strain', 'outbreak_date', 'date_detected', 'date_collected', 'date_confirmed', 'woah_classification', 'sampling_method', 'submitting_agency', 'date_occurred_low_end', 'date_occurred_high_end', 'cuml_cases', 'abbreviation', 'id'];
    var js = {};
    // for each county in combinedData, group by id
    for (let i = 0; i < combinedData.length; i++) {
        let entry = {};
        for (let source of sources) {
            // if this county isnt in js, entry = []
            if (!combinedData[i].id && !js[""]) {
                entry[source] = [];
            } else if (!combinedData[i].id) {
                entry = js[""];
            } else if (!js[combinedData[i].id]) {
                entry[source] = [];
            } else {
                entry = js[combinedData[i].id];
            }
        }
        if (!entry.name) {
            entry.name = combinedData[i].county;
        }
        // turn the row into a comma separated string, making sure to leave empty fields as empty
        let row = '';
        for (column of columns) {
            if (combinedData[i][column]) {
                row += combinedData[i][column] + ',';
            } else {
                row += ',';
            }
        }

        // remove trailing comma
        row = row.slice(0, -1);
                
        // add the row to the entry
        entry[combinedData[i].source].push(row);
        if (!combinedData[i].id) {
            js[""] = entry;
        } else {
            js[combinedData[i].id] = entry;
        }
    }

    js = sort_json_recursive(js);

    //if newData folder doesn't exist, create it
    try {
        await fs.mkdir(dest);
    } catch (error) {
        if (error.code !== 'EEXIST') {
            throw error;
        }
    }
    //write json to dest folder
    await fs.writeFile(dest + 'combined_data.json', JSON.stringify(js, null, 2));

}

async function checkData() {
    // load both files
    const oldData = await fs.readFile(source + 'combined_data.json', 'utf-8');
    const newData = await fs.readFile(dest + 'combined_data.json', 'utf-8');

    // parse both files
    const oldJson = JSON.parse(oldData);
    const newJson = JSON.parse(newData);

    // sort both files
    const oldSorted = sort_json_recursive(oldJson);
    const newSorted = sort_json_recursive(newJson);

    // compare the sorted files
    const differences = compare_json_recursive(oldSorted, newSorted);
    console.log(differences);
}

async function save_original_sorted() {
    const data = await fs.readFile(source + 'combined_data.json', 'utf-8');
    const json = JSON.parse(data);
    const sorted = sort_json_recursive(json);
    await fs.writeFile(dest + 'old_data_sorted.json', JSON.stringify(sorted, null, 2));
}

// save_original_sorted();
// updateData();
// checkData();