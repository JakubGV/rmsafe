import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import CanvasJSReact from '../assets/canvasjs.react';

import './DataChart.css';

const DataChart = () => {
  const initialOptions = {
    animationEnabled: true,	
    title:{
      text: "Acceleration Data"
    },
    axisY : {
      title: "Acceleration (m/s^2)"
    },
    axisX : {
      title: 'Time (s)',
      valueFormatString: "##"
    },
    toolTip: {
      shared: true
    },
    data: [{
      type: "spline",
      name: "x-accel",
      showInLegend: true,
      dataPoints: []
    },
    {
      type: "spline",
      name: "y-accel",
      showInLegend: true,
      dataPoints: []
    },
    {
      type: "spline",
      name: "z-accel",
      showInLegend: true,
      dataPoints: []
    }]
  }
  
  const [options, setOptions] = useState(initialOptions);
  
  const handleClick = () => {
    const URL = 'http://localhost:5000/sensor/data';

    fetch(URL, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.x_accels && data.y_accels && data.z_accels) {
          let updatedOptions = JSON.parse(JSON.stringify(options));
          const accelerations = [data.x_accels, data.y_accels, data.z_accels];
          
          let time = 0;
          for (let i = 0; i < accelerations.length; i++) {
            time = 0;
            updatedOptions.data[i].dataPoints = []
            for (const val of accelerations[i]) {
              if (time > 60) break;
              updatedOptions.data[i].dataPoints.push({
                y: val, label: time.toFixed(2).toString()
              })
              time += 0.1
            }
          }

          setOptions(updatedOptions);
        }
      })
      .catch((error) => {
        alert(`Error fetching: ${error}`);
      });
  }
  
  return (
    <>
      <div className="chart">
        <CanvasJSReact.CanvasJSChart options={options} />
        <Button className="chart-btn" onClick={handleClick}>Refresh</Button>
      </div>
    </>
  )
}

export default DataChart;