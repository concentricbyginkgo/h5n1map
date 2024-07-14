'use client';
import React from 'react';
import Map from '../map/map';
import styles from './container.module.css';

import LoadingOverlay from './loading';
import Dot from './dot.jsx';

const LegendOptions = [
    'All Cases',
    'Dairy Farms',
    'Poultry Farms',
    'Wild Birds',
    'Wildlife',
    'Human',
];

const keyColor = {
    'Dairy Farms': 'purple',
    'Poultry Farms': 'red',
    'Wild Birds': 'blue',
    'Wildlife': 'green',
    'Human': 'orange',
};

const WildlifeOptions = [
    'All Species',
    'Red fox',
    'House mouse',
    'Bobcat',
    'Virginia opossum',
    'Raccoon',
    'Coyote',
    'Striped skunk',
    'Fisher',
    'Harbor seal',
    'Grey seal',
    'Skunk (unidentified)',
    'Bottlenose dolphin',
    'Amur Leopard',
    'Red Fox',
    'American black bear',
    'Kodiak bear',
    'Grizzly bear',
    'Mountain lion',
    'Amur tiger',
    'North American river otter',
    'American marten',
    'Polar bear',
    "Abert's squirrel",
    'Domestic cat',
    'American mink'
];


export default function Container() {
    // map container has the controls and the key for the map

    const [loading, setLoading] = React.useState(true);

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
                {/*selectedLegend == 'Wildlife' && selectedWildlife == 'All Species' ?
                    <div className={styles.wildlifeKeyWrapper + ' ' + styles.legendColumn + ' ' + styles.c3}>
                        <ul className={styles.wildlifeKey + ' ' + styles.key}>
                            {WildlifeOptions.slice(1).map((key) => (
                                <li key={key} className={styles.legendItem}>
                                    <Dot color={wColor[key]} />
                                    <div className={styles.legendLabel}>{key}</div>
                                </li>
                            ))}
                        </ul>
                    </div> : null*/}
            </div >

            <div ref={dragHandler} onMouseDown={startDrag} style={{ background: dragging ? '#EEF' : '#FFF' }} className={styles.dragHandle} />

            <Map className={styles.map} setLoading={setLoading} selectedLegend={selectedLegend} selectedWildlife={selectedWildlife} />
        </div >
    );
};