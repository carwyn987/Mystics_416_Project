import * as React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { GlobalStore } from './DataStore';
import { touchRippleClasses } from '@mui/material';
import Chart from "react-apexcharts";
import '../App.css';

export function PopulationGraph() {
    const { store } = useContext(GlobalStore);
    let data = null;
    let categories = null;

    //const genPopData = [ 740319, 740319, 740320, 740321 ];
    const MSPopData = [
        { x: "District 1", y: 740319 }, 
        { x: "District 2", y: 740319 }, 
        { x: "District 3", y: 740320 }, 
        { x: "District 4", y: 740321 }
    ];
    const TNPopData = [
        { x: "District 1", y: 767871 }, 
        { x: "District 2", y: 767871 }, 
        { x: "District 3", y: 767871 }, 
        { x: "District 4", y: 767871 }, 
        { x: "District 5", y: 767871 }, 
        { x: "District 6", y: 767872 }, 
        { x: "District 7", y: 767871 }, 
        { x: "District 8", y: 767871 }, 
        { x: "District 9", y: 767871 }
    ];

    const NCPopData = [
        { x: "District 1", y: 745670 }, 
        { x: "District 2", y: 745671 }, 
        { x: "District 3", y: 745670 }, 
        { x: "District 4", y: 745670 }, 
        { x: "District 5", y: 745670 }, 
        { x: "District 6", y: 745670 }, 
        { x: "District 7", y: 745671 }, 
        { x: "District 8", y: 745671 }, 
        { x: "District 9", y: 745672 }, 
        { x: "District 10", y: 745670 }, 
        { x: "District 11", y: 745671 }, 
        { x: "District 12", y: 745671 }, 
        { x: "District 13", y: 745670 }, 
        { x: "District 14", y: 745671 }
    ];

    if (store.currentState) {
        if (store.currentState === "TN") {
            data = TNPopData;
            categories = ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7", "District 8", "District 9"];
        }
        else if (store.currentState === "MI") {
            data = MSPopData;
            categories = ["District 1", "District 2", "District 3", "District 4"];
        }
        else {
            data = NCPopData;
            categories = ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7", "District 8", "District 9", "District 10", "District 11", "District 12", "District 13", "District 14"];
        }
    }
    
    const state = {
        series: [{
          name: 'Population',
          data: data
        }],
        options: {
          chart: {
            height: 400,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top',
              },
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function(val) {
                return val.y
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#ffffff"]
            }
          },
          xaxis: {
            categories: categories,
            position: 'bottom',
            axisBorder: { show: true },
            axisTicks: { show: true },
            labels: {
                style: { colors: '#ffffff'}
            }
          },
          yaxis: {
            axisBorder: { show: true },
            axisTicks: { show: true },
            labels: {
              show: true,
              formatter: function (val) { return val; },
              style: { colors: '#ffffff' }
            }
          },
          title: {
            text: 'Total Population Per District',
            floating: true,
            offsetY: 0,
            align: 'center',
            style: {
              color: '#ffffff',
              fontSize: '16px'
            }
          },
          tooltip: {
            enabled: true,
            x: { show: true },
            y: {
                show: true,
                formatter: (val) => val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            }
          },
        }
      };

    return (
        <div id="pop-chart">
            <Chart id="pop-chart" options={state.options} series={state.series} type="bar" height={400} />
        </div>
    );
}

export default PopulationGraph;