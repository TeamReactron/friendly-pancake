import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
      {show && <Typography color="textSecondary" gutterBottom>
        {county} county accidents line graph
      </Typography>}
      {show && <LineChart width={700} height={300} data={data} margin={{ top: 5, right: 30, left: 30, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey='month' />
        <YAxis margin={{ top: 5, right: 30, left: 20, bottom: 20 }}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="accidents" stroke="#8884d8" />
      </LineChart>}
    </div>
  );
}

export default Graph