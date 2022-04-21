import * as React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { GlobalStore } from './DataStore';
import { touchRippleClasses } from '@mui/material';
import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';
import '../App.css';

export function PopulationGraph() {
    const { store } = useContext(GlobalStore);

    let popData;
    const TNPopData = 
    [{
        name: 'White',
        data: [87.85, 82.15, 77.81, 75.85, 69.18, 77.71, 69.44, 72.02, 26.15]
      }, {
        name: 'Black',
        data: [2.93, 6.78, 10.95, 10.37, 12.74, 9.83, 17.03, 18.91, 60.50]
      }, {
        name: 'Hispanic',
        data: [4.87, 5.41, 5.78, 8.07, 10.30, 7.72, 7.44, 3.68, 9.14]
      }, {
        name: 'Asian',
        data: [1.10, 2.25, 1.87, 2.40, 4.98, 1.51, 2.59, 2.67, 2.08]
      }, {
        name: 'Other',
        data: [0.88, 1.02, 0.95, 0.94, 1.03, 0.96, 1.19, 0.83, 0.69]
      }];
    
    const MSPopData = [{
        name: 'White',
        data: [504495, 209590, 438695, 527045]
      }, {
        name: 'Black',
        data: [220535, 461060, 269330, 187700]
      }, {
        name: 'Hispanic',
        data: [19370, 11610, 13560, 27990]
      }, {
        name: 'Asian',
        data: [5450, 2710, 6200, 11830]
      }, {
        name: 'Other',
        data: [4715, 3740, 9375, 8235]
      }];
   
    const NCPopData = [{
        name: 'White',
        data: [317905, 564180, 509160, 472050, 447045, 503540, 547315, 470840, 367140, 586180, 654930, 238440, 495445, 350000]
      }, {
        name: 'Black',
        data: [336635, 172020, 161010, 192040, 104895, 164125, 155405, 193360, 104200, 100360, 30475, 226950, 176450, 160000]
      }, {
        name: 'Hispanic',
        data: [45050, 65475, 51580, 60340, 48195, 54090, 53835, 68730, 37075, 37760, 34340, 53535, 44900, 45000]
      }, {
        name: 'Asian',
        data: [12620, 18795, 12920, 38865, 9335, 12975, 7680, 19450, 15300, 13135, 8715, 28915, 20330, 30000]
      }, {
        name: 'Other',
        data: [12660, 11180, 11635, 11160, 7265, 9315, 13770, 19525, 48685, 7885, 16920, 9630, 9545, 20000]
      }];
   
    // let data = null;
    // let categories = null;

    if (store.stateFocus) {
        if (store.stateFocus === "Tennessee") {
            popData=(TNPopData);
            // data = [{
            //     name: 'White',
            //     data: [87.85, 82.15, 77.81, 75.85, 69.18, 77.71, 69.44, 72.02, 26.15]
            //   }, {
            //     name: 'Black',
            //     data: [2.93, 6.78, 10.95, 10.37, 12.74, 9.83, 17.03, 18.91, 60.50]
            //   }, {
            //     name: 'Hispanic',
            //     data: [4.87, 5.41, 5.78, 8.07, 10.30, 7.72, 7.44, 3.68, 9.14]
            //   }, {
            //     name: 'Asian',
            //     data: [1.10, 2.25, 1.87, 2.40, 4.98, 1.51, 2.59, 2.67, 2.08]
            //   }, {
            //     name: 'Other',
            //     data: [0.88, 1.02, 0.95, 0.94, 1.03, 0.96, 1.19, 0.83, 0.69]
            //   }];
            //graphCategories = ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7", "District 8", "District 9"];
        }
        else if (store.stateFocus === "Mississippi") {
            popData=(MSPopData);
            //graphCategories = ["District 1", "District 2", "District 3", "District 4"];
            // data = [{
            //     name: 'White',
            //     data: [504495, 209590, 438695, 527045]
            //   }, {
            //     name: 'Black',
            //     data: [220535, 461060, 269330, 187700]
            //   }, {
            //     name: 'Hispanic',
            //     data: [19370, 11610, 13560, 27990]
            //   }, {
            //     name: 'Asian',
            //     data: [5450, 2710, 6200, 11830]
            //   }, {
            //     name: 'Other',
            //     data: [4715, 3740, 9375, 8235]
            //   }];
            //categories = ["District 1", "District 2", "District 3", "District 4"];
        }
        else if(store.stateFocus === "North Carolina") {
            popData=(NCPopData);
            // data = [{
            //     name: 'White',
            //     data: [317905, 564180, 509160, 472050, 447045, 503540, 547315, 470840, 367140, 586180, 654930, 238440, 495445, 350000]
            //   }, {
            //     name: 'Black',
            //     data: [336635, 172020, 161010, 192040, 104895, 164125, 155405, 193360, 104200, 100360, 30475, 226950, 176450, 160000]
            //   }, {
            //     name: 'Hispanic',
            //     data: [45050, 65475, 51580, 60340, 48195, 54090, 53835, 68730, 37075, 37760, 34340, 53535, 44900, 45000]
            //   }, {
            //     name: 'Asian',
            //     data: [12620, 18795, 12920, 38865, 9335, 12975, 7680, 19450, 15300, 13135, 8715, 28915, 20330, 30000]
            //   }, {
            //     name: 'Other',
            //     data: [12660, 11180, 11635, 11160, 7265, 9315, 13770, 19525, 48685, 7885, 16920, 9630, 9545, 20000]
            //   }];
            //graphCategories = ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7", "District 8", "District 9", "District 10", "District 11", "District 12", "District 13", "District 14"];
        }
    }

    function graphData() {
        let state = store.stateFocus;
        if (state === "TN") {
            return [{
                name: 'White',
                data: [87.85, 82.15, 77.81, 75.85, 69.18, 77.71, 69.44, 72.02, 26.15]
              }, {
                name: 'Black',
                data: [2.93, 6.78, 10.95, 10.37, 12.74, 9.83, 17.03, 18.91, 60.50]
              }, {
                name: 'Hispanic',
                data: [4.87, 5.41, 5.78, 8.07, 10.30, 7.72, 7.44, 3.68, 9.14]
              }, {
                name: 'Asian',
                data: [1.10, 2.25, 1.87, 2.40, 4.98, 1.51, 2.59, 2.67, 2.08]
              }, {
                name: 'Other',
                data: [0.88, 1.02, 0.95, 0.94, 1.03, 0.96, 1.19, 0.83, 0.69]
              }];
        }
        else if (state === "MS") {
            return [{
                name: 'White',
                data: [504495, 209590, 438695, 527045]
              }, {
                name: 'Black',
                data: [220535, 461060, 269330, 187700]
              }, {
                name: 'Hispanic',
                data: [19370, 11610, 13560, 27990]
              }, {
                name: 'Asian',
                data: [5450, 2710, 6200, 11830]
              }, {
                name: 'Other',
                data: [4715, 3740, 9375, 8235]
              }];
        }
        else if (state === "NC") {
            return [{
                name: 'White',
                data: [317905, 564180, 509160, 472050, 447045, 503540, 547315, 470840, 367140, 586180, 654930, 238440, 495445, 350000]
              }, {
                name: 'Black',
                data: [336635, 172020, 161010, 192040, 104895, 164125, 155405, 193360, 104200, 100360, 30475, 226950, 176450, 160000]
              }, {
                name: 'Hispanic',
                data: [45050, 65475, 51580, 60340, 48195, 54090, 53835, 68730, 37075, 37760, 34340, 53535, 44900, 45000]
              }, {
                name: 'Asian',
                data: [12620, 18795, 12920, 38865, 9335, 12975, 7680, 19450, 15300, 13135, 8715, 28915, 20330, 30000]
              }, {
                name: 'Other',
                data: [12660, 11180, 11635, 11160, 7265, 9315, 13770, 19525, 48685, 7885, 16920, 9630, 9545, 20000]
              }];
        }
    };

    function graphCategories() {
        let state = store.stateFocus;
        if (state === "TN") {
            return ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7", "District 8", "District 9"];
        }
        else if (state === "MS") {
            return ["District 1", "District 2", "District 3", "District 4"];
        }
        else if (state === "NC") {
            return ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7", "District 8", "District 9", "District 10", "District 11", "District 12", "District 13", "District 14"];
        }
    };

    let state = {
        series: graphData(),
        options: {
          chart: {
            id: 'bar-chart',
            type: 'bar',
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
            categories: graphCategories()//["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7", "District 8", "District 9"],
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: 'right',
            offsetX: 0,
            offsetY: 50
          },
        },
      };

    return (
        <div id="pop-chart">
            <ReactApexChart id="bar-chart" options={state.options} series={state.series} type="bar" height={350} />
        </div>
    );
}

export default PopulationGraph;