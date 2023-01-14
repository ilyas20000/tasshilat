import React, { Component } from 'react';
import { ReactDOM } from "react";
import axios from 'axios'; 
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import AsideComponent from './AsideComponent';
import ReactApexChart from 'react-apexcharts';
class DashboardComponent extends Component {
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
              
            },
            seriescar: [  {
              name: 'Bill Not Payed',
              data: []
            },
            {
              name: 'Bill Payed',
              data: []
            },
          ],
            optionscar: {
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
              
            },


          
        
        
        };
      }
    
      state = {
        books: []
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
        axios.get(process.env.REACT_APP_URL+"/Car-House/dachCar").then((res) => {
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
         this.setState({ seriescar: [ {
          name: 'Bill Not Payed',
          data: nopayed
        },
        {
          name: 'Bill Payed',
          data: runscore
        },
        
      ],
      optionscar: {
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
              <div className="layout-wrapper layout-content-navbar">
  <div className="layout-container">
              <AsideComponent/>
      <div className="layout-page">
          <HeaderComponent/>
          <div className="content-wrapper">{/* Content */}
            <div className="container-xxl flex-grow-1 container-p-y">
            
           


            <div className="col-xl-12">
          <div className="nav-align-top mb-4">
            <ul className="nav nav-pills mb-3 " role="tablist">
              <li className="nav-item">
                <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-justified-home" aria-controls="navs-pills-justified-home" aria-selected="true">
                 House Chart 
                  
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-justified-profile" aria-controls="navs-pills-justified-profile" aria-selected="false">
                 Car Chart 
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-justified-messages" aria-controls="navs-pills-justified-messages" aria-selected="false">
                House Chart Line Area
                </button>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade active show" id="navs-pills-justified-home" role="tabpanel">
              <div className="card">
              <ReactApexChart options={this.state.optionshouse} series={this.state.serieshouse} type="bar" height={350} />
        </div>

              </div>
              <div className="tab-pane fade" id="navs-pills-justified-profile" role="tabpanel">
              <div className="card">
           <ReactApexChart options={this.state.optionscar} series={this.state.seriescar} type="bar" height={350} />
        </div>
              </div>

              <div className="tab-pane fade" id="navs-pills-justified-messages" role="tabpanel">
              <div className="col-xl-12">
              <ReactApexChart options={this.state.optionshouse} series={this.state.serieshouse} type="area" height={350} />
           </div>
              </div>
            </div>
          </div>
        </div>

            </div>
            {/* / Content */}
<FooterComponent/>
          </div>
          </div>
</div>
</div>

            </>
        );
    }
}

export default DashboardComponent;