import * as React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { GlobalStore } from './DataStore';
import { touchRippleClasses } from '@mui/material';
import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';
import '../App.css';
import { ContentCutOutlined } from '@mui/icons-material';

export function SeawulfData (props) {
    let { store } = useContext(GlobalStore);
    const [dataSet, setData] = React.useState(false);
    let graph=null;

    let graphData = {
        dem:[],
        rep:[],
        black:[],
        asian:[],
        native:[]
    };
    
    if(store.stateObj && !dataSet){
        let data = store.stateObj.seawulfInstances;
        let curr;
        for(let i = 0; i < data.length; i++) {
            curr = data[i];
            let obj = {
                x: "District "+curr.districtId,
                y: [curr.min, curr.first, curr.median, curr.third, curr.max]
            };
            switch(curr.group){
                case 'dem':
                    graphData.dem.push(obj);
                    break;
                case 'gop':
                    graphData.rep.push(obj);
                    break;
                case 'native':
                    graphData.native.push(obj);
                    break;
                case 'asian':
                    graphData.asian.push(obj);
                    break;
                case 'black':
                    graphData.black.push(obj);
                    break;
                default:
                    break;
            }
        }
    }

    let demGraph = {
        series: [{
            data: graphData.dem
        }],
        chart: {
            type: 'boxPlot',
            height: '400px'
        },
        options: {
          chart: {
            id: 'seawulf-chart',
            type: 'boxPlot',
            foreColor: 'white'
            },
            plotOptions: {
                boxPlot: {
                    colors: ['#746ADC', '#8083D6']
                },
                bar: {
                    horizontal: true
                },
            },
            yaxis: {
                min: 0,
                max: 1,
                forceNiceScale: true
            },
            stroke: {
                colors: ['white']
            },
            xaxis: {
                min:0,
                max:1
            }
        },
    };

      let repGraph = {
        series: [{
            data: graphData.rep
        }],
        chart: {
            type: 'boxPlot',
            height: '400px'
        },
        options: {
          chart: {
            id: 'seawulf-chart',
            type: 'boxPlot',
            foreColor: 'white'
            },
            plotOptions: {
                boxPlot: {
                    colors: ['#746ADC', '#8083D6']
                },
                bar: {
                    horizontal: true
                },
            },
            yaxis: {
                min: 0,
                max: 1,
                forceNiceScale: true
            },
            stroke: {
                colors: ['white']
            },
            xaxis: {
                min:0,
                max:1
            }
        },
      };

      let blackGraph = {
        series: [{
            data: graphData.black
        }],
        chart: {
            type: 'boxPlot',
            height: '400px'
        },
        options: {
          chart: {
            id: 'seawulf-chart',
            type: 'boxPlot',
            foreColor: 'white'
            },
            plotOptions: {
                boxPlot: {
                    colors: ['#746ADC', '#8083D6']
                },
                bar: {
                    horizontal: true
                },
            },
            yaxis: {
                min: 0,
                max: 1,
                forceNiceScale: true
            },
            stroke: {
                colors: ['white']
            },
            xaxis: {
                min:0,
                max:0.5
            }
        },
      };

      let asianGraph = {
        series: [{
            data: graphData.asian
        }],
        chart: {
            type: 'boxPlot',
            height: '400px'
        },
        options: {
          chart: {
            id: 'seawulf-chart',
            type: 'boxPlot',
            foreColor: 'white'
            },
            plotOptions: {
                boxPlot: {
                    colors: ['#746ADC', '#8083D6']
                },
                bar: {
                    horizontal: true
                },
            },
            yaxis: {
                min: 0,
                max: 1,
                forceNiceScale: true
            },
            stroke: {
                colors: ['white']
            },
            xaxis: {
                min:0,
                max:0.1
            }
        },
      };

      let nativeGraph = {
        series: [{
            data: graphData.native
        }],
        chart: {
            type: 'boxPlot',
            height: '400px'
        },
        options: {
          chart: {
            id: 'seawulf-chart',
            type: 'boxPlot',
            foreColor: 'white'
            },
            plotOptions: {
                boxPlot: {
                    colors: ['#746ADC', '#8083D6']
                },
                bar: {
                    horizontal: true
                },
            },
            yaxis: {
                min: 0,
                max: 1,
                forceNiceScale: true
            },
            stroke: {
                colors: ['white']
            },
            xaxis: {
                min:0,
                max:0.05,
                tickAmount: 5,
            }
        },
      };

    if (props.dem) {
        graph = demGraph;
    }
    else if(props.rep) {
        graph = repGraph;
    }
    else if(props.black){
        graph = blackGraph;
    }
    else if(props.asian){
        graph = asianGraph;
    }
    else if(props.native){
        graph = nativeGraph;
    }

    if(graph) {
        return(
            <div id="seawulf">
                <ReactApexChart id="seawulf" options={graph.options} series={graph.series} type={"boxPlot"} height={'400px'} min={0} max={1}/>
            </div>
          );
    }
    else {
        return(
            <div id="crank"></div>
        );
    }
}

export default SeawulfData;