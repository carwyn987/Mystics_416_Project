import * as React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { GlobalStore } from './DataStore';
import { touchRippleClasses } from '@mui/material';
import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';
import '../App.css';

export function SeatShareGraph(props) {
    let { store } = useContext(GlobalStore);
    let graph, state, enDemX, enRepX, enDemY, enRepY, oldDemX, oldDemY, oldRepX, oldRepY, proDemX, proDemY, proRepX, proRepY;
    const [enDemCoords, setEnDemCoords] = React.useState(null);
    const [enRepCoords, setEnRepCoords] = React.useState(null);
    const [proDemCoords, setProDemCoords] = React.useState(null);
    const [proRepCoords, setProRepCoords] = React.useState(null);
    const [oldDemCoords, setOldDemCoords] = React.useState(null);
    const [oldRepCoords, setOldRepCoords] = React.useState(null);
    const [graphSet, setGraph] = React.useState(false);
    const [demX, setDemX] = React.useState(null);
    const [stateId, setStateId] = React.useState(null);

    // switch(store.stateObj?.id){
      
    // }
    
    // const getStateId = (id) => {
    //   //let state = store.currentState;
    //   switch(id){
    //     case 'TN':
    //       stateId=1;
    //       //enactedData=tnEnacted;
    //       //oldData=tnOld;
    //       //proposedData=null;
    //       break;
    //     case 'MS':
    //       stateId=2;
    //       // enactedData=msEnacted;
    //       // oldData=msOld;
    //       // proposedData=msProposed;
    //       break;
    //     case 'NC':
    //       stateId=3;
    //       // enactedData=ncEnacted;
    //       // oldData=ncOld;
    //       // proposedData=ncProposed;
    //       break;
    //     default:
    //       break;
    //   }
    // }

    const getCoords = () => {
      //await (fetch(`http://localhost:8080/getState?stateID=${stateId}`).then(response => response.json()).then((response) => {state=response}));
      let state = store.stateObj;
      if(state){
        for(let i=0; i<state.districtPlans.length; i++){
          let plan = state.districtPlans[i];
          if(plan.status === 'enacted'){
              // enDemX = plan.demCoords.map(({x})=>x);
              // enDemY = plan.demCoords.map(({y})=>y);
              // enRepX = plan.repCoords.map(({x})=>x);
              // enRepY = plan.repCoords.map(({y})=>y);
              setEnDemCoords(plan.demCoords);
              setEnRepCoords(plan.repCoords);
              //setEnDemX(enDemX);
          }
          else if(plan.status === 'proposed'){
            // proDemX = plan.demCoords.map(({x})=>x);
            // proDemY = plan.demCoords.map(({y})=>y);
            // proRepX = plan.repCoords.map(({x})=>x);
            // proRepY = plan.repCoords.map(({y})=>y);
            setProDemCoords(plan.demCoords);
            setProRepCoords(plan.repCoords);
          }
          else if(plan.status === 'old'){
            // oldDemX = plan.demCoords.map(({x})=>x);
            // oldDemY = plan.demCoords.map(({y})=>y);
            // oldRepX = plan.repCoords.map(({x})=>x);
            // oldRepY = plan.repCoords.map(({y})=>y);
            setOldDemCoords(plan.demCoords);
            setOldRepCoords(plan.repCoords);
          }
        }
      }
      if (oldDemCoords !== null && oldRepCoords !== null){
        setGraph(true);
      }
    }
    if(store.stateObj && !graphSet){
      //getStateId(store.currentState);
      // switch(store.stateObj.id){
      //   case 1:
      //     setStateId("TN");
      //     break;
      //   case 2:
      //     setStateId("MS");
      //     break;
      //   case 3:
      //     setStateId("NC");
      //     break;
      //   default:
      //     break;
      // }
      getCoords();
      //console.log(enDemX);
    }
    if (store.currentState !== stateId){
      setGraph(false);
      setStateId(store.currentState);
    }
    // if (demCoords !== null && repCoords !== null && !graphSet){
    //   setGraph(true);
    // }

    let enGraph = {
      series: [
        {
          name: "Dem",
          type: 'line',
          data: enDemCoords
        },
        {
          name: "Rep",
          type: 'line',
          data: enRepCoords
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

  let oldGraph = {
    series: [
      {
        name: "Dem",
        type: 'line',
        data: oldDemCoords
      },
      {
        name: "Rep",
        type: 'line',
        data: oldRepCoords
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

  let proGraph;
  if(store.stateObj && store.stateObj.id !== 1){
      proGraph = {
        series: [
          {
            name: "Dem",
            type: 'line',
            data: proDemCoords
          },
          {
            name: "Rep",
            type: 'line',
            data: proRepCoords
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
    }
  } else {
    proGraph = undefined;
  }

  switch(props.plan){
    case 'enacted':
      if (enGraph.series !== null) {
        graph = enGraph;
      }
      break;
    case 'old':
      if (oldGraph.series !== null) {
        graph = oldGraph;
      }
      break;
    case 'proposed':
      if (proGraph.series !== null) {
        graph = proGraph;
      }
      break;
    default:
      break;
  }

  if (graph) {
    return(
      <div id="seatshare-chart">
          <ReactApexChart id="seatchare" options={graph.options} series={graph.series} type={"line"} height={'600px'}/>
      </div>
    );
  } else {
    return(
      <div id="crick">

      </div>
    )
  }
}

export default SeatShareGraph;