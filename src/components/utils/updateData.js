import states from '../../../public/data/states.csv';
import counties from '../../../public/data/countycodes.csv';

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

export default async function updateData(human, animal) {
    // parse the csv files
    // var states = parse(stateData, { columns: true });
    // var counties = parse(countyData, { columns: true });


    // fix animal data
    // remove "APHIS - HPAI Detections in " from the source column
    animal.forEach(function (row) {
        row.source = row.source.replace('APHIS - HPAI Detections in ', '');


        // change 'Mammals' source to 'Wildlife' 

        // if null, set to empty string
        if (!row.source) {
            return;
        } else {
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
        }


        // change unicode hyphens to normal hyphens

        if (!row.county) {
            row.county = '';
        } else {
            row.county = row.county.replace('–', '-');

            // change Clarke County to Clark County, only in washington

            if (row.county === 'Clarke' && row.state && row.state === 'Washington') {
                row.county = 'Clark';
            }


            // change Stutsman and Dickey South Dakota to North Dakota

            if (row.county === 'Stutsman' && row.state && row.state === 'South Dakota') {
                row.state = 'North Dakota';
            }
            if (row.county === 'Dickey' && row.state && row.state === 'South Dakota') {
                row.state = 'North Dakota';
            }
            // change Kewanee to Kewaunee

            if (row.county === 'Kewanee') {
                row.county = 'Kewaunee';
            }


            // sometimes a space in DeSoto and LaSalle (there are more than one) 
            // Louisiana DeSoto to De Soto

            if (row.county === 'DeSoto' && row.state && row.state === 'Louisiana') {
                row.county = 'De Soto';
            }

            // ms and fl De Soto to DeSoto
            if (row.county === 'De Soto' && row.state && row.state === 'Mississippi') {
                row.county = 'DeSoto';
            }
            if (row.county === 'De Soto' && row.state && row.state === 'Florida') {
                row.county = 'DeSoto';
            }

            // Illinois La Salle to LaSalle
            if (row.county === 'La Salle' && row.state && row.state === 'Illinois') {
                row.county = 'LaSalle';
            }

            // Texas and louisiana La Salle
            if (row.county === 'LaSalle' && row.state && row.state === 'Texas') {
                row.county = 'La Salle';
            }
            if (row.county === 'LaSalle' && row.state && row.state === 'Louisiana') {
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
        }

        if (!row.state) {
            row.state = '';
        } else if (row.state === 'michigan') {
            // replace michigan with Michigan
            row.state = 'Michigan';
        }
    });

    var human_locations = {};
    human.forEach(function (row) {
        // fix human data
        // remove event_guid, disease, pathogen, country columns
        if (row.event_guid) {
            delete row.event_guid;
        }
        if (row.disease) {
            delete row.disease;
        }
        if (row.pathogen) {
            delete row.pathogen;
        }
        if (row.country) {
            delete row.country;
        }

        if (!row.date_reported) {
            row.date_detected = '';
        } else {
            // rename date_reported to date_detected
            row.date_detected = row.date_reported;
            delete row.date_reported;
        }

        // rename admin areas
        if (row.administrative_area_level_1) {
            row.state = row.administrative_area_level_1
            delete row.administrative_area_level_1;
        }

        if (row.administrative_area_level_2) {
            row.county = row.administrative_area_level_2;
            delete row.administrative_area_level_2;
        }

        // replace event 'Novel Influenza A (H5N1)_United States_' with ''
        if (row.event) {
            row.event = row.event.replace('Novel Influenza A (H5N1)_United States_', '');
        }

        // create a source column for human and fill with "Human"
        row.source = 'Human';

        // locations can be county level or state level, disregard country level
        // (and we have some states that have county level data and state level data)

        if (!row.state || row.state == '') {
            // skip rest of this loop
            return;
        }
        var key;
        let state = row.state;
        if (!row.county || row.county == '') {
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
            if (combinedData[i].county === 'Baltimore city' && combinedData[i].abbreviation === 'MD') {
                console.log('baltimore city');
                combinedData[i].county = 'baltimore city';
            } else if (combinedData[i].county === 'St Louis city' && combinedData[i].abbreviation === 'MO') {
                console.log('st louis city');
                combinedData[i].county = 'st louis city';
            } else if (combinedData[i].county === 'Roanoke city' && combinedData[i].abbreviation === 'VA') {
                console.log('roanoke city');
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
    counties.forEach(function (row) {
        for (let j = 0; j < remove.length; j++) {
            if (row.county === 'Baltimore city' && row.abbreviation === 'MD') {
                console.log('baltimore city');
                row.county = 'baltimore city';
            } else if (row.county === 'St Louis city' && row.abbreviation === 'MO') {
                console.log('st louis city');
                row.county = 'st louis city';
            } else if (row.county === 'Roanoke city' && row.abbreviation === 'VA') {
                console.log('roanoke city');
                row.county = 'roanoke city';
            } else {
                row.county = row.county.replace(remove[j], '');
            }
        }

        // strip and lowercase county name
        row.county = row.county.replace(/[^a-zA-Z\s'-]/g, '').toLowerCase().trim();

        // remove periods
        row.county = row.county.replace(/\./g, '');

        // ensure county code is 5 digits with leading zeros
        // convert to string
        row.id = row.id.toString().padStart(5, '0');
    });

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
        columns.forEach(column => {
            if (combinedData[i][column]) {
                row += combinedData[i][column] + ',';
            } else {
                row += ',';
            }
        });

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


    return js;
}