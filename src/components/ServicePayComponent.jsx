import React, { Component } from 'react';
import HouseService from '../services/HouseService'
import ClientService from '../services/ClientService';
import EntropriseService from '../services/EntropriseService';
import CarService from '../services/CarService'
import FacteurService from '../services/FacteurService';
import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser';
import NavBarServiceComponent from './NavBarServiceComponent';
class ServicePayComponent extends Component {
  constructor(props){
     
    super(props)
    this.state={

        entroprise_id:localStorage.getItem("ent_id_billQ"),
        facteurs:[],
        tablefh:[],
        dataTh:[],
        show_div:false,
        id:localStorage.getItem("ent_id_billQ"),
        i:0,
        value:'',
        tableFilter:[],
        serchHouse:"",
        serchCar:"",
        emailMSG:{
          client_email:"",
          client_nom:"",
          client_prenom:"",
          entroprise_nom:"",
          f_montant:"",
          user_nom:"",
          user_prenom:"",
          agence:""
        }
       
    }
    this.changeValueHandler=this.changeValueHandler.bind(this);
    this.changeSerchHouseHandler=this.changeSerchHouseHandler.bind(this);
    this.changeSerchCarHandler=this.changeSerchCarHandler.bind(this);

    this.addhouse=this.addhouse.bind(this);
    this.editeHouse=this.editeHouse.bind(this);
    this.deleteHouse=this.deleteHouse.bind(this);
    this.editeCar=this.editeCar.bind(this);
    this.deleteCar=this.deleteCar.bind(this);

}



deleteHouse(house_id){
    HouseService.deleteHouse(house_id).then((res)=>{

        this.setState({houses:this.state.houses.filter(house=>house.house_id !== house_id)});
        window.location.reload(true);
    
    });
   
}
deleteCar(car_id){
  CarService.deleteCar(car_id).then((res)=>{

      this.setState({cars:this.state.cars.filter(car=>car.car_id !== car_id)});
  
  });
}
editeCar(car_id){
  localStorage.setItem("car_id_srv",car_id)
let car={
  etat:1,

};
Swal.fire({
title: 'Are you sure?',
text: "You mast validate the action!",
icon: 'warning',
showCancelButton: true,
confirmButtonColor: '#3085d6',
cancelButtonColor: '#d33',
confirmButtonText: 'Yes, pay it!'
}).then((result) => {
if (result.isConfirmed) {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your bill has been peyed<br/> check your email.',
    showConfirmButton: false,
    timer: 4000
  })
   this.sendEmail()

    setTimeout(()=>{ 
    CarService.updateCarEtat(car_id,car).then(res=>{
      
      window.history.pushState({}, undefined, `/pCs/${car_id}`);
      window.history.go();
  })
  },2000)
}
})
}

editeHouse(house_id){

  localStorage.setItem("house_id_srv",house_id)
     let house={
            etat:1,
            };
                
        Swal.fire({
        title: 'Are you sure?',
        text: "You mast validate the action!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, pay it!'
        }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your bill has been peyed<br/> check your email.',
            showConfirmButton: false,
            timer: 4000
          })
            this.sendEmail()

            setTimeout(()=>{ 
              HouseService.updateHouseEtat(house_id,house).then(res=>{
                      
                      window.history.pushState({}, undefined, `/pHs/${house_id}`);
                  window.history.go();
            })
          },2000)
          
        } 
})

}

sendEmail(){
  emailjs.send('service_vscekz7', 'template_e5se5ot', this.state.emailMSG, 'EaqO3vuMalw8uxf5w')
    .then((result) => {
        console.log("Success !!",result.status,result.text);
    }, (error) => {
        console.log("feilled ..",error.text);
    });
};
changeSerchHouseHandler=(e)=>{
  if(e.target.value ==""){
   this.setState({
    dataTh:this.state.tablefh})
          console.log(this.state.serchHouse)

    
    
  }else{
    let filetrTable=this.state.tablefh.filter(k=> k.reference.toLowerCase().includes(e.target.value.toLowerCase()))
    this.setState({dataTh:filetrTable})
          
       }
       this.setState({serchHouse:e.target.value})

}
changeSerchCarHandler=(e)=>{
if(e.target.value !==""){
this.setState({serchCar:e.target.value})
       
 let filetrTable=this.state.facteurs.filter(o=>Object.Keys(o).some(k=>
 String(o[k]).toLowerCase().includes(e.target.value.toLowerCase()) ))
 this.setState({facteurs:filetrTable})
 
}else{
        this.setState({serchCar:""})
      this.setState({facteurs:this.state.facteurs});
    }

}
changeValueHandler=(e)=>{

  if(e.target.value !==""){

    
    this.state.tableFilter.map(
      facteur=>
        console.log(facteur.client["prenom"])
        )

    }else{
      this.setState({value:""})
    this.setState({facteurs:this.state.facteurs});
  }

  

}
componentDidMount(){
                 
  HouseService.getHouse().then((res)=>{
    this.setState({houses:res.data});
      });
  CarService.getCar().then((res)=>{
  this.setState({cars:res.data});
  });
  
    ClientService.getClient().then((res)=>{
      this.setState({clients:res.data});
  
  });
  EntropriseService.getEntroprise().then((res)=>{
      this.setState({entroprises:res.data});
  
  });
  FacteurService.getFacteurById(this.state.id).then((res)=>{
    this.setState({facteurs:res.data,
    tablefh:res.data,
    dataTh:res.data
    });
});
EntropriseService.getEntropriseById(this.state.entroprise_id).then((res)=>{
        let entroprise=res.data;
        this.setState({
            reference:entroprise.reference,
            date:entroprise.date,
            montant:entroprise.montant,
           
        });
    
    });

}



addhouse(){
    this.props.history.push("/addHouse");
    window.location.reload(true);
}
gitLink(facteur){
       if(!(facteur.matricule)){

               return  <td>
                        
                        <div className="dropdown">
                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i className="bx bx-dots-vertical-rounded" /></button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" onClick={()=>this.editeHouse(facteur.house_id)} href><i className="bx bx-edit-alt me-1" /> Edit</a>
                        </div>
                      </div>

                   </td>

       }else{
                    return <td>
                        <div className="dropdown">
                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i className="bx bx-dots-vertical-rounded" /></button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" onClick={()=>this.editeCar(facteur.car_id)}  href><i className="bx bx-edit-alt me-1" /> Edit</a>
                        </div>
                      </div>
                        </td>

       }
    
}
getEtatState(facteur){
  if((facteur.etat)==1){
          return<span className="badge bg-label-success me-1">Payed</span>
    }else{
          return<span className="badge bg-label-danger me-1">Not payed</span>
    }
      
    }
    inisaliser(){
      this.setState({serchHouse:""})
    }
    
    render() {
        return (
            <>
<div className="layout-page">
                <NavBarServiceComponent/>
                <div className="content-wrapper">
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
    
    <div className="col-lg-12 mb-4 mt-3 order-0">
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
              <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template-free/assets/img/illustrations/man-with-laptop-light.png" height={140} alt="View Badge User" data-app-dark-img="illustrations/man-with-laptop-dark.png" data-app-light-img="illustrations/man-with-laptop-light.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<div className="row">

 {/* / Slide wrapper */}
 <div className="col-xl-12">
          <div className="nav-align-top mb-4">
            <ul className="nav nav-pills mb-3 " role="tablist">
              <li className="nav-item">
                <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-justified-home" aria-controls="navs-pills-justified-home" aria-selected="true">
                  <i className="tf-icons bx bx-home" /> House Bill
                  
                </button>
              </li>
              <li className="nav-item">
                <button type="button"  className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-justified-profile" aria-controls="navs-pills-justified-profile" aria-selected="false">
                  <i className="tf-icons bx bx-car" /> Car Bill
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-justified-messages" aria-controls="navs-pills-justified-messages" aria-selected="false">
                  <i className="tf-icons bx bx-message-square" /> Pay Bill
                </button>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade active show" id="navs-pills-justified-home" role="tabpanel">
              <div className="card">
          {/* Search */}
            <div className="navbar-nav align-items-center">
              <div className="nav-item d-flex align-items-center">
                <i className="bx bx-search fs-4 lh-0" />
                <input type="text" 
                className="form-control border-0 shadow-none"
                value={this.state.serchHouse} onChange={this.changeSerchHouseHandler}  placeholder="Search..." aria-label="Search..." />
              </div>
            </div>
            {/* /Search */}
          <div className="table-responsive text-nowrap">
            <table className="table table-striped">
              <thead>
                <tr>
                <th scope="col">Reference</th>
                                <th scope="col">Date</th>
                                <th scope="col">Montant</th>
                                <th scope="col">Address</th>
                                <th scope="col">Client</th>
                                <th scope="col">Entreprise</th>
                                <th scope="col">User</th>
                                <th scope="col">Etat</th>

                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
              {                   
                                this.state.dataTh.map(
                                  facteur=>
                                {
                                  if(!(facteur.matricule)){
                                    return(
                                    <tr key={facteur.house_id}>
                                        <th scope="row">{facteur.reference}</th>
                                        <td>{facteur.date}</td>
                                        <td>{facteur.montant} Dh</td>
                                        <td>{facteur.address_house}</td>
                                        <td>{facteur.client["prenom"]}</td>
                                        <td>{facteur.entroprise["nom"]}</td>
                                        <td>{facteur.user["prenom"]}</td>
                                        <td>{this.getEtatState(facteur) }</td>

                                        
                                      
                                    </tr>)
                                  }
                                
                                    }
                                  
                                )
                            }
              </tbody>
            </table>
          </div>
        </div>

              </div>
              <div className="tab-pane fade" id="navs-pills-justified-profile" role="tabpanel">
              <div className="card">
          {/* Search */}
          <div className="navbar-nav align-items-center">
              <div className="nav-item d-flex align-items-center">
                <i className="bx bx-search fs-4 lh-0" />
                <input type="text" 
                className="form-control border-0 shadow-none"
                value={this.state.serchHouse} onChange={this.changeSerchHouseHandler}  placeholder="Search..." aria-label="Search..." />
              </div>
            </div>
            {/* /Search */}
          <div className="table-responsive text-nowrap">
            <table className="table table-striped">
              <thead>
                <tr>
                <th scope="col">Reference</th>
                                <th scope="col">Date</th>
                                <th scope="col">Montant</th>
                                <th scope="col">Matricule</th>
                                <th scope="col">Client</th>
                                <th scope="col">Entreprise</th>
                                <th scope="col">User</th>
                                <th scope="col">Etat</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
              {                   
                                this.state.dataTh.map(
                                  facteur=>
                                  
                                { if(!(facteur.address_house)){
                                    return(
                                    <tr key={facteur.reference}>
                                        <th scope="row">{facteur.reference}</th>
                                        <td>{facteur.date}</td>
                                        <td>{facteur.montant} Dh</td>
                                        <td>{facteur.matricule}</td>
                                        <td>{facteur.client["prenom"]}</td>
                                        <td>{facteur.entroprise["nom"]}</td>
                                        <td>{facteur.user["prenom"]}</td>
                                        <td>{this.getEtatState(facteur)}</td>
                                    </tr>)
                                  }
                                    }
                                  
                                )
                            }
              </tbody>
            </table>
          </div>
        </div>
              </div>
              <div className="tab-pane fade" id="navs-pills-justified-messages" role="tabpanel">
              <div className="col-xl-12">
                          <h6 className="text-muted">Payment Bill</h6>
                          <div className="nav-align-top mb-4">
                            <ul className="nav nav-tabs " role="tablist">
                              <li className="nav-item">
                                <button type="button"  className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#navs-justified-home" aria-controls="navs-justified-home" aria-selected="true">
                                  <i className="tf-icons bx bx-home"></i>House Bill Not payed
                                </button>
                              </li>
                              <li className="nav-item">
                                <button type="button"  className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#navs-justified-profile" aria-controls="navs-justified-profile" aria-selected="false">
                                  <i className="tf-icons bx bx-car"></i> Car Bill Not payed
                                </button>
                              </li>
                            
                            </ul>
                            <div className="tab-content">
                              <div className="tab-pane fade show active" id="navs-justified-home" role="tabpanel">
                              <div className="card">
          {/* Search */}
          <div className="navbar-nav align-items-center">
              <div className="nav-item d-flex align-items-center">
                <i className="bx bx-search fs-4 lh-0" />
                <input type="text" 
                className="form-control border-0 shadow-none"
                value={this.state.serchHouse} onChange={this.changeSerchHouseHandler}  placeholder="Search..." aria-label="Search..." />
              </div>
            </div>
            {/* /Search */}
          <div className="table-responsive text-nowrap">
            <table className="table table-striped">
              <thead>
                <tr>
                <th scope="col">Reference</th>
                                <th scope="col">Date</th>
                                <th scope="col">Montant</th>
                                <th scope="col">Address</th>
                                <th scope="col">Client</th>
                                <th scope="col">Entreprise</th>
                                <th scope="col">User</th>
                                <th scope="col">Etat</th>
                                <th scope="col">Action</th>

                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
              {                   
                                this.state.dataTh.map(
                                  facteur=>
                                {
                                  if(!(facteur.matricule) && (facteur.etat)==0){
                                    return(
                                    <tr key={facteur.reference}>
                                        <th scope="row">{facteur.reference}</th>
                                        <td>{facteur.date}</td>
                                        <td>{facteur.montant} Dh</td>
                                        <td>{facteur.address_house}</td>
                                        <td>{facteur.client["prenom"]}</td>
                                        <td>{facteur.entroprise["nom"]}</td>
                                        <td>{facteur.user["prenom"]}</td>
                                        <td>{this.getEtatState(facteur) }</td>
                                        <td>
                                        <button type="button" onClick={()=>{
                                          this.state.emailMSG['client_email']=facteur.client["email"];
                                          this.state.emailMSG['client_nom']=facteur.client["nom"];
                                          this.state.emailMSG['client_prenom']=facteur.client["prenom"];
                                          this.state.emailMSG['entroprise_nom']=facteur.entroprise["nom"];
                                          this.state.emailMSG['f_montant']=facteur.montant;
                                          this.state.emailMSG['user_nom']=facteur.user["nom"];
                                          this.state.emailMSG['user_prenom']=facteur.user["prenom"];
                                          this.state.emailMSG['agence']=facteur.user["agence"];
                                              console.log(this.state.emailMSG['client_email'])
                                          this.editeHouse(facteur.house_id)
                                          
                                          }} className="btn rounded-pill btn-info">Pay</button>
                                        </td>
                                        
                                    </tr>)
                                  }
                                
                                    }
                                  
                                )
                            }
              </tbody>
            </table>
          </div>
        </div>
                              </div>
                              <div className="tab-pane fade" id="navs-justified-profile" role="tabpanel">
                              <div className="card">
          {/* Search */}
          <div className="navbar-nav align-items-center">
              <div className="nav-item d-flex align-items-center">
                <i className="bx bx-search fs-4 lh-0" />
                <input type="text" 
                className="form-control border-0 shadow-none"
                value={this.state.serchHouse} onChange={this.changeSerchHouseHandler}  placeholder="Search..." aria-label="Search..." />
              </div>
            </div>
            {/* /Search */}
          <div className="table-responsive text-nowrap">
            <table className="table table-striped">
              <thead>
                <tr>
                <th scope="col">Reference</th>
                                <th scope="col">Date</th>
                                <th scope="col">Montant</th>
                                <th scope="col">Matricule</th>
                                <th scope="col">Client</th>
                                <th scope="col">Entreprise</th>
                                <th scope="col">User</th>
                                <th scope="col">Etat</th>
                                <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
              {                   
                                this.state.dataTh.map(
                                  facteur=>
                                  
                                { if(!(facteur.address_house) && (facteur.etat)==0){
                                    return(
                                    <tr key={facteur.reference}>
                                        <th scope="row">{facteur.reference}</th>
                                        <td>{facteur.date}</td>
                                        <td>{facteur.montant} Dh</td>
                                        <td>{facteur.matricule}</td>
                                        <td>{facteur.client["prenom"]}</td>
                                        <td>{facteur.entroprise["nom"]}</td>
                                        <td>{facteur.user["prenom"]}</td>
                                        <td>{this.getEtatState(facteur)}</td>
                                        <td>
                                        <button type="button" onClick={()=>{
                                          
                                          this.state.emailMSG['client_email']=facteur.client["email"];
                                          this.state.emailMSG['client_nom']=facteur.client["nom"];
                                          this.state.emailMSG['client_prenom']=facteur.client["prenom"];
                                          this.state.emailMSG['entroprise_nom']=facteur.entroprise["nom"];
                                          this.state.emailMSG['f_montant']=facteur.montant;
                                          this.state.emailMSG['user_nom']=facteur.user["nom"];
                                          this.state.emailMSG['user_prenom']=facteur.user["prenom"];
                                          this.state.emailMSG['agence']=facteur.user["agence"];
                                          
                                      this.editeCar(facteur.car_id)}} class="btn rounded-pill btn-info">Pay</button>
                                        </td>
                                    </tr>)
                                  }
                                    }
                                  
                                )
                            }
              </tbody>
            </table>
          </div>
        </div>
                              </div>
                              
                            </div>
                          </div>
                        </div>
              </div>
            </div>
          </div>
        </div>
        {/* / Slide wrapper */}



  </div>
</div>
{/* / Content */}
</div></div>
            </>
        );
    }
}


export default ServicePayComponent;