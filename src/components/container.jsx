'use client';
import React from 'react';
import Map from './map';
import styles from './map.module.css';

const LegendOptions = [
    'All Cases',
    'Dairy Farms',
    'Poultry Farms',
    'Wild Birds',
    'Wildlife',
];

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

export default function Container() {
    // map container has the controls and the key for the map

    const [selectedLegend, setSelectedLegend] = React.useState(LegendOptions[0]);
    const [selectedWildlife, setSelectedWildlife] = React.useState(WildlifeOptions[0]);

    const handleLegendChange = (event) => {
        setSelectedLegend(event.target.value);
    };

    const handleWildlifeChange = (event) => {
        setSelectedWildlife(event.target.value);
    }

    const [sidebarWidth, setSidebarWidth] = React.useState(300);
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
            <div style={{ flex: `0 0 ${sidebarWidth}px` }} className={styles.legend}>
                <h2>Legend</h2>
                <select value={selectedLegend} onChange={handleLegendChange}>
                    {LegendOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                { selectedLegend == 'Wildlife' ?
                <div className={styles.wildlifeLegend}> <h2>Wildlife</h2>
                <select value={selectedWildlife} onChange={handleWildlifeChange}>
                    {WildlifeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                { selectedWildlife == 'All Species' ?
                <div className={styles.legendKey}><h2>Key</h2>
                    { WildlifeOptions.slice(1).map((key) => (
                        <div key={key} className={styles.legendItem}>
                            <div className={styles.legendColor} style={{ backgroundColor: 'red' }} />
                            <div className={styles.legendLabel}>{key}</div>
                        </div>
                    ))} 
                </div> : null }
                </div> : null }
                { selectedLegend == LegendOptions[0] ? 
                <div className={styles.legendKey}><h2>Key</h2>
                    { LegendOptions.map((key) => (
                        <div key={key} className={styles.legendItem}>
                            <div className={styles.legendColor} style={{ backgroundColor: 'red' }} />
                            <div className={styles.legendLabel}>{key}</div>
                        </div>
                    ))}
                </div> : null}
            </div>

            <div ref={dragHandler} onMouseDown={startDrag} style={{background: dragging ? '#EEE' : '#FFF' }} className={styles.dragHandle} />
            
            <Map className={styles.map} />
        </div>
    );
};