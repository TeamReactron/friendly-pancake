import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import $ from 'jquery';


const UserInput = ({countyCallBack}) => {
    // ad-hoc query parameter
    const [state, setState] = useState('');
    const [county, setCounty] = useState('');
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);
    const [windowSpeed, setWindowSpeed] = useState(0);
    const [severity, setSeverity] = useState(0);
    const [stopSign, setStopSign] = useState(false);
    const [bump, setBump] = useState(false);
    const [aircode, setAircode] = useState(false);
    const [crossing, setCrossing] = useState(false);
    const [junction, setJunction] = useState(false);
    const [noExit, setNoExit] = useState(false);

    // ML prediction paramter
    const [humidity, setHumidity] = useState(0);
    const [temp, setTemp] = useState(0);
    const [distance, setDistance] = useState(0);
    const [visbility, setVisbility] = useState(0);

    var stateArr = ["AL","GA","OH","AK","AR","FL"];
    var countyArr = ["Dekalb","Fulton","Decatur","Alpharetta"];

    // set humidity value
    const handleHumidityChange = event => {
        setHumidity(event.target.value);
    }

    // set tempureture value
    const handleTempChange = event => {
        setTemp(event.target.value);
    }

    // set distance value 
    const handleDistanceChange = event => {
        setDistance(event.target.value);
    }

    const handleVisibilityChange = event => {
        setVisbility(event.target.value);
    }

    const handleCountyChange = event => {
        countyCallBack(event.target.value);
    }

    const handleSeverityChange = event => {
        setSeverity(event.target.value);
    }

    function severityClick() {
        var county = document.getElementById("county").value;;
        var state = document.getElementById("state").value;;
        // var severityMap = {"January":2.2,"Feburary":3,"March":4.3,"April":3.5,"May":1.4,
        //   "June":1.5,"July":4.3,"August":5,"September":2,"October":4,"November":3,"December":2};
        var sevKey = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var sevValue = [1.5,3.4,3,4,3.5,2,4.2,1,3,4,2,1.3];
        if (!(countyArr.includes(county)) || !(stateArr.includes(state))) {
          alert("Invalid state or county name");
        } else { 
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

    function searchClick(){
        var county = document.getElementById("county").value;;
        var state = document.getElementById("state").value;;
        if (!(countyArr.includes(county)) || !(stateArr.includes(state))) {
          alert("Invalid state or county name");
        } else {
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
                +"\nTotal Accident Number: " +toatl_count;
            alert(message);
        }
    }

    function predictionClick() {
        var temp = document.getElementById("temperature").value;
        var humi = document.getElementById("humidity").value;
        var county = document.getElementById("county").value;
        var state = document.getElementById("state").value;
        if (!(countyArr.includes(county)) || !(stateArr.includes(state))) {  
          // alert("Invalid state or county name");
          $.ajax({
              url: "LoadModel.py",
              type: 'GET',
              data : { 'temp': temp,
              'humi': humi
                },
                success : function(data){},
            }).done(function() {
             alert('finished python script');;
            });
        }  else {
            // need to pass parameters to ML 
            window.open('hmap.html')
        }
    }

    return (
        <div>
            <Typography color="textSecondary" gutterBottom>
              Get total number of accidents
            </Typography>
            <form>
              <TextField id='textinput'label="State" />
              <TextField id='textinput'label="County" onChange={event => handleCountyChange(event)}/>
              <TextField id='textinput' label="Year" />
              <TextField id='textinput'label="Month" />
              <TextField id='textinput'label="Day" />
              <TextField id='textinput'label="WindowSpeed" />
            </form>
            <label>Severity:
                <select id="severity-dropdown" >
                    <option value="level1">Level 1</option>
                    <option value="level2">Level 2</option> 
                    <option value="level3">Level 3</option>  
                    <option value="level4">Level 4</option>     
                </select> 
            </label>
            <label>StopSign:
              <select id="stopsign-dropdown" >
                  <option selected="selected">YES</option>  
                  <option selected="selected">NO</option> 
             </select> 
            </label> 
            <label>Bump:
                <select required id="bump-dropdown" >
                  <option selected="selected">YES</option>  
                  <option selected="selected">NO</option> 
                </select> 
            </label> 
            <label>Airport Code:
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
        <TextField label="Humidity" type="text" name="humidity" id = "humidity" pattern="[0-9]{0,100}" onChange={handleHumidityChange}/>
        <TextField label = "Temperature" type="text" name="temperature" id = "temperature" pattern="[0-9]{0,100}" onChange={handleTempChange}/>
        <TextField label = "Distance" type="text" name="distance" id = "distance" onChange={handleDistanceChange}/>
        <TextField label = "Visibility" type="text" name="visibility" id="visibility" onChange={handleVisibilityChange}/>
       <Button id='predictionbutton' variant="contained" onClick={predictionClick}>Predict</Button>
    </form> 
        </div>
    )

}
export default UserInput