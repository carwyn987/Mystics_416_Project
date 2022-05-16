import * as React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { GlobalStore } from './DataStore';
import { touchRippleClasses } from '@mui/material';
import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';
import '../App.css';

export function SeatShareGraph(props) {
    let { store } = useContext(GlobalStore);
    let graph, stateId, state, enDemX, enRepX, enDemY, enRepY, oldDemX, oldDemY, oldRepX, oldRepY, proDemX, proDemY, proRepX, proRepY;
    const [demCoords, setDemCoords] = React.useState(null);
    const [repCoords, setRepCoords] = React.useState(null);
    const [graphSet, setGraph] = React.useState(false);
    const [demX, setDemX] = React.useState(null);
    
    const getStateId = (id) => {
      //let state = store.currentState;
      switch(id){
        case 'TN':
          stateId=1;
          //enactedData=tnEnacted;
          //oldData=tnOld;
          //proposedData=null;
          break;
        case 'MS':
          stateId=2;
          // enactedData=msEnacted;
          // oldData=msOld;
          // proposedData=msProposed;
          break;
        case 'NC':
          stateId=3;
          // enactedData=ncEnacted;
          // oldData=ncOld;
          // proposedData=ncProposed;
          break;
        default:
          break;
      }
    }

    const getCoords = async(id)=> {
      await (fetch(`http://localhost:8080/getState?stateID=${stateId}`).then(response => response.json()).then((response) => {state=response}));
      if(state){
        for(let i=0; i<state.districtPlans.length; i++){
          let plan = state.districtPlans[i];
          if(plan.status === 'enacted'){
              // enDemX = plan.demCoords.map(({x})=>x);
              // enDemY = plan.demCoords.map(({y})=>y);
              // enRepX = plan.repCoords.map(({x})=>x);
              // enRepY = plan.repCoords.map(({y})=>y);
              setDemCoords(plan.demCoords);
              setRepCoords(plan.repCoords);
              setDemX(enDemX);
          }
          else if(plan.status === 'proposed'){
            proDemX = plan.demCoords.map(({x})=>x);
            proDemY = plan.demCoords.map(({y})=>y);
            proRepX = plan.repCoords.map(({x})=>x);
            proRepY = plan.repCoords.map(({y})=>y);
          }
          else if(plan.status === 'old'){
            oldDemX = plan.demCoords.map(({x})=>x);
            oldDemY = plan.demCoords.map(({y})=>y);
            oldRepX = plan.repCoords.map(({x})=>x);
            oldRepY = plan.repCoords.map(({y})=>y);
          }
        }
      }
    }
    if(store.currentState && !graphSet){
      getStateId(store.currentState);
      getCoords(stateId);
      //console.log(enDemX);
    }
    if (demCoords !== null && repCoords !== null && !graphSet){
      setGraph(true);
    }

    let tnGraph = {
      series: [
        {
          name: "Dem",
          type: 'line',
          data: demCoords
        },
        {
          name: "Rep",
          type: 'line',
          data: repCoords
        }
      ],
      options: {
      chart: {
      height: 350,
      width: 200,
      type: "line",
      stacked: false,
      foreColor: 'white'
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#00C1FF", "#FF1654"],
    stroke: {
      curve: 'smooth',
      width: 4
    },
    plotOptions: {
      bar: {
        columnWidth: "20%"
      }
    },
    xaxis: {
      type: 'numeric'
    },
    yaxis: [
      {
        axisTicks: {
          show: true
        },
        labels: {
          formatter: function(val) {
            return val.toFixed(0);
          },
          style: {
            colors: "#00C1FF"
          }
        },
        title: {
          text: "Dem",
          style: {
            color: "#00C1FF"
          }
        }
      },
      {
        opposite: true,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: false,
          color: "#FF1654"
        },
        labels: {
          formatter: function(val) {
            return val.toFixed(0);
          },
          style: {
            colors: "#FF1654"
          }
        },
        title: {
          text: "Rep",
          style: {
            color: "#FF1654"
          }
        }
      }
    ],
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false
      }
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40
    }
  }
  };
    graph = {
        series: [2],
        options: {
          chart: {
            id: 'seatshare-chart',
            type: 'line',
            height: 350,
            stacked: true,
            stackType: '100%',
            foreColor: 'white'
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

    return(
      <div id="seatshare-chart">
          <ReactApexChart id="seatchare" options={tnGraph.options} series={tnGraph.series} type={"line"} height={'150%'}/>
      </div>
    );
}

export default SeatShareGraph;