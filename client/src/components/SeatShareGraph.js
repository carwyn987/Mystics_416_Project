import * as React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { GlobalStore } from './DataStore';
import { touchRippleClasses } from '@mui/material';
import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';
import '../App.css';

export function SeatShareGraph(props) {
    let { store } = useContext(GlobalStore);
    let graph;

    let tnGraph = {
        series: [2],
        options: {
          chart: {
            id: 'bar-chart',
            type: 'line',
            height: 350,
            stacked: true,
            stackType: '100%'
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          xaxis: {
            style: {
                color: 'rgb(255,255,255)'
            },
            categories: ['crack']
        },
          fill: {
            opacity: 1
          },
          legend: {
            position: 'right',
            offsetX: 0,
            offsetY: 50,
            color: 'white'
          },
        },
      };
}