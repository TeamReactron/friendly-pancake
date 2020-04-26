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
import api from '../api'



const UserInput = ({countyCallBack}) => {
    // ad-hoc query parameter
    const [state, setState] = useState('');
    const [county, setCounty] = useState('');
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);
    const [windowSpeed, setWindowSpeed] = useState(0);
    const [severity, setSeverity] = useState(0);
    const [stopSign, setStopSign] = useState('False');
    const [bump, setBump] = useState('False');
    const [crossing, setCrossing] = useState('False');
    const [junction, setJunction] = useState('False');
    const [noExit, setNoExit] = useState('False');
    const [signal, setSignal] = useState('False');
    // const express = require('express');
    // const http = require('http');
    // const router = express.Router();
    const {spawn} = require('child_process');
    // const app = express();
    // const port = 3000;
    // const pyFile = 'LoadModel.py';
    // const args = ['path1', 'path2', 'path3'];
    // args.unshift(pyFile);
    // const pyspawn = spawn('python3', args);

    // ML prediction paramter
    const [humidity, setHumidity] = useState(0);
    const [temp, setTemp] = useState(0);
    const [distance, setDistance] = useState(0);
    const [visbility, setVisbility] = useState(0);

    const style = {
      marginTop: '50px',
      marginBottom: '10px',
      marginRight: '5px',
      marginLeft: '5px'
    }

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
        setCounty(event.target.value);
        countyCallBack(event.target.value);
    }

    const handleStateChange = event => {
        setState(event.target.value);
    }

    const handleSignalChange = event => {
      setSignal(event.target.value);
    }

    const handleStopChange = event => {
      console.log(1)
      setStopSign(event.target.value);
      console.log(stopSign);
    }

    const handleSeverityChange = event => {
        setSeverity(event.target.value);
    }

    const handleYearChange = event => {
      setYear(event.target.value);
    }

    const handleMonthChange = event => {
      setMonth(event.target.value);
    }

    const handleDayChange = event => {
      setDay(event.target.value);
    }

    const handleBumpChange = event => {
      setBump(event.target.value);
    }

    const handleCrossingChange = event => {
      setCrossing(event.target.value);
    }

    const handleJunctionChange = event => {
      setJunction(event.target.value);
    }

    const handleNoExitChange = event => {
      setNoExit(event.target.value);
    }

    async function submitClick(){
      let param_date = '';
      param_date += year + '-' + month + '-' + day;
      await api.queryCountWithParam(param_date, county, state, bump, crossing, junction, noExit, stopSign, signal).then(result => {
        if (result.status === 200) {
          alert(result.data.data.length)
        } else  {
          alert(result.data.error)
        }
      })

    }

    function predictionClick() {
        var temp = document.getElementById("temperature").value;
        var humi = document.getElementById("humidity").value;
        // var county = document.getElementById("county").value;
        // var state = document.getElementById("state").value;
        // console.log(county);
        // console.log(state);
        // if (!(countyArr.includes(county)) || !(stateArr.includes(state))) {  
        if (1) { 
          // alert("Invalid state or county name");
          $.ajax({
              url: "http://127.0.0.1:5000/",
              type: 'POST',
              data : 
                // temp: $("Humidity").val(), humi: $("Temperature").val()
                JSON.stringify({
            'temp': temp,
              'humi': humi

                })}
            ).done(function(temp) {
                alert('finished python script');
            });
        }  else {
            // need to pass parameters to ML 
            window.open('hmap.html')
        }
        var path = require("path");
        var filename = path.resolve(__dirname, 'desktop','friendly-pancake', 'API', 'hmap.html');
        window.open('/API/hmap.html');
        alert(filename);


    }

    return (
        <div>
            <form>
              <TextField id='textinput'label="State" id = "state" onChange={event => handleStateChange(event)}/>
              <TextField id='textinput'label="County" id = "county" onChange={handleCountyChange}/>
              <TextField id='textinput' label="Year" id = "year" onChange={handleYearChange}/>
              <TextField id='textinput'label="Month" id = "month" onChange={handleMonthChange}/>
              <TextField id='textinput'label="Day" id = "day" onChange={handleDayChange}/>
              <TextField id='textinput'label="WindSpeed" id = "windspeed" />
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
              <select id="stopsign-dropdown" onChange={handleStopChange}>
                  <option selected="selected" value='True'>TRUE</option>  
                  <option selected="selected" value='False'>FALSE</option> 
             </select> 
            </label> 
            <label>Bump:
                <select required id="bump-dropdown" onChange={handleBumpChange}>
                  <option selected="selected" value='True'>TRUE</option>  
                  <option selected="selected" value='False'>FALSE</option> 
                </select> 
            </label>
        <label>
        Crossing:
      <select required id="crossing-dropdown" onChange={handleCrossingChange}>
        <option selected="selected" value='True'>TRUE</option>  
        <option selected="selected" value='False'>FALSE</option> 
        </select> 
        </label> 
        <label>
        Junction:
      <select required id="junction-dropdown" onChange={handleJunctionChange}>
        <option selected="selected" value='True'>TRUE</option>  
        <option selected="selected" value='False'>FALSE</option> 
        </select> 
        </label>
        <label>
        No Exit:
      <select required id="exit-dropdown" onChange={handleNoExitChange}>
        <option selected="selected" value='True'>TRUE</option>  
        <option selected="selected" value='False'>FALSE</option> 
        </select> 
        </label> 
        <label>
        Railway:
      <select required id="railway-dropdown" >
        <option selected="selected">TRUE</option>  
        <option selected="selected">FALSE</option> 
        </select> 
        </label>
        {/* <Button variant="contained" onClick={severityClick}>Avg Severity</Button> */}

    <form>
    
        <label>
        Traffic Calming:
      <select required id="calming-dropdown" >
        <option selected="selected">TRUE</option>  
        <option selected="selected">FALSE</option> 
        </select> 
        </label>
        <label>
        Roundabout:
      <select required id="roundabout-dropdown" >
        <option selected="selected">TRUE</option>  
        <option selected="selected">FALSE</option> 
        </select> 
        </label>
        <label>
        Traffic Signal:
      <select required id="signal-dropdown" onChange={handleSignalChange}>
        <option selected="selected" value='True'>TRUE</option>  
        <option selected="selected" value='False'>FALSE</option> 
        </select> 
        </label>
        <label>
        Traffic Loop:
      <select required id="loop-dropdown" >
        <option selected="selected">TRUE</option>  
        <option selected="selected">FALSE</option> 
        </select> 
        </label>   
    </form>
    <label>
    Get total number of accidents based on all above parameters:
    {/* <Typography color="textSecondary" gutterBottom>
              Get total number of accidents
            </Typography> */}
    <Button variant="contained" onClick={submitClick}>Submit</Button>
    </label>
    <form method="post" style={style}>
        <TextField label="Humidity" type="text" name="humidity" id = "humidity" pattern="[0-9]{0,100}" onChange={handleHumidityChange}/>
        <TextField label = "Temperature" type="text" name="temperature" id = "temperature" pattern="[0-9]{0,100}" onChange={handleTempChange}/>
        <TextField label = "Distance" type="text" name="distance" id = "distance" onChange={handleDistanceChange}/>
        <TextField label = "Visibility" type="text" name="visibility" id="visibility" onChange={handleVisibilityChange}/>
    </form> 
       <label>
          Get ML prediction based on weather conditions (Humidity, Temperature, Distance, Visibility):
       <Button id='predictionbutton' variant="contained" onClick={predictionClick}>Predict</Button>
       </label>
  </div>
    )

}
export default UserInput