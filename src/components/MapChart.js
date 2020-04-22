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
import Graph from './graph';
import UserInput from './userInput';
import allStates from "../data/allstates.json";
import { hu, ro } from "date-fns/locale";
import { setSeconds } from "date-fns";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";




const MapChart = ({months}) => {
  //////////////
// read from api
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

      var stateArr = ["AL","GA","OH","AK","AR","FL"];
      var countyArr = ["Dekalb","Fulton","Decatur","Alpharetta"];

      const handleChange = countyFromChild => {
        setCounty(countyFromChild);
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
    <UserInput countyCallBack={setCounty} />
    <Graph />
    </div>
  );
};

export default MapChart;