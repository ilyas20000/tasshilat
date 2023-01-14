import React, { Component } from 'react';
import CarService from '../services/CarService';
import UserService from '../services/UserService';
import ClientService from '../services/ClientService';
import EntropriseService from '../services/EntropriseService';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import AsideComponent from './AsideComponent';
class addCarComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            reference: this.getCurrentDate(),
            date: this.getDateaAdd(),
            montant:0,
            etat: 0,
            matricule:"",
            user_id:"",
            entroprise_id:"",
            client_id:"",
            users:[],entroprises:[],
            clients:[]
        }
        this.changeReferenceHandler=this.changeReferenceHandler.bind(this);
        this.changeMatriculeHandler=this.changeMatriculeHandler.bind(this);
        this.changeMontantHandler=this.changeMontantHandler.bind(this);
        this.changeEtatHandler=this.changeEtatHandler.bind(this);
        this.changeDateHandler=this.changeDateHandler.bind(this);
        this.changeUserHandler=this.changeUserHandler.bind(this);
         this.changeClientHandler=this.changeClientHandler.bind(this);
        this.changeEntropriseHandler=this.changeEntropriseHandler.bind(this);

        this.saveCar=this.saveCar.bind(this);
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
    }
    saveCar=(h)=>{
        h.preventDefault();
        let car={reference:this.state.reference,
            date:this.state.date,
            montant:this.state.montant,
            etat:this.state.etat,
            matricule:this.state.matricule,
            user_id:this.state.user_id,
            client_id:this.state.client_id,
            entroprise_id:this.state.entroprise_id,
        };
        
        console.log('car => '+JSON.stringify(car));
        console.log(car.user_id)
        CarService.addCar(car.user_id,car.client_id,car.entroprise_id,car).then(res=>{
            
          window.history.pushState({}, undefined, "/cars");
          window.history.go();
        })

    }
    
    getDateaAdd(separator='-'){
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }
    getCurrentDate(separator='#'){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let houri=newDate.getHours();
        let minuti=newDate.getMinutes();
        let secondi=newDate.getSeconds();
        let secondMill=newDate.getMilliseconds();
        
        return `${separator}${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}${separator}${houri}${minuti}${secondi}${secondMill}`
        }
    changeReferenceHandler=(event)=>{
        this.setState({reference:event.target.value})
    }
    changeMatriculeHandler=(event)=>{
        this.setState({matricule:event.target.value})
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
        this.props.history.push('/cars')
        window.location.reload(true);
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
     {/* End Left side columns */}
        {/* Right side columns */}
{/* Order Statistics */}
<div className="col-xxl">
  <div className="card mb-4">
    <div className="card-header d-flex align-items-center justify-content-between">
      <h5 className="mb-0"> </h5>
      <small className="text-muted float-end"> </small>
    </div><div className='text-center'>
                            <h5 className="text-center mt-3"><i className="bi bi-plus-lg"></i> Car Bill</h5>
                        <img height="100x" width="100px" src="https://th.bing.com/th/id/OIP.gNOa5gMDgIBW0BdpLQBSBwAAAA?pid=ImgDet&rs=1" alt="" />
                        </div>
    <div className="card-body mt-4">
      <form>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-fullname">Reference</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
              <span id="basic-icon-default-fullname2" className="input-group-text"><i className="bx bx-key" /></span>
              <input type="text" className="form-control" value={this.state.reference} onChange={this.changeReferenceHandler} id="basic-icon-default-fullname" placeholder="John Doe" aria-label="John Doe" aria-describedby="basic-icon-default-fullname2" />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-company">Matricule</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
              <span id="basic-icon-default-company2" className="input-group-text"><i className="bx bx-car" /></span>
              <input type="text" id="basic-icon-default-company" value={this.state.matricule} onChange={this.changeMatriculeHandler} className="form-control" placeholder="Car matricule." aria-label="Car matricule." aria-describedby="basic-icon-default-company2" />
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
                <option></option>
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
                 <option></option>
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
                <option></option>
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
            <button type="submit" onClick={this.saveCar} className="btn btn-outline-success"><i className="bx bx-save" /> Save</button>
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

export default addCarComponent;