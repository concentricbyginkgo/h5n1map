'use client';
import React from 'react';
import Map from '../map/map';
import styles from './container.module.css';

import LoadingOverlay from './loading';
import Dot from './dot.jsx';

import ScaleKey from '../scale/scale.jsx';

import allData from '../../../public/data/combined_data.json';

const LegendDefault = 'All Cases';
const WildlifeDefault = 'All Species';

const keyColor = {
    'Dairy Farms': '#519a8f',
    'Poultry Farms': '#7653a5',
    'Wild Birds': '#fc573e',
    'Wildlife': '#8fa429',
    'Human': '#f7c242',
};

function getDairyData(allData) {
    let dairyData = allData['']['Dairy Farms'];

    let dairyD = {};

    for (let line of dairyData) {
        let abbrev = line.split(',')
        abbrev = abbrev[abbrev.length - 2];

        dairyD[abbrev] = dairyD[abbrev] === undefined ? 1 : dairyD[abbrev] + 1;
    }

    return dairyD;
}

function getMax(allData, selectedLegend, selectedWildlife, WildlifeOptions, Maxes) {
    // selectedLegend == 'Wildlife' ? selectedWildlife == WildlifeOptions[0] ? Maxes['All Species'] : Maxes[selectedWildlife] : Maxes[selectedLegend]} stateCounty='county'
    if (selectedLegend == 'Wildlife') {
        if (selectedWildlife == WildlifeOptions[0]) {
            return Maxes['All Species'];
        } else {
            return Maxes[selectedWildlife];
        }
    } else if (selectedLegend == 'Dairy Farms') {
        let dairyD = getDairyData(allData);

        return Math.max(...Object.values(dairyD));
    }
    return Maxes[selectedLegend];
}



function dataIngest(data) {
    // allData json structure:
    // allData['countyID'] = { 'source': ['row1', 'row2', ...], 'name': 'countyName' }
    // maxMins = [[maxPoultry, 0], [maxWildBirds, 0], [maxWildlife, 0]]
    // maxes = { 'Dairy Farms': maxDairy, 'Poultry Farms': maxPoultry, 'Wild Birds': maxWildBirds, 'Human': maxHuman, 'All Cases': maxAll, 'All Species': maxAllSpecies, 'Otter': maxOtter}
    let maxes = {};
    let legendOptions = [LegendDefault];
    let wildlifeOptions = [WildlifeDefault];
    for (var entry in data) {
        var countyData = undefined;

        if (entry == '') {
            continue;
        } else {
            countyData = data[entry];
        }

        // base case
        if (Object.keys(maxes).length === 0) {
            for (const source of Object.keys(countyData)) {
                if (source != 'name') {
                    maxes[source] = 0;
                    legendOptions.push(source);
                }
            }
            maxes['All Cases'] = 0;
            maxes['All Species'] = 0;
        }

        var allmax = 0;
        for (const source of Object.keys(countyData)) {
            if (source != 'name') {
                if (countyData[source].length > maxes[source]) {
                    maxes[source] = countyData[source].length;
                }
                allmax += countyData[source].length;

                if (source == 'Wildlife') {
                    // wildlife is a list of comma separated strings: Wildlife,California,Mono,Mountain lion...
                    let specmax = 0;
                    for (const line of countyData[source]) {
                        const species = line.split(',')[2].trim() + '';
                        // if not in maxes, add it
                        if (!(species in maxes)) {
                            maxes[species] = 0;
                            wildlifeOptions.push(species);
                        }
                        if (countyData[source].length > maxes[species]) {
                            maxes[species] = countyData[source].length;
                            specmax = countyData[source].length;
                        }
                    }
                    if (specmax > maxes['All Species']) {
                        maxes['All Species'] = specmax;
                    }
                }
            }
        }
        if (allmax > maxes['All Cases']) {
            maxes['All Cases'] = allmax;
        }
    }
    return [maxes, legendOptions, wildlifeOptions];
}


export default function Container() {
    // map container has the controls and the key for the map

    const [loading, setLoading] = React.useState(true);

    const [Maxes, LegendOptions, WildlifeOptions] = dataIngest(allData);
    const [selectedLegend, setSelectedLegend] = React.useState(LegendOptions[0]);
    const [selectedWildlife, setSelectedWildlife] = React.useState(WildlifeOptions[0]);

    const [sidebarWidth, setSidebarWidth] = React.useState(typeof localStorage !== 'undefined' ? parseInt(localStorage.getItem('sidebarWidth')) || 420 : 420);
    const [dragging, setDragging] = React.useState(false);
    const dragHandler = React.useRef(null);

    const startDrag = (e) => {
        e.preventDefault();
        setDragging(true);
    };


    React.useEffect(() => {

        const doDrag = (e) => {
            if (!dragging) return;
            if (e.clientX < 200 || e.clientX > window.innerWidth - 200) return;
            setSidebarWidth(e.clientX);
        };

        const stopDrag = () => {
            //dispatch a resize event
            const event = new Event('resize');
            window.dispatchEvent(event);
            setDragging(false);
        };
        if (dragging) {
            window.addEventListener('mousemove', doDrag);
            window.addEventListener('mouseup', stopDrag);
        } else {
            window.removeEventListener('mousemove', doDrag);
            window.removeEventListener('mouseup', stopDrag);
        }
        return () => {
            window.removeEventListener('mousemove', doDrag);
            window.removeEventListener('mouseup', stopDrag);
        };
    }, [dragging]);

    React.useEffect(() => {
        // update to the client value after the component is mounted
        if (typeof localStorage !== 'undefined' && localStorage.getItem('sidebarWidth')) {
            const sidebarWidth = parseInt(localStorage.getItem('sidebarWidth'));
            if (sidebarWidth) {
                setSidebarWidth(sidebarWidth);
            }
        }
    }, []);

    let max = getMax(allData, selectedLegend, selectedWildlife, WildlifeOptions, Maxes);


    return (
        <div className={styles.container}>
            <LoadingOverlay loading={loading} />
            <div style={{ flex: `0 0 ${sidebarWidth}px` }} className={styles.legend}>
                <div className={styles.legendColumn + ' ' + styles.c1}>
                    <h2>Avian Influenza H5N1</h2>
                    <h2>Detection in Mammals</h2>
                    <input type="radio" id="legendS" name="fav_language" value={LegendOptions[0]} size={LegendOptions.length} />
                    <ul className={styles.legendList}>
                        {LegendOptions.map((option) => (
                            <li key={option} ><label className={option == selectedLegend ? styles.selectedLabel : ''} key={option} value={option} onClick={() => { console.log(option); setSelectedLegend(option); }}>{option}</label></li>
                        ))}
                    </ul>
                </div>
                {selectedLegend == LegendOptions[0] ?
                    <div className={styles.legendColumn + ' ' + styles.c2 + ' ' + styles.key}>
                        <ul className={styles.legendKey}>
                            {LegendOptions.slice(1).map((key) => (
                                <li key={key} className={styles.legendItem}>
                                    <Dot color={keyColor[key]} />
                                    <div className={styles.legendLabel}>{key}</div>
                                </li>
                            ))}
                        </ul>
                    </div> : null}
                {selectedLegend == 'Wildlife' ?
                    <div className={styles.wildlifeLegend + ' ' + styles.legendColumn + ' ' + styles.c2}>
                        <input type="radio" id="wildlifeS" name="fav_language" value={WildlifeOptions[0]} size={WildlifeOptions.length} />
                        <div className={styles.wildlifeListWrapper + ' ' + styles.border}>
                            <ul className={styles.wildlifeList}>
                                {WildlifeOptions.map((option) => (
                                    <li onClick={() => { console.log(option); setSelectedWildlife(option); }} key={option} ><label className={option == selectedWildlife ? styles.selectedSubtle : ''} key={option} value={option} >{option}</label></li>
                                ))}
                            </ul>
                        </div>
                    </div> : null}
                {selectedLegend != LegendOptions[0] ?
                    <div className={styles.scale + ' ' + styles.legendColumn + ' ' + styles.c1}>
                        <ScaleKey color={keyColor[selectedLegend]} max={max} />
                    </div> : null}
            </div >

            <div ref={dragHandler} onMouseDown={startDrag} style={{ background: dragging ? '#EEF' : '#FFF' }} className={styles.dragHandle} />

            <Map className={styles.map} setLoading={setLoading} selectedLegend={selectedLegend} selectedWildlife={selectedWildlife} allData={allData} color={ selectedLegend == 'All Cases' ? keyColor : keyColor[selectedLegend]} max={max} dairyData={getDairyData(allData)} />
        </div >
    );
};