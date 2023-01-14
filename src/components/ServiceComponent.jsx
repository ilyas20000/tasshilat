import React, { Component } from 'react';
import EntropriseService from '../services/EntropriseService';
import NavBarServiceComponent from './NavBarServiceComponent';

class ServiceComponent extends Component {
      constructor(props){
    super(props)
    this.state={
        entroprises:[],
    }
        this.viewEntroprise=this.viewEntroprise.bind(this);
    }

   
  

    viewEntroprise(entroprise_id){

        localStorage.setItem("ent_id_billQ",entroprise_id)

        window.history.pushState({}, undefined, `/House_Car_Insurance/${entroprise_id}`);
        window.history.go();

    }
    componentDidMount(){
      EntropriseService.getEntroprise().then((res)=>{
          this.setState({entroprises:res.data});
      
      });
      
  }

  

    

    render() {
        return (
            <div>
                <NavBarServiceComponent/>
            
              {/* Content */}
<div className="container-xxl flex-grow-1 container-p-y">
  <div className="row">
  <div className="pagetitle">
      <h1>HAOUSE_CAR INSURANCE</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/House_Car_Insurance">Home</a></li>
          <li className="breadcrumb-item active">House-Car Bill</li>
        </ol>
      </nav>
    </div>{/* End Page Title */}
    <div className="col-lg-12 mb-4 order-0">
      <div className="card">
        <div className="d-flex align-items-end row">
          <div className="col-sm-7">
            <div className="card-body">
              <h5 className="card-title text-primary">HAOUSE-CAR-Bill </h5>
              <p className="mb-4">
                Hi weelcom on <span className="fw-bold">INTERFACE</span> of Payying  Houses And Car Insurance.
              </p>
              
            </div>
          </div>
          <div className="col-sm-5 text-center text-sm-left">
            <div className="card-body pb-0 px-0 px-md-4">
              <img src="assets/img/illustrations/man-with-laptop-light.png" height={140} alt="View Badge User" data-app-dark-img="illustrations/man-with-laptop-dark.png" data-app-light-img="illustrations/man-with-laptop-light.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

 
  <div className="row">
  {/* Order Statistics */}
  
       {
         this.state.entroprises.map(entroprise=>                             
    <div className="col-md-6 col-lg-4 mb-5" key={entroprise.entroprise_id}>
  <div className="card h-100">
    <img className="card-img-top" src={'data:image/jpeg;base64,' + entroprise.logo} alt="Card" height="130px" width="130px"/>
    <div className="card-body">
      <h5 className="card-title">{entroprise.nom}</h5>
      <p className="card-text">
      {entroprise.description}
      </p>
      <div className="dropdown">
                  <button className="btn p-0" type="button" id="cardOpt{entroprise.entroprise_id}" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="bx bx-dots-vertical-rounded" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                    <a className="dropdown-item" onClick={()=>this.viewEntroprise(`${entroprise.entroprise_id}`)} href>Bill</a>
                    
                    
                  </div>
                </div>
      </div>
  </div>
</div>
) }
    {/*/ Transactions */}
  </div>
</div>
{/* / Content */}


        
        
</div>

        );
    }
}

export default ServiceComponent;