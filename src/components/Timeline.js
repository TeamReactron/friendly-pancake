import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

function valuetext(value) {
  return `${value}`;
}

const useStyles = makeStyles({
    root: {
      width: 30,
    },
  });

export default function timeline() {

  return (
    <div>
      <Typography gutterBottom>
        Timeline
      </Typography>
      <Slider
        defaultValue={2000}
        getAriaValueText={valuetext}
        aria-labelledby="year"
        step={2}
        marks
        min={2000}
        max={2025}
        valueLabelDisplay="auto"
      />
    </div>
  );
}
