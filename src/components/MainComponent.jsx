import React, { Component } from 'react';
import EntropriseService from '../services/EntropriseService';
import AsideComponent from './AsideComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
class MainComponent extends Component {
  constructor(props){
    super(props)
    
    this.state={
        
        entroprise_id:localStorage.getItem("ent_id"),
        nom:"",
        description:"",
        logo:"",
        entroprises:[],
    }

    this.changeNomHandler=this.changeNomHandler.bind(this);
        this.changeDescriptionHandler=this.changeDescriptionHandler.bind(this);
        this.changeLogoHandler=this.changeLogoHandler.bind(this);
        this.saveEntroprise=this.saveEntroprise.bind(this);
        this.viewEntroprise=this.viewEntroprise.bind(this);
        this.updateEntroprise=this.updateEntroprise.bind(this);
        this.editeEntroprise=this.editeEntroprise.bind(this);
    }

    saveEntroprise=(e)=>{
      
      e.preventDefault();
      const formData = new FormData();
      formData.append('logo', this.state.logo);
      formData.append('nom', this.state.nom);
      formData.append('description', this.state.description);
     
      if(!this.state.entroprise_id){
        EntropriseService.addEntroprise(formData).then(res=>{
          
        window.history.pushState({}, undefined, `/factureM`);
        window.history.go();
      })
        }else{
          EntropriseService.updateEntroprise(
            this.state.entroprise_id,formData).then(res=>{
        window.history.pushState({}, undefined, `/factureM`);
        window.history.go();
          })   
      }
      

  }
  editeEntroprise(entroprise_id){

                console.log("id entr : "+entroprise_id)
        localStorage.setItem("ent_id",entroprise_id)
        window.history.pushState({}, undefined, `/factureM/${entroprise_id}`);
        window.history.go();
    }

    viewEntroprise(entroprise_id){
      localStorage.setItem("ent_id_bill",entroprise_id)

        window.history.pushState({}, undefined, `/factory_entrobrise/${entroprise_id}`);
        window.history.go();
        console.log("e n t")

    }
    componentDidMount(){
      EntropriseService.getEntroprise().then((res)=>{
          this.setState({entroprises:res.data});
      
      });
      if(this.state.entroprise_id==-1){
            return
      }else{
        
        EntropriseService.getEntropriseById(this.state.entroprise_id).then((res)=>{
            let entroprise=res.data;
            this.setState({
              entroprise_id:entroprise.entroprise_id,
                nom:entroprise.nom,
                description:entroprise.description,
                logo:entroprise.logo,
               
            });
        
        });
      }
  }

  updateEntroprise=(h)=>{
        h.preventDefault();
        let entroprise={nom:this.state.nom,
            description:this.state.description,
            logo:this.state.logo,
        };
        
        EntropriseService.updateEntroprise(
          this.state.entroprise_id,entroprise).then(res=>{
            this.props.history.push("/factureM");
            window.location.reload(true);

        })

    }
    changeNomHandler=(event)=>{
        this.setState({nom:event.target.value})
    }
    changeDescriptionHandler=(event)=>{
        this.setState({description:event.target.value})
    }
    changeLogoHandler=(event)=>{
        this.setState({logo:event.target.files[0]})
    }
     getTiltleUp(){
      if(!this.state.entroprise_id){
       
        return <h5 className="text-center mt-3"><i className="bx bx-plus"></i><i className="bx bx-buildings"></i> Company</h5>
      }else{
       return <h5 className="text-center mt-3"><i className="bi bi-pencil-square"></i><i className="bx bx-buildings"></i> Company</h5>
      
      }
     }
     getBtneUp(){
      if(!this.state.entroprise_id){
       
        return <div className="col-sm-10">
        <button type="submit" onClick={this.saveEntroprise} className="btn btn-outline-success">Save</button>
        <button type="reset" className="btn btn-outline-danger" style={{marginLeft:"20px",color:"black"}}>Cancel</button>
        </div>
        
      }else{
       return  <div className="col-sm-10">
       <button type="submit" onClick={this.saveEntroprise} className="btn btn-outline-warning"><i className="bx bx-refresh" /> Update</button>
       </div>
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
  <div className="row">
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
    <div className="col-xxl">
  <div className="card mb-4">
    <div className="card-header d-flex align-items-center justify-content-between">
      <h5 className="mb-0"> </h5>
      <small className="text-muted float-end"></small>
    </div>
    <div className="card-body mt-4">
    <div className='text-center mb-5'>
        {this.getTiltleUp()}  </div>
      <form encType="multipart/form-data">

        
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-company">Company</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
              <span id="basic-icon-default-company2" className="input-group-text"><i className="bx bx-buildings" /></span>
              <input type="text" name='nom' id="basic-icon-default-company" value={this.state.nom} onChange={this.changeNomHandler} className="form-control" placeholder="Enter Company Name." aria-label="ACME Inc." aria-describedby="basic-icon-default-company2" />
            </div>
          </div>
        </div>
       
        <div className="row mb-3">
          <label className="col-sm-2 form-label" htmlFor="basic-icon-default-message">DESCRIPTION</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
              <span id="basic-icon-default-message2" className="input-group-text"><i className="bx bx-comment" /></span>
              <textarea id="basic-icon-default-message" name='description' value={this.state.description} onChange={this.changeDescriptionHandler} className="form-control" placeholder="Hi, Write something about the Company!" aria-label="Hi, Write something about the Company!" aria-describedby="basic-icon-default-message2"/>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 form-label" htmlFor="basic-icon-default-message">LOGO</label>
          <div className="col-sm-10">
            <div className="input-group input-group-merge">
              <input className="form-control" type="file" name='logo'  onChange={(event)=> this.setState({logo:event.target.files[0]})} id="formFile" />
          </div>
          </div>
        </div>
        <div className="row justify-content-end">
          {this.getBtneUp()}
        </div>
      </form>

    </div>
  </div>
</div>


    {/*/ Transactions */}
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
                    <a className="dropdown-item" onClick={()=>this.editeEntroprise(`${entroprise.entroprise_id}`)} href>Edite</a>
                    
                    
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

<FooterComponent/>
          </div>
          </div>
</div>
</div>

</>
        );
    }
}

export default MainComponent;