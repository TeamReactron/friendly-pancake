import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const Timeline = () => {
  // Declare a new state variable, which we'll call "count"
  const [year, setYear] = useState(2000);

  const handleChange = event => {
      //console.log(event.target.ariaValueNow);
      setYear(event.target.ariaValueText);
      console.log(event)
  }

  function valuetext(value) {
    setYear(value)
    return `${value}`;
  }

  return (
    <div>
      <Typography id="timeline" gutterBottom>
        Year: {year}
      </Typography>
      <Slider
        defaultValue={2000}
        getAriaValueText={valuetext}
        aria-labelledby="timeline"
        step={1}
        marks
        min={2000}
        max={2025}
        valueLabelDisplay="auto"
        onChange={event => handleChange(event)}
      />
    </div>
  );
}
export default Timeline;