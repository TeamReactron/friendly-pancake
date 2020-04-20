import MapChart from './components/MapChart';
import React from 'react';
export default function Init() {
    // receiving file data from main.js
    // var countytext = document.getElementById('county');
    // var statetext = document.getElementById('state');
    // var accidenttext = document.getElementById('accident'); 
    // var temperaturetext =  document.getElementById('temperature').value;
    // var humiditytext =  document.getElementById('humidity').value;
    // function predictionClick(){
    //   console.log(temperaturetext);
    //   console.log(humiditytext);
    // }
return (
      <div className="Init" >
        <div class="mapchart">
            <MapChart/>
        </div>    
      </div>
    );
}