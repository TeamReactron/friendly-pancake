import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Typography from '@material-ui/core/Typography';

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
  return (
    <div id='root'>
      <Typography color="textSecondary" gutterBottom>
        Fulton county accidents line graph
      </Typography>
      <LineChart width={700} height={300} data={data} margin={{ top: 5, right: 30, left: 30, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey='month' />
        <YAxis margin={{ top: 5, right: 30, left: 20, bottom: 20 }}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="accidents" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default Graph