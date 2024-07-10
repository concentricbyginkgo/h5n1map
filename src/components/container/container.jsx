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
];

const keyColor = {
    'Dairy Farms': 'blue',
    'Poultry Farms': 'green',
    'Wild Birds': 'orange',
    'Wildlife': 'red',
};

const WildlifeOptions = [
    'All Species',
    'Big cat (Captive)',
    'Domestic Cat*',
    'Bobcat',
    'Mountain Lion',
    'Black Bear',
    'Brown Bear',
    'Polar Bear',
    'Bottlenose Dolphin',
    'Grey Seal',
    'Harbor Seal',
    'Coyote',
    'Red Fox',
    'American Marten',
    'Horse',
    'Moose',
    'White-tailed Deer'
];

const wColor = {
    'Big cat (Captive)': 'blue',
    'Domestic Cat*': 'green',
    'Bobcat': 'orange',
    'Mountain Lion': 'red',
    'Black Bear': 'purple',
    'Brown Bear': 'pink',
    'Polar Bear': 'brown',
    'Bottlenose Dolphin': 'cyan',
    'Grey Seal': 'magenta',
    'Harbor Seal': 'yellow',
    'Coyote': 'lime',
    'Red Fox': 'teal',
    'American Marten': 'coral',
    'Horse': 'indigo',
    'Moose': 'violet',
    'White-tailed Deer': 'salmon',
};

export default function Container() {
    // map container has the controls and the key for the map

    const [loading, setLoading] = React.useState(true);

    const [selectedLegend, setSelectedLegend] = React.useState(LegendOptions[0]);
    const [selectedWildlife, setSelectedWildlife] = React.useState(WildlifeOptions[0]);

    const handleLegendChange = (event) => {
        setSelectedLegend(event.target.value);
    };

    const handleWildlifeChange = (event) => {
        setSelectedWildlife(event.target.value);
    }

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
                <h2>Avian Influenza H5N1</h2>
                <h2>Detection in Mammals</h2>
                <input type="radio" id="legendS" name="fav_language" value={LegendOptions[0]} onChange={handleLegendChange} size={LegendOptions.length} />
                <ul className={styles.legendList}>
                    {LegendOptions.map((option) => (
                        <li key={option} ><label className={option == selectedLegend ? styles.selectedLabel : ''} key={option} value={option} onClick={() => setSelectedLegend(option)}>{option}</label></li>
                    ))}
                </ul>
                {selectedLegend == 'Wildlife' ?
                    <div className={styles.wildlifeLegend}>
                        <input type="radio" id="wildlifeS" name="fav_language" value={WildlifeOptions[0]} onChange={handleWildlifeChange} size={WildlifeOptions.length} />

                        <div className={styles.wildlifeListWrapper + ' ' + styles.border}>
                            <ul className={styles.wildlifeList}>
                                {WildlifeOptions.map((option) => (
                                    <li onClick={() => setSelectedWildlife(option)} key={option} ><label className={option == selectedWildlife ? styles.selectedSubtle : ''} key={option} value={option} >{option}</label></li>
                                ))}
                            </ul>
                        </div>

                        {selectedWildlife == 'All Species' ? <div className={styles.wildlifeKeyWrapper}>
                            <ul className={styles.wildlifeKey}>
                                {WildlifeOptions.slice(1).map((key) => (
                                    <li key={key} className={styles.legendItem}>
                                        <Dot color={wColor[key]} />
                                        <div className={styles.legendLabel}>{key}</div>
                                    </li>
                                ))}
                            </ul>
                        </div> : null}
                        
                    </div> : null}
                {selectedLegend == LegendOptions[0] ?
                    <ul className={styles.legendKey}>
                        {LegendOptions.slice(1).map((key) => (
                            <li key={key} className={styles.legendItem}>
                                <Dot color={keyColor[key]} />
                                <div className={styles.legendLabel}>{key}</div>
                            </li>
                        ))}
                    </ul> : null}
            </div>

            <div ref={dragHandler} onMouseDown={startDrag} style={{ background: dragging ? '#EEF' : '#FFF' }} className={styles.dragHandle} />

            <Map className={styles.map} setLoading={setLoading} selectedLegend={selectedLegend} selectedWildlife={selectedWildlife} />
        </div>
    );
};