import React from 'react'
import axios from 'axios';

import Sidebar from '../../../../components/Sidebar'
import Navbar from '../../../../components/Navbar'
import PdfWifi from '../../../../components/PdfWifi';


function Wifi() {

    const[wifis, setWifis] = React.useState([])
    const [operators, setOperators] = React.useState([])

    const [id, setId] = React.useState("");

    let [openUpdate, setOpenUpdate] = React.useState();
    let [openDelete, setOpenDelete] = React.useState();
    const ipURL = process.env.REACT_APP_URL
    const loadWifis = async()=>{
        const all = await axios.get(ipURL+'/Phone-Internet/wifi/all')
        setWifis(all.data)
        console.log(all.data)
    }

    const loadOperators = async()=>{
        const all = await axios.get(ipURL+'/Phone-Internet/operator/all')
        setOperators(all.data)
        console.log(all.data)
        
      }

      const search = async(e)=>{
        const sid = e.target.value
        const some = await axios.get(ipURL+'/Phone-Internet/wifi/code/'+sid)
        setWifis(some.data)
        console.log(some.data)
    }


    const deleteWifi = async(e) => {
      console.log(e.target.value)
      const id = e.target.value
      document.getElementById('deleteId').value = id


    }

    const confirmDeletePhone = async(e) => {
      console.log(e.target.value)
      const id = e.target.value
      await axios.delete(ipURL+'/Phone-Internet/wifi/delete?id='+id)
      setOpenDelete(openDelete?false:true)
      loadWifis()


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
      const wifi = {id}
      console.log(wifi)
      await axios.post(ipURL+'/Phone-Internet/wifi/update', wifi)
      setOpenUpdate(openUpdate?false:true)
      loadWifis()
      

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



    React.useEffect(()=>{
        loadWifis()
        loadOperators()
    },[])
  return (
    <>
    <Sidebar/>
      <div className="layout-page">
        <Navbar/>
        <div className="content-wrapper">
    <div className="container-xxl flex-grow-1 container-p-y">

      <div className={`bs-toast toast toast-placement-ex m-2 bg-info top-0 end-0 fade ${openUpdate?"show":"hide"}`} role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
        <div className="toast-header">
          <i className="bx bx-bell me-2"></i>
          <div className="me-auto fw-semibold">Item updated</div>
          <small>now</small>
          <button type="button" className="btn-close" data-bs-dismiss="toast" onClick={(e)=>setOpenUpdate(openUpdate?false:true)} aria-label="Close"></button>
        </div>
        <div className="toast-body">This item was updated successfully in the database.</div>
      </div>
      <div className={`bs-toast toast toast-placement-ex m-2 bg-danger top-0 end-0 fade ${openDelete?"show":"hide"}`} role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
        <div className="toast-header">
          <i className="bx bx-bell me-2"></i>
          <div className="me-auto fw-semibold">Item deleted</div>
          <small>now</small>
          <button type="button" className="btn-close" data-bs-dismiss="toast" onClick={(e)=>setOpenDelete(openDelete?false:true)} aria-label="Close"></button>
        </div>
        <div className="toast-body">This item was deleted successfully in the database.</div>
      </div>
        <div className='row pb-0'>
            <div className='col-11'>
                <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Wifi Bills /</span> list</h4>
            </div>
            <div className='col-1 pt-3'>
                <a href="/wifi/bills-add" className="btn btn-primary">add</a>
            </div>
        </div>
        <div className="card">
        <div className="row text-nowrap">
                <div className="col-9">
                  <h5 className="card-header">Wifi Bills</h5>
                  </div>
                  <div className="col-3 pe-5">
                  <input
                      type="text"
                      name='fname'
                      className="form-control m-3"
                      placeholder="Search by code (#...)"
                      onChange={(e)=>search(e)}
                    />
                  </div>
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
                        <td>{wifi.price} DH</td>
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
                                ><i className="bx bx-edit-alt me-1" ></i> Payer</button>
                              <button className="dropdown-item" data-bs-toggle="modal" onClick={(e)=>deleteWifi(e)} value={wifi.id}
                              data-bs-target="#deleteModal" 
                                ><i className="bx bx-trash me-1"></i> Delete</button>

                               <PdfWifi wifi={wifi} type={"dropdown-item"}/>
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

                        <div className="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel1">Delete Wifi Bill </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">Are you sure you want to delete this wifi bill.</div>
                              <div className="modal-footer">
                              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                                  Close
                                </button>
                                <button
                                  className="btn btn-primary"
                                  id='deleteId'
                                  onClick={(e)=>confirmDeletePhone(e)}
                                  data-bs-dismiss="modal"
                                >
                                  Yes
                                </button>
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

export default Wifi