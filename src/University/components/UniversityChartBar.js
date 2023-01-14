import React from "react";
import { ReactDOM } from "react";
import ReactApexChart from "react-apexcharts";
import axios from 'axios'; 

class ApexChartC extends React.Component {
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
   
    axios.get(process.env.REACT_APP_URL+"/Univ-service/api/universityBill/universityBills/numberOfBills/ByMounth").then((res) => {
      console.log(res);
      const ipl = res.data;
      const year_mount=[];
      const  runscore=[];  
      const  nopayed=[];  

      ipl.map((record) => {
        year_mount.push(record[0]);
        nopayed.push(record[1]);

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
      


      <ReactApexChart options={this.state.optionscar} series={this.state.seriescar} type="area" height={350} />


    );
  }
}

// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);


export default ApexChartC;