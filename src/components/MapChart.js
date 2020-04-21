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
import { hu, ro } from "date-fns/locale";
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
      function searchClick(){
        var county = document.getElementById("county").value;;
        var state = document.getElementById("state").value;;
        if (!(countyArr.includes(county)) || !(stateArr.includes(state))) {
        
          alert("Invalid state or county name");

        }  else {
          var year = document.getElementById("year").value;
          var month = document.getElementById("month").value;
          var day = document.getElementById("day").value;
          if (year != "" || month != "" || day != ""){
            var date = year + "/" + month + "/" + day;
          } else{
            var date = "";
          } 
          var windspeed = document.getElementById("windspeed").value;

          var severity = document.querySelector('#severity-dropdown').value;
          var stopsign = document.querySelector('#stopsign-dropdown').value; 
          var bump = document.querySelector('#bump-dropdown').value; 
          var airportcode = document.querySelector('#airport-dropdown').value; 
          var crossing = document.querySelector('#crossing-dropdown').value;
          var junction = document.querySelector('#junction-dropdown').value; 
          var noexit = document.querySelector('#exit-dropdown').value; 
          var railway = document.querySelector('#railway-dropdown').value; 
          var calming = document.querySelector('#calming-dropdown').value; 
          var roundabout = document.querySelector('#roundabout-dropdown').value; 
          var signal = document.querySelector('#signal-dropdown').value;  
          var loop  = document.querySelector('#loop-dropdown').value; 
          

          var toatl_count = Math.round(Math.random()*300 + 5); 

          var message = "State: "+state +"\nCounty: "+ county + "\nDate: "+date + "\nWind Speed: "+windspeed
             +"\nSeverity: " + severity + "\nStopSign: " + stopsign + "\nBump: " + bump
              + "\nAirport Code: "+airportcode + "\nCrossing: "+crossing+ "\nJunction: "+junction
              + "\nNo Exit: " + noexit + "\nRailway: " + railway + "\nTraffic Calming: "+calming
              + "\n Roundabout: "+roundabout + "\nTaffic Signal: "+signal+ "\nTraffic Loop: " +loop 
              +"\nTotal Accident Number: " +toatl_count
          ;
          alert(message);
     
        }
        

      }


      function severityClick(){
        var county = document.getElementById("county").value;;
        var state = document.getElementById("state").value;;
        // var severityMap = {"January":2.2,"Feburary":3,"March":4.3,"April":3.5,"May":1.4,
        //   "June":1.5,"July":4.3,"August":5,"September":2,"October":4,"November":3,"December":2};
        var sevKey = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var sevValue = [1.5,3.4,3,4,3.5,2,4.2,1,3,4,2,1.3];
        if (!(countyArr.includes(county)) || !(stateArr.includes(state))) {
        
          alert("Invalid state or county name");

        }  else { 
          var message = ""
      

          for (var i = 0; i < 12; i++) {
              message = message + sevKey[i] +": "+ sevValue[i] +"\n"
          }
          var arr = sevValue;
          const arrMax = arr => Math.max(...arr);
          const arrAvg = arr => arr.reduce((a,b) => a + b, 0)
          const arrMin = arr => Math.min(...arr);

          message = message + "Min: " + arrMin(arr) + "\nMax: " + arrMax(arr) + "\nAvg: "+arrAvg(arr);
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
      <TextField id='year'label="Year" />
      <TextField id='month'label="Month" />
      <TextField id='day'label="Day" />
      <TextField id='windspeed'label="WindowSpeed" />
    
    </form> 
    <form>
    <label>
        Severity:
        <select   id="severity-dropdown" >
        <option value="level1">Level 1</option>
        <option value="level2">Level 2</option> 
        <option value="level3">Level 3</option>  
        <option value="level4">Level 4</option>     
        </select> 
        </label> 
    <label>
        StopSign:
      <select id="stopsign-dropdown" >
        <option selected="selected">YES</option>  
        <option selected="selected">NO</option> 
        </select> 
        </label> 
        <label>
        Bump:
      <select required id="bump-dropdown" >
        <option selected="selected">YES</option>  
        <option selected="selected">NO</option> 
        </select> 
        </label> 
        <label>
        Airport Code:
      <select required id="airport-dropdown" >
        <option selected="selected">YES</option>  
        <option selected="selected">NO</option> 
        </select> 
        </label> 
        <label>
        Crossing:
      <select required id="crossing-dropdown" >
        <option selected="selected">YES</option>  
        <option selected="selected">NO</option> 
        </select> 
        </label> 
        <label>
        Junction:
      <select required id="junction-dropdown" >
        <option selected="selected">YES</option>  
        <option selected="selected">NO</option> 
        </select> 
        </label>
        <Button variant="contained" onClick={severityClick}>Avg Severity</Button>
    </form>
    <form>
    <label>
        No Exit:
      <select required id="exit-dropdown" >
        <option selected="selected">YES</option>  
        <option selected="selected">NO</option> 
        </select> 
        </label> 
        <label>
        Railway:
      <select required id="railway-dropdown" >
        <option selected="selected">YES</option>  
        <option selected="selected">NO</option> 
        </select> 
        </label>
        <label>
        Traffic Calming:
      <select required id="calming-dropdown" >
        <option selected="selected">YES</option>  
        <option selected="selected">NO</option> 
        </select> 
        </label>
        <label>
        Roundabout:
      <select required id="roundabout-dropdown" >
        <option selected="selected">YES</option>  
        <option selected="selected">NO</option> 
        </select> 
        </label>
        <label>
        Traffic Signal:
      <select required id="signal-dropdown" >
        <option selected="selected">YES</option>  
        <option selected="selected">NO</option> 
        </select> 
        </label>
        <label>
        Traffic Loop:
      <select required id="loop-dropdown" >
        <option selected="selected">YES</option>  
        <option selected="selected">NO</option> 
        </select> 
        </label>

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