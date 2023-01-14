import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import HouseService from '../services/HouseService';
import NavBarServiceComponent from './NavBarServiceComponent';

class PH_S extends Component {
    constructor(props){
        super(props)
        this.state={
            componentRef: React.createRef(),
            id:localStorage.getItem("house_id_srv"),
            fre:"",
            fact:{
                 reference: "",
                date: "",
                montant:"",
                address_house:"",
                client_nom: "",
                client_prenom: "",
                agence:"",
                user_nom: "",
                user_prenom: "",
                entreprise: "",
                entreprise_logo:""
                
            }
            
        }
        
       
        }

        componentDidMount(){
            HouseService.getHouseById(this.state.id).then((res)=>{
                        let house=res.data;
                        console.log(house.user["prenom"])

                        this.state.fact['reference']=house.reference;
                        this.state.fact['date']=house.date;
                        this.state.fact['address_house']=house.address_house;
                        this.state.fact['montant']=house.montant;
                        this.state.fact['client_nom']=house.client["nom"];
                        this.state.fact['client_prenom']=house.client["prenom"];
                        this.state.fact['user_nom']=house.user["nom"];
                        this.state.fact['user_prenom']=house.user["prenom"];
                        this.state.fact['entreprise']=house.entroprise["nom"];
                        this.state.fact['agence']=house.user["agence"];
                        this.state.fact['entreprise_logo']=house.entroprise["logo"];
                        this.setState({fre:house.reference})
                  console.log(this.state.fact['reference']+" -- | "+this.state.fact['entreprise'])
                    
                    });
            
                }

       getCurrentDate(separator='-'){
        let s=":"
        let q="    "
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let houri=newDate.getHours();
        let minuti=newDate.getMinutes();
        let secondi=newDate.getSeconds();
        let secondMill=newDate.getMilliseconds();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}${q}${q}${houri}${s}${minuti}${s}${secondi}${s}${secondMill}`
        }

  render() {


    return (
    <>  <NavBarServiceComponent/>
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
    </div>
                <div className="container-xxl flex-grow-1 container-p-y">
  <div className="row">
  
        <div class="layout-page">
        <div class="content-wrapper">
            <div class="container-xxl flex-grow-1 container-p-y">
<ReactToPrint
        trigger={()=>{
            return                <button  class="btn btn-light text-capitalize border-0" data-mdb-ripple-color="dark"><i class='bx bxs-printer' style={{ color: "red" }}></i> Print</button>

        }}
        content={()=>this.componentRef}
        documentTitle="new doc"
        pageStyle="print"
        
        />
                <div class="row">
                    <div class="card mb-4">
                        <div ref={el=>(this.componentRef=el)} class="card-body">
                            <div class="container mb-5 mt-3">
                                <div class="row d-flex align-items-baseline">
                                    <div class="col-xl-3">
                                        <img class="card-img-top" src={'data:image/jpeg;base64,' + this.state.fact["entreprise_logo"]} alt="Card"  height="100px" width="100px" />
                                    </div>
                                    <div class="col-xl-6">

                                    </div>
                                    <div class="col-xl-3 float-end">
                                        <img class="card-img-top" src="https://seeklogo.com/images/T/tasshilat-logo-EF4B36438D-seeklogo.com.png" alt="Card" width="130" height="130" />
                                    </div>
                                    <hr />
                                </div>

                                <div class="container">
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <h3 ><b>Reçu de paiement</b></h3>
                                        </div>

                                    </div>
                                    <div class="row">

                                        <div class="col-xl-8">
                                            <ul class="list-unstyled">
                                                <li > <span
                                                    class="fw-bold">Référence:</span>{this.state.fact["reference"]}</li>
                                                <li > <span
                                                    class="fw-bold">Client: </span>{this.state.fact["client_nom"]} {this.state.fact["client_prenom"]}</li>
                                                <li > <span
                                                    class="me-1 fw-bold">Agence:</span>{this.state.fact["agence"]}</li>
                                                <li > <span
                                                    class="me-1 fw-bold">Agent:</span>{this.state.fact["user_nom"]} {this.state.fact["user_prenom"]}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <br />

                                    <div class="row my-2 mx-1 justify-content-center ">
                                        <table class="table table-striped table-bordered">
                                            <thead class="text-white">
                                                <tr>

                                                    <th scope="col">Adress</th>
                                                    <th scope="col">Nom de l'entreprise</th>
                                                    <th scope="col">Date de paiement</th>
                                                    <th scope="col">Montant</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{this.state.fact["address_house"]}</td>
                                                    <td>{this.state.fact["entreprise"]}</td>
                                                    <td>{this.getCurrentDate()}</td>
                                                    <td>{this.state.fact["montant"]} DH</td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>
                                    <br />
                                    <hr />
                                    <div class="row d-flex align-items-baseline">
                                        <div class="col-xl-3">
                                            <p>Signature de l'Agent</p>
                                        </div>
                                        <div class="col-xl-6">

                                        </div>
                                        <div class="col-xl-3 float-end">
                                            <p>Signature du client</p>
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                    <hr />
                                    <div class="row">
                                        <div class="col-xl-12">
                                            <p>Merci de votre visite</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div >
        </div>
  </div>
                </div>
  </div> 
             </>
        );
    }
}

export default PH_S;