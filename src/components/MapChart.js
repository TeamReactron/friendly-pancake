import React from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import allStates from "../data/allstates.json";
import { hu } from "date-fns/locale";
import { setSeconds } from "date-fns";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";




const MapChart = ({months}) => {
  //////////////
// read from api
  var stateArr = ["AL","GA","OH","AK","AR","FL"];
  var countyArr = ["Dekalb","Fulton","Decatur"];
 



  
 
  

  const[csvName, setCSVName] = useState('/Oct24.csv');
  const [data, setData] = useState([]);
  const [county, setCounty] = useState('');
  useEffect(() => {
      csv(csvName).then(county => {
        setData(county);
      })
    }, [csvName]); 
  

  const colorScale = scaleQuantile()
      .domain(data.map(d => d.count))
      .range([
        "#ffedea",
        "#ffcec5",
        "#ffad9f",
        "#ff8a75",
        "#ff5533",
        "#e2492d",
        "#be3d26",
        "#9a311f",
        "#782618"
      ])

      const calculateDate = () => {
        let minTime = new Date("2017/01/01");
        let showDate = new Date(minTime.getTime());
        showDate.setMonth(showDate.getMonth() + months);
        if (showDate <= new Date('2018-10-24')) {
          setCSVName('/Oct24.csv');
          console.log(csvName);
        } else {
          setCSVName('/employee_file.csv');
          console.log(csvName);
        }
        return showDate
      }

      const handleChange = event => {
        setCounty(event.target.value);
      }
      const searchClick = () => {
        alert(1)
      }

      function predictionClick() {
      
        var temp = document.getElementById("temperature").value;
        var humi = document.getElementById("humidity").value;
        var county = document.getElementById("county").value;;
        var state = document.getElementById("state").value;;
        console.log(typeof(county));
 
        console.log(county in countyArr);
        console.log(state);
        console.log(stateArr);
        if (!(countyArr.includes(county)) || !(stateArr.includes(state))) {
        
          alert("Invalid state or county name");

        }  else {
        // need to pass parameters to ML 
        console.log(temp);
        console.log(humi);
        console.log(county);
        console.log(state);
          window.open('hmap.html')
        }

      }

  return (
    <div>
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => 
          geographies.map(geo => {
            const cur = data.find(s => s.id === geo.id);
            // console.log(data)
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={cur && calculateDate() && (county === '' || cur.name === county) ? colorScale(cur.count) : "#EEE"}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
    
    <form >
      <TextField id='state'label="State" />
      <TextField id='county'label="County" onChange={event => handleChange(event)}/>
      <TextField id='date'label="Date" />
      <Button variant="contained" onClick={searchClick}>Submit</Button>
    </form> 
    
     <form>
        <TextField label="Humidity" type="text" name="humidity" id = "humidity" pattern="[0-9]{0,100}" />
        <TextField label = "Temperature" type="text" name="temperature" id = "temperature" pattern="[0-9]{0,100}" />
      <Button id='predictionbutton' variant="contained" onClick={predictionClick}>Predict</Button>
      </form> 
      
      
      {/* <div id="tooltip-container">
      <p><strong>State:</strong> <span id="state"></span></p>
      <p><strong>County:</strong><span id="county"></span></p>
      <p><strong>Total Accidents Number:</strong><span id="accident"></span></p>  
      </div> */}
     


    </div>
  );
};

export default MapChart;