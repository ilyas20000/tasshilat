import React from 'react'
import axios from 'axios'
import NavbarUser from '../../../components/NavbarUser'
import PDFXL from '../../../components/PDFXL'
import PdfWifi from '../../../components/PdfWifi'
import emailjs from '@emailjs/browser'

function UserWifi() {

  const[wifis, setWifis] = React.useState([])
  const[wifi, setWifi] = React.useState("")


  const [id, setId] = React.useState("");

  let [openUpdate, setOpenUpdate] = React.useState();
  let [pdf, setPDF] = React.useState();
  let [ability, setAbility] = React.useState();
  const ipURL = process.env.REACT_APP_URL
  const loadWifis = async()=>{
    const all = await axios.get(ipURL+'/Phone-Internet/wifi/not')
    setWifis(all.data)
    console.log(all.data)
}



const editWifi = async(e) => {
  console.log(e.target.value)
  const id = e.target.value
  const wifiEdit = await axios.get(ipURL+'/Phone-Internet/wifi/get?id='+id)
  //setEdit(phoneEdit.data)

  /*setEmail(phoneEdit.data.email)
  setAmount(phoneEdit.data.amount)
  setNumber(phoneEdit.data.number)
  setOperator(phoneEdit.data.operator)
  document.getElementById("editOperator").selectedIndex = phoneEdit.data.operator.operatorId-1;*/
  
  setId(wifiEdit.data.id)

  console.log(wifiEdit.data)
  

}

const updateWifi = async(e) => {
  const wifiz = {id, user: JSON.parse(sessionStorage.getItem("user"))}
  console.log(wifiz)
  const wifi = await axios.post(ipURL+'/Phone-Internet/wifi/update', wifiz)
  setOpenUpdate(openUpdate?false:true)
  console.log(wifi.data)
  emailjs.send("service_u16sz3s","template_oa5ayy",{
    type_subject: "Wifi",
    type_text: "Wifi",
    number: wifi.data.client.number,
    price: wifi.data.price,
    operator: wifi.data.operator.name,
    email: wifi.data.email,
    },"x-a75am7vos_rmljv");
  document.getElementById("pdf-"+id).click()
  loadWifis()

}



const search = async(e)=>{
  const sid = e.target.value
  const some = await axios.get(ipURL+'/Phone-Internet/wifi/not-code/'+sid)
  setWifis(some.data)
  console.log(some.data)
}

const reset = async()=>{

  setPDF(pdf?false:true)
  setAbility(ability?false:true)
}

const toMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}

const state = (state) => {
  if(state == "Not payed"){
      return <span className="badge bg-label-danger me-1">{state}</span>;
  }else if (state == "Payed"){
      return <span className="badge bg-label-success me-1">{state}</span>;
  }
} 

  React.useEffect(() => {
    loadWifis();

  }, [])

  return (
    <>
      <div className="layout-page">
        <NavbarUser/>
        <div className="content-wrapper pb-5">
          <div className="container-xxl flex-grow-1 container-p-y mb-5">
          <div className={`bs-toast toast toast-placement-ex m-2 bg-info top-0 end-0 fade ${openUpdate?"show":"hide"}`} role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
        <div className="toast-header">
          <i className="bx bx-bell me-2"></i>
          <div className="me-auto fw-semibold">Item payed</div>
          <small>now</small>
          <button type="button" className="btn-close" data-bs-dismiss="toast" onClick={(e)=>setOpenUpdate(openUpdate?false:true)} aria-label="Close"></button>
        </div>
        <div className="toast-body">This item was payed successfully.</div>
      </div>
          <div className="m-5 text-center"><h2>Wifi</h2></div>
          <div className="card mb-4">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">Pay Wifi Bill</h5>

                    </div>
                    <div className="card-body">
                      <form>
                        <div className="row mb-3">
                          
                  <label className="col-sm-1 col-form-label" for="basic-default-name">Code</label>
                          <div className="col-sm-10">
                            <input type="text" className="form-control" name="fname" id="basic-default-name" placeholder="Search by code (#...)" onChange={(e)=>search(e)}/>
                          </div>
                        </div>

                      </form>
                      <div style={{display: `${pdf?"block":"none"}`}}><PDFXL/></div>
                    </div>
                  </div>
                  <div className="card">
        <div className="row text-nowrap">
                  <h5 className="card-header">Wifi Bills</h5>
              </div>
                <div className="table-responsive text-nowrap">
                  <table className="table">
                    <thead className="table-light">
                      <tr>
                      <th>#</th>
                        <th>Code</th>
                        <th>Client</th>
                        <th>Price</th>
                        <th>Month</th>
                        <th>Operator</th>
                        <th>State</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        {wifis.map((wifi)=>(
                      <tr>
                        <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>{wifi.id}</strong></td>
                        <td>{wifi.code} </td>
                        <td>{wifi.client.lname+" "+wifi.client.fname}</td>
                        <td><span class="badge bg-label-primary ">{wifi.price} DH</span> </td>
                        <td>
                        {toMonthName(wifi.month)} 
                        </td>
                        <td>{wifi.operator.name}</td>

                        <td>{state(wifi.state)}</td>
                        <td>
                          <div className="dropdown">
                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i className="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div className="dropdown-menu">
                              <button className="dropdown-item" data-bs-toggle="modal" onClick={(e)=>editWifi(e)} value={wifi.id}
                              data-bs-target="#editModal" 
                                ><i className="bx bx-dollar me-1" ></i> Payer</button>

<div hidden><PdfWifi wifi={wifi} type={"dropdown-item"} iden={"pdf-"+wifi.id}/></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>

                  <div className="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel1">Edit wifi Bill </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>

                              <div className="modal-body">Are you sure you want to pay this wifi bill.
                              <div className="row" hidden>
                                  <div className="col mb-3">
                                    <input type="text" id="editNumber" className="form-control" placeholder="Enter Name" value={id}  onChange={(e)=>setId(e.target.value)}/>
                                  </div>
                                </div>
                              </div>

                              <div className="modal-footer">
                                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                                  Close
                                </button>
                                <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={(e)=>updateWifi()}>Save changes</button>
                              </div>
                            </div>
                          </div>
                        </div>
                         
                </div>
              </div>
           
          </div>
        </div>
      </div>
      </>
  )
}

export default UserWifi