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
import allStates from "../data/allstates.json";
import { hu } from "date-fns/locale";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";




const MapChart = ({months}) => {
  //////////////
// read from api
  var stateArr = ["AL","GA","OH","AK","AR","FL"];
  var countyArr = ["Dekalb","Fulton","Decatur"];
 



  
 
  

  const [data, setData] = useState([]);
  useEffect(() => {
    csv("/sample3.csv").then(county => {
      setData(county);
    })
  }, []);

  const colorScale = scaleQuantile()
      .domain(data.map(d => d.unemployment_rate))
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
        console.log(showDate);
        return showDate
      }
      function searchClick(){
        var county = document.getElementById("county").value;;
        var state = document.getElementById("state").value;;
        if (!(countyArr.includes(county)) || !(stateArr.includes(state))) {
        
          alert("Invalid state or county name");

        }  else {
          var date = document.getElementById("date").value;
          var toatl_count = Math.round(Math.random()*3 + 5); 
          var message = "State: "+state +"\nCounty: "+ county + "\nDate: "+date+"\nTotal Accident Number: "+toatl_count;
          alert(message);
     
        }
        

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
            if (cur) {
              let date_str = cur.date;
              cur.date = new Date(date_str);
              console.log(cur.date);
            }
            // console.log(data)
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={cur && cur.date <= calculateDate() ? colorScale(cur.unemployment_rate) : "#EEE"}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
    
    <form >
      <label>
        State:
        <input type="text" name="state" id = "state" />
      </label>
      <label>
        County:
        <input type="text" name="county" id = "county" />
      </label>
      <label>
        Date:
        <input type="text" name="date" id = "date" />
      </label>
      <button id = 'searchbutton' onClick={searchClick}>Search</button>
      </form> 
    
     <form>
      <label>
        Humidity:
        <input type="text" name="humidity" id = "humidity" pattern="[0-9]{0,100}" />
      </label>
      <label>
        Temperature:
        <input type="text" name="temperature" id = "temperature" pattern="[0-9]{0,100}" />
      </label>
      <button id = 'predictionbutton' onClick={predictionClick}>Predict</button>
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