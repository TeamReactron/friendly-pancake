import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import MapChart from './MapChart';


const Timeline = () => {
  let minTime = new Date("2017/01/01");
  let maxTime = new Date("2020/04/01");
  // Declare a new state variable, which we'll call "count"
  const [time, setTime] = useState('');

  const handleChange = event => {
      //console.log(event.target.ariaValueNow);
      setTime(event.target.ariaValueText);
      console.log(event)
  }

  function valuetext(value) {
    let months = value;
    let oldDate = new Date(time);
    let newDate = new Date(oldDate.setMonth(oldDate.getMonth() + months));
    setTime(value);
    return `${value}s later`;
  }

  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  const calculateTime = months => {
    let showDate = new Date(minTime.getTime());
    showDate.setMonth(showDate.getMonth() + months);
    console.log(showDate.getMonth() + 1);
    return showDate.getFullYear() + '/' + (showDate.getMonth() + 1) + '/' + showDate.getDate()
  }



  return (
    <div>
      <Typography id="timeline" gutterBottom>
        Time: {calculateTime(time)}
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="timeline"
        step={2}
        marks
        min={0}
        max={monthDiff(minTime, maxTime)}
        valueLabelDisplay="auto"
        onChange={event => handleChange(event)}
      />
      <MapChart months={time} />
    </div>
  );
}
export default Timeline;