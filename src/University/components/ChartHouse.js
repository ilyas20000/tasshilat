import React, { Component } from 'react';
import { ReactDOM } from "react";
import axios from 'axios'; 

import ReactApexChart from 'react-apexcharts';
class ChartHouse extends Component {
    constructor(props) {
        super(props);
    
        this.state = {


          

          year_mount:[],
          runscore:[],
            serieshouse: [ {
              name: 'Bill Not Payed',
              data: []
            },
            {
              name: 'Bill Payed',
              data: []
            },
            
          ],
            optionshouse: {
              chart: {
                height: 350,
                type: 'area'
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              xaxis: {
                type: 'text',
                categories: []
              },
              
            }


          
        
        
        };
      }
     
      
    async componentDidMount() {
        axios.get(process.env.REACT_APP_URL+"/Car-House/dachHouse").then((res) => {
            console.log(res);
            const ipl = res.data;
            const year_mount=[];
            const  runscore=[];  
            const  nopayed=[];  

            ipl.map((record) => {
              year_mount.push(record[0]);
              nopayed.push(record[3]);
    
              runscore.push(record[2]);
            })
            console.log(year_mount)
            console.log(runscore)
           this.setState({ serieshouse: [ 
            {
            name: 'Bill Not Payed',
            data: nopayed
          },{
            name: 'Bill Payed',
            data: runscore
          },
          
        ],
        optionshouse: {
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'text',
            categories: year_mount
          },
          
        },
      })
           
        })
       


    }
    
    
    render() {
        return (
            <>
              

              <ReactApexChart options={this.state.optionshouse} series={this.state.serieshouse} type="area" height={350} />
       
            </>
        );
    }
}
export default ChartHouse;