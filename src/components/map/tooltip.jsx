'use client';
import React, { useEffect, useRef } from 'react';
import styles from './tooltip.module.css';

function textD(info) {
    // if info isnt iterable, return null

    let name = '';
    let sourcd = {};
    let earliestDate = null;
    let latestDate = null;
    for (let source of Object.keys(info)) {
        if (source != 'name' && source.length > 0) {
            for (let line of info[source]) {
                let data = line.split(','); // source,county,species_or_flock_type,flock_size,hpai_strain,outbreak_date,date_detected,date_collected,date_confirmed,woah_classification,sampling_method,submitting_agency,event,date_occurred_low_end,date_occurred_high_end,cases,confirmed_cases,suspected_cases,probable_cases,deaths,confirmed_deaths,suspected_deaths,probable_deaths,cuml_cases,cuml_confirmed_cases,cuml_suspected_cases,cuml_probable_cases,cuml_deaths,cuml_confirmed_deaths,cuml_suspected_deaths,cuml_probable_deaths,latitude,longitude,abbreviation,id
                if (name == '') {
                    name = info['name'] + ', ' + data[data.length - 2];
                }
                if (sourcd[source] == undefined) {
                    sourcd[source] = 1;
                } else {
                    sourcd[source] += 1;
                }
                let eDate = extractDate(true, data);
                let lDate = extractDate(false, data);

                if (earliestDate == null || eDate < earliestDate) {
                    earliestDate = eDate;
                }
                if (latestDate == null || lDate > latestDate) {
                    latestDate = lDate;
                }
            }
        }

    }

    // name in bold,
    // list of source: count
    // earliest date - latest date 
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedEarliestDate = earliestDate.toLocaleDateString('en-US', options);
    const formattedLatestDate = latestDate.toLocaleDateString('en-US', options);

    return [name, sourcd, formattedEarliestDate, formattedLatestDate];

}

function renderTextComponent([name, sourcd, formattedEarliestDate, formattedLatestDate]) {
    
    return (
        <div style={{ zIndex: 99999999999, whiteSpace: 'nowrap' }}>
            <h3>{name}</h3>
            <ul>
                {Object.keys(sourcd).map((source) => (
                    <li key={source}>{source}: {sourcd[source]}</li>
                ))}
            </ul>
            <p style={{ fontSize: '0.7em' }}>{formattedEarliestDate} - {formattedLatestDate}</p>
        </div>
    );
}

function extractDate(earlyLate = true, dataarr) {
    // columns we want to check:
    // outbreak_date,date_detected,date_collected,date_confirmed,date_occurred_low_end,date_occurred_high_end
    // 5,6,7,8,13,14
    // data is always mm/dd/yyyy, but sometimes the separator is a dash

    let alldates = [];
    for (let i = 5; i < 9; i++) {
        let date = dataarr[i].split('/');
        if (date.length == 1) {
            date = dataarr[i].split('-');
        }
        if (date.length == 3) {
            alldates.push(new Date(date[2], date[0], date[1]));
        }
    }

    if (alldates.length == 0) {
        return null;
    }

    alldates.sort((a, b) => a - b);
    if (earlyLate) {
        return alldates[0];
    } else {
        return alldates[alldates.length - 1];
    }
}

export default function Tooltip(props) {

    // get width and height for the tooltip
    const tooltipInfo = textD(props.info);
    let t1 = Object.keys(tooltipInfo[1]).length ? Object.keys(tooltipInfo[1]).length : 0;
    let t2 = tooltipInfo[2].length ? tooltipInfo[2].length : 0;
    let t3 = tooltipInfo[3].length ? tooltipInfo[3].length : 0;

    let heights = [110, 140, 250, 260, 300, 380, 440];
    let widthOnHeight = [180, 200, 210, 240, 280, 320, 360];

    let height = heights[t1];
    let width = widthOnHeight[t1];

    if (t2 + t3 > 28) {
        let over = (t2 + t3 - 28) * 10;
        width += over;
    }


    return (
        <div className={styles.tooltip} style={{ left: props.x + 'px', top: props.y + 'px', width: width + 'px', height: height + 'px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 278.9 140.52`} style={{ zIndex: 1, position: 'absolute', width: '100%', height: '100%' }}>
                <path
                    d="M268.31,140.52H25.45a10.68,10.68,0,0,1-10.59-10.77v-51a5.06,5.06,0,0,0-2.4-4.32L1.65,67.81a3,3,0,0,1,0-5l10.92-6.95a5.06,5.06,0,0,0,2.33-4.27V11A10.68,10.68,0,0,1,25.45.25H268.31A10.68,10.68,0,0,1,278.9,11V129.75A10.68,10.68,0,0,1,268.31,140.52Z"
                    fill="#fff" stroke="#0c0a10" strokeWidth="0.5" />
            </svg>
            <div className={styles.textContent} style={{ zIndex: 2, position: 'absolute', transform: 'translate(30px, -50%)' }}>
                {renderTextComponent(tooltipInfo)}
            </div>
        </div>
    );
}