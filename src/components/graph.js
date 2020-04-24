import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,BarChart, Bar
} from 'recharts';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import  { Component } from 'react'



const data = [
  {
    'month': 'Jan', 'accidents': 5
  },
  {
    'month': "Feb", 'accidents': 6
  },
  {
    'month': 'Mar', 'accidents': 3 
  },
  {
    'month': 'Apr', 'accidents': 9 
  },
  {
    'month': 'May', 'accidents': 4 
  },
  {
    'month': 'Jun', 'accidents': 3 
  },
  {
    'month': 'Jul', 'accidents': 10
  },
  {
    'month': 'Aug', 'accidents': 11 
  },
  {
    'month': 'Sep', 'accidents': 14 
  },
  {
    'month': 'Oct', 'accidents': 5 
  },
  {
    'month': 'Nov', 'accidents': 7 
  },
  {
    'month': 'Dec', 'accidents': 10 
  }
]

const data2 = [
  {month: 'Jan',  severity: 1.5},
  {month: 'Feb',  severity: 3.4},
  {month: 'Mar',   severity: 3},
  {month: 'Apr',  severity: 4},
  {month: 'May',   severity: 3.5},
  {month: 'Jun',   severity: 2},
  {month: 'Jul',   severity: 4.2},
  {month: 'Aug',   severity: 1},
  {month: 'Sep',  severity: 3},
  {month: 'Oct',   severity: 4},
  {month: 'Nov',  severity: 2},
  {month: 'Dec',  severity: 1.3},
];
const sevValue = [1.5,3.4,3,4,3.5,2,4.2,1,3,4,2,1.3];
var arr = sevValue;
const arrMax = arr => Math.max(...arr);
const arrAvg = arr => arr.reduce((a,b) => a + b, 0)
const arrMin = arr => Math.min(...arr);
const min = arrMin(arr);
const max = arrMax(arr);
const avg = arrAvg(arr);
const message ="Min: " + arrMin(arr) + "\nMax: " + arrMax(arr) + "\nAvg: "+arrAvg(arr);

const Graph = () => {

  const style = {
    marginTop: '50px',
    marginBottom: '10px',
    marginRight: '5px',
    marginLeft: '5px'
  }
  const [county, setCounty] = useState('');
  const [state, setState] = useState('');
  const [show, setShow] = useState(false);
  const [year, setYear] = useState(0);

  const handleCountyChange = event => {
    setCounty(event.target.value);
  }

  const handleStateChange = event => {
    setState(event.target.value);
  }

  const handleYearChange = event => {
    setYear(event.target.value);
  }

  const showClick = () => {
    setShow(true);
  }
  
  return (
    <div id='root'>
      
    
      <TextField id='textinput'label="State" style={style} onChange={handleStateChange}/>
      <TextField id='textinput'label="County" style={style} onChange={handleCountyChange}/>
      <TextField id='textinput'label="Year" style={style} onChange={handleYearChange}/>
      <Button variant="contained" style={style} onClick={showClick}>Show</Button>
      <table>
        <tr>
        <td><div class = "column">
      {show && <Typography color="textSecondary" gutterBottom>
        {county} county accidents line graph
      </Typography>}
      {show && <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 30, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey='month' />
        <YAxis margin={{ top: 5, right: 30, left: 20, bottom: 20 }}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="accidents" stroke="#8884d8" />
      </LineChart>}
      </div></td>

      <td><div class = "column">
      {show && <Typography color="textSecondary" gutterBottom>
        {county} county severity bar chart
      </Typography>}
      {show && <Typography color="textSecondary" gutterBottom>
        {message}
      </Typography>}
      {show &&<BarChart width={500} height={280} data={data2}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="month"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="severity" fill="#8884d8" />
       
      </BarChart>}
      </div></td>
      </tr>
      </table>
    </div>
  );
}

export default  Graph 