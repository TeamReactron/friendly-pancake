import MapChart from './components/MapChart';
import React from 'react';
import Timeline from './components/Timeline'

export default function Init() {
    // receiving file data from main.js

return (
      <div id="Init" >
        <div id="mapchart">
            <MapChart/>
        </div> 
        <div id="timeline">
          <Timeline/>
        </div>        
      </div>
    );
}