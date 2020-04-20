import MapChart from './components/MapChart';
import React from 'react';
import Timeline from './components/Timeline'
export default function Init() {
    // receiving file data from main.js

return (
      <div className="Init" >
        <div class="mapchart">
            <MapChart/>
        </div>
        <Timeline />  
      </div>
    );
}