'use client';
import React from 'react';
import Map from './map';
import styles from './map.css';

const LegendOptions = [
    'All Cases',
    'Dairy Farms',
    'Poultry Farms',
    'Wild Birds',
    'Wildlife',
];

const WildlifeDisplayLength = 14;
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

    const startDrag = () => {
        setDragging(true);
    };

    React.useEffect(() => {

        const doDrag = (e) => {
            if (!dragging) return;
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
        <div className='container'>
            <div style={{ flex: `0 0 ${sidebarWidth}px` }} className='legend'>
                <h2>Legend</h2>
                <select value={selectedLegend} onChange={handleLegendChange}>
                    {LegendOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <h2>Wildlife</h2>
                <select value={selectedWildlife} onChange={handleWildlifeChange}>
                    {WildlifeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div ref={dragHandler} onMouseDown={startDrag} style={{ cursor: 'col-resize', padding: '2px', background: dragging ? '#555' : '#888' }} />
            <Map className='map' />
        </div>
    );
};