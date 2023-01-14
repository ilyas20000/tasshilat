import React, { Component } from 'react'
import CarService from '../services/CarService'
import ClientService from '../services/ClientService';
import EntropriseService from '../services/EntropriseService';
import Swal from 'sweetalert2'
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import AsideComponent from './AsideComponent';
class ListCarComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            cars:[]
        }
        this.addCar=this.addCar.bind(this);
        this.editeCar=this.editeCar.bind(this);
        this.deleteCar=this.deleteCar.bind(this);

    }
    deleteCar(car_id){

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
            CarService.deleteCar(car_id).then((res)=>{
            this.setState({cars:this.state.cars.filter(car=>car.car_id !== car_id)});
            window.location.reload(true);
        }),
          )
        }
      })
        
    }
    editeCar(car_id){
        
        window.history.pushState({}, undefined, `/updateCar/${car_id}`);
        window.history.go();

    }
    componentDidMount(){
        CarService.getCar().then((res)=>{
            this.setState({cars:res.data});
        
        });
        ClientService.getClient().then((res)=>{
          this.setState({clients:res.data});
      
      });
      EntropriseService.getEntroprise().then((res)=>{
          this.setState({entroprises:res.data});
      
      });
    }
    addCar(){
        this.props.history.push("/Addcar");
        window.location.reload(true);
    }
    getEtatState(facteur){
      if((facteur.etat)==1){
              return<span class="badge bg-label-success me-1">Payed</span>
        }else{
              return<span class="badge bg-label-danger me-1">Not payed</span>
        }
          
        }
    render() {
    return (
        <>
  
  <div className="layout-wrapper layout-content-navbar">
  <div className="layout-container">
              <AsideComponent/>
      <div className="layout-page">
          <HeaderComponent/>
          <div className="content-wrapper">
          {/* Content */}
<div className="container-xxl flex-grow-1 container-p-y">
  <main id="main" className="main">
    <div className="pagetitle">
      <h1>CAR-Bill</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item active">Car Bill</li>
        </ol>
      </nav>
    </div>{/* End Page Title */}
    <section className="section dashboard">
      <div className="row">
        {/* Left side columns */}
        <div className="col-lg-12">
          <div className="row">
            
            <div className="col-12">
            <a className="btn btn-info mb-2" href="/addCar">Add Factery Car</a>
              <div className="card recent-sales overflow-auto">
                <div className="card-body table-responsive text-nowrap">
                  <h5 className="card-title">Car Bill <span>| __</span></h5>
                  <table className="table">
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
                    <tbody>
                    {
                        this.state.cars.map(
                            car=>
                            <tr key={car.car_id}>
                                <th scope="row">{car.reference}</th>
                                <td>{car.date}</td>
                                <td>{car.montant} Dh</td>
                                <td>{car.matricule}</td>
                                <td>{car.client["prenom"]}</td>
                                <td>{car.entroprise["nom"]}</td>
                                <td>{car.user["prenom"]}</td>
                                <td>{this.getEtatState(car) }</td>
                                <td>
                                <div className="dropdown">
                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i className="bx bx-dots-vertical-rounded" /></button>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" onClick={()=>this.editeCar(car.car_id)}  href><i className="bx bx-edit-alt me-1" /> Edit</a>
                              <a className="dropdown-item"  onClick={()=>this.deleteCar(car.car_id)} href><i className="bx bx-trash me-1" /> Delete</a>
                            </div>
                          </div>
                                </td>
                            </tr>
                        )
                    }
                    
                    </tbody>
                  </table>
                </div>
              </div>
            </div>{/* End Recent Sales */}
            {/* Top Selling */}
</div>
        </div>{/* End Left side columns */}
        {/* Right side columns */}
 </div>
    </section>
  </main>{/* End #main */}</div>
{/* / Content */}
<FooterComponent/>
          </div>
          </div>
</div>
</div>

</>
    )
  }
}



export default ListCarComponent