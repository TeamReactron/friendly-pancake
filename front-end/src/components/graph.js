import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,BarChart, Bar
} from 'recharts';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import api from '../api'
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
  const [totalData, setTotalData] = useState([]);


  const handleCountyChange = event => {
    setCounty(event.target.value);
  }

  const handleStateChange = event => {
    setState(event.target.value);
  }

  const handleYearChange = event => {
    setYear(event.target.value);
  }

  const showClick = async () => {
    await api.queryContyCountMonthly(county, year).then(result => {
      console.log(result.data.data);
      let total = [];
      for (let i = 0; i < result.data.data.length; i++) {
        let ele = result.data.data[i];
        total.push({
          'month': ele._id,
          'accidents': ele.total,
          'severity': ele.avgSeverity
        })
      }
      total.sort((a, b) => (a.month > b.month) ? 1 : -1);
      for (let i = 0; i < total.length; i++) {
        let ele = total[i];
        if (ele.month === '01') {
          ele.month = 'Jan';
        } else if (ele.month === '02') {
          ele.month = 'Feb';
        } else if (ele.month === '03') {
          ele.month = 'Mar';
        } else if (ele.month === '04') {
          ele.month = 'Apr';
        } else if (ele.month === '05') {
          ele.month = 'May';
        } else if (ele.month === '06') {
          ele.month = 'Jun';
        } else if (ele.month === '07') {
          ele.month = 'Jul';
        } else if (ele.month === '08') {
          ele.month = 'Aug';
        } else if (ele.month === '09') {
          ele.month = 'Sep';
        } else if (ele.month === '10') {
          ele.month = 'Oct';
        } else if (ele.month === '11') {
          ele.month = 'Nov';
        } else if (ele.month === '12') {
          ele.month = 'Dec';
        } 
      }
      setTotalData(total);
    })
    await api.getAllCounties().then(counties => {
      console.log(counties);
    })
    setShow(true);
  }
  
  return (
    <div id='root'>
      
      <form>
      <TextField id='textinput'label="State" style={style} onChange={handleStateChange}/>
      <TextField id='textinput'label="County" style={style} onChange={handleCountyChange}/>
      <TextField id='textinput'label="Year" style={style} onChange={handleYearChange}/>
      </form>
      <label>
        Get monthly total number of accidents and average severity displayed with graph:
      <Button variant="contained" onClick={showClick}>Show</Button>
      </label>
      <table>
        <tr>
        <td><div class = "column">
      {show && <Typography color="textSecondary" gutterBottom>
        {county} county accidents line graph
      </Typography>}
      {show && <LineChart width={500} height={300} data={totalData} margin={{ top: 5, right: 30, left: 30, bottom: 20 }}>
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
      {show &&<BarChart width={500} height={280} data={totalData}
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