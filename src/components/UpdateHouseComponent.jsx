import React, { Component } from 'react';
import HouseService from '../services/HouseService';
import UserService from '../services/UserService';
import ClientService from '../services/ClientService';
import EntropriseService from '../services/EntropriseService';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import AsideComponent from './AsideComponent';

class UpdateHouseComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            house_id:this.props.match.params.house_id,
            reference: "",
            date: "",
            montant:"",
            etat: "",
            address_house:"",
            user_id:"",
            entroprise_id:"",
            client_id:"",
            prenomU:"",
            prenomC:"",
            nomE:"",
            users:[],
            entroprises:[],
            clients:[]
        }
        this.changeReferenceHandler=this.changeReferenceHandler.bind(this);
        this.changeAddress_houseHandler=this.changeAddress_houseHandler.bind(this);
        this.changeMontantHandler=this.changeMontantHandler.bind(this);
        this.changeEtatHandler=this.changeEtatHandler.bind(this);
        this.changeDateHandler=this.changeDateHandler.bind(this);
        this.changeUserHandler=this.changeUserHandler.bind(this);
        this.changeClientHandler=this.changeClientHandler.bind(this);
        this.changeEntropriseHandler=this.changeEntropriseHandler.bind(this);
        this.updateHouse=this.updateHouse.bind(this);
    }
    componentDidMount(){
        UserService.getUser().then((res)=>{
            this.setState({users:res.data});

        });
        ClientService.getClient().then((res)=>{
            this.setState({clients:res.data});
        
        });
        EntropriseService.getEntroprise().then((res)=>{
            this.setState({entroprises:res.data});
        
        });
        HouseService.getHouseById(this.state.house_id).then((res)=>{
            let house=res.data;
            this.setState({
                reference:house.reference,
                date:house.date,
                montant:house.montant,
                etat:house.etat,
                address_house:house.address_house,
                prenomU:house.user.prenom,
                prenomC:house.client.prenom,
                nomE:house.entroprise.nom,
                client_id:house.client.client_id,
                user_id:house.user.userId,
                entroprise_id:house.entroprise.entroprise_id

            });
        
        });

    }
    updateHouse=(h)=>{
        h.preventDefault();
        let house={reference:this.state.reference,
            date:this.state.date,
            montant:this.state.montant,
            etat:this.state.etat,
            address_house:this.state.address_house,
            user_id:this.state.user_id,
            client_id:this.state.client_id,
            entroprise_id:this.state.entroprise_id,
        };
        console.log('house => '+JSON.stringify(house));
        console.log(house.user_id);
        HouseService.updateHouse(this.state.user_id,this.state.client_id,this.state.entroprise_id,this.state.house_id,house).then(res=>{
            
            window.history.pushState({}, undefined, `/houses`);
            window.history.go();

        })

    }
    changeReferenceHandler=(event)=>{
        this.setState({reference:event.target.value})
    }
    changeAddress_houseHandler=(event)=>{
        this.setState({address_house:event.target.value})
    }
    changeMontantHandler=(event)=>{
        this.setState({montant:event.target.value})
    }
    changeEtatHandler=(event)=>{
        this.setState({etat:event.target.value})
    }
    changeDateHandler=(event)=>{
        this.setState({date:event.target.value})
    }
    changeUserHandler=(event)=>{
        this.setState({user_id:event.target.value})
    }
    changeClientHandler=(event)=>{
        this.setState({client_id:event.target.value})
    }
    changeEntropriseHandler=(event)=>{
        this.setState({entroprise_id:event.target.value})
    }
    cancel(){
        this.props.history.push('/houses')
        window.location.reload(true);
    }
    EtatString(){
      if((this.state.etat)==1){
        return<span className="badge bg-label-success me-1">Payed</span>
  }else{
        return<span className="badge bg-label-danger me-1">Not payed</span>
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
      <h1>HAOUSE-Bill</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item active">House Bill</li>
        </ol>
      </nav>
    </div>{/* End Page Title */}
    <section className="section dashboard">
     {/* End Left side columns */}
        {/* Right side columns */}
{/* Order Statistics */}
<div className="col-xxl">
  <div className="card mb-4">
    <div className="card-header d-flex align-items-center justify-content-between">
      <h5 className="mb-0"> </h5>
      <small className="text-muted float-end"> </small>
    </div>
    <div className='text-center'>
                            <h5 className="text-center mt-3"><i className="bi bi-pencil-square"></i> House Bill</h5>
                        <img height="100x" width="100px" src="https://cdn4.iconfinder.com/data/icons/medicine-and-insurances/128/house-safe-shield-home_insurance-1024.png" alt="" />
                        </div>
    <div className="card-body mt-4">
      <form>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-fullname">Frequence</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
              <span id="basic-icon-default-fullname2" className="input-group-text"><i className="bx bx-key" /></span>
              <input type="text" className="form-control" value={this.state.reference} onChange={this.changeReferenceHandler} id="basic-icon-default-fullname" placeholder="John Doe" aria-label="John Doe" aria-describedby="basic-icon-default-fullname2" />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-company">Address</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
              <span id="basic-icon-default-company2" className="input-group-text"><i className="bx bx-home" /></span>
              <input type="text" id="basic-icon-default-company" value={this.state.address_house} onChange={this.changeAddress_houseHandler} className="form-control" placeholder="House adresse." aria-label="house adresse." aria-describedby="basic-icon-default-company2" />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 form-label" htmlFor="basic-icon-default-phone">Payment</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
              <span id="basic-icon-default-phone2" className="input-group-text"><i className="bx bx-dollar" /></span>
              <input type="number" id="basic-icon-default-phone" value={this.state.montant} onChange={this.changeMontantHandler} className="form-control phone-mask" placeholder="0" aria-label="658 799 8941" aria-describedby="basic-icon-default-phone2" />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 form-label" htmlFor="basic-icon-default-7">Date</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
              <span id="basic-icon-default-phone7" className="input-group-text"><i className="bx bx-calendar" /></span>
              <input type="date" id="basic-icon-default-7" value={this.state.date} onChange={this.changeDateHandler} className="form-control phone-mask"  aria-describedby="basic-icon-default-phone7" />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 form-label" htmlFor="basic-icon-default-5">Etat</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
            <div className="input-group">
            <span id="basic-icon-default-fullname2" className="input-group-text"><i className="bx bx-check" /></span>

            <select className="form-select" value={this.state.etat} onChange={this.changeEtatHandler} id="basic-icon-default-5">
                  <option value={this.state.etat}>{this.EtatString()}</option>
                  <option value="0">No payed</option>
            </select>
            </div></div>
          </div>
        </div>
        

        <div className="row mb-3">
          <label className="col-sm-2 form-label" htmlFor="basic-icon-default-select">Client</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
            <div className="input-group">
            <span id="basic-icon-default-fullname2" className="input-group-text"><i className="bx bx-user" /></span>

            <select className="form-select" onChange={this.changeClientHandler} id="basic-icon-default-select">
                 <option value={this.state.client_id}>{this.state.prenomC}</option>
                                    {
                                    this.state.clients.map(client=>
                                    <option key={client.client_id}  value={client.client_id}>{client.prenom} </option>
                                    ) }
            </select>
            </div></div>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 form-label" htmlFor="basic-icon-default-2">Entroprise</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
            <div className="input-group">
           
            <span id="basic-icon-default-company2" className="input-group-text"><i className="bx bx-buildings" /></span>

            <select className="form-select" onChange={this.changeEntropriseHandler} id="basic-icon-default-2">
                 <option value={this.state.entroprise_id}>{this.state.nomE}</option>
                                    {
                                    this.state.entroprises.map(entroprise=>
                                    <option key={entroprise.entroprise_id}  value={entroprise.entroprise_id}>{entroprise.nom} </option>
                                    ) }
            </select>
            </div></div>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 form-label" htmlFor="basic-icon-default-3">User</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
            <div className="input-group">
            <span id="basic-icon-default-fullname2" className="input-group-text"><i className="bx bx-user" /></span>

            <select className="form-select" onChange={this.changeUserHandler} id="basic-icon-default-3">
                <option value={this.state.user_id}>{this.state.prenomU}</option>
                                    {
                                    this.state.users.map(user=>
                                    <option key={user.userId}  value={user.userId}>{user.prenom} </option>
                                    ) }
            </select>
            </div></div>
          </div>
        </div>


        <div className="row justify-content-end">
          <div className="col-sm-10">
            <button type="submit" onClick={this.updateHouse} className="btn btn-outline-success"><i className="bx bx-refresh" /> Update</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>


    {/*/ Transactions */}
    </section>
    
 
            

  </main>{/* End #main */}</div>
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


export default UpdateHouseComponent;