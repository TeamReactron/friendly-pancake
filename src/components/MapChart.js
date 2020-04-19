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
import allStates from "../data/allstates.json";


const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";


const MapChart = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    csv("/unemployment-by-county-2017.csv").then(county => {
      setData(county);
    })
  }, []);

  const colorScale = scaleQuantile()
      .domain(data.map(d => d.unemployment_rate))
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

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => 
          geographies.map(geo => {
            const cur = data.find(s => s.id === geo.id);
            console.log(data)
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={cur ? colorScale(cur.unemployment_rate) : "#EEE"}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;