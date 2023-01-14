import React from 'react'
import axios from 'axios'
import Sidebar from '../../../../components/Sidebar'
import Navbar from '../../../../components/Navbar'


function Client() {

    const[clients, setClients] = React.useState([])
    const [operators, setOperators] = React.useState([])
    const [edit, setEdit] = React.useState("")


    const [email, setEmail] = React.useState('')
    const [number, setNumber] = React.useState('')
    const [fname, setFName] = React.useState('')
    const [lname, setLName] = React.useState('')
    const [birthdate, setBirthDate] = React.useState('')
    const [cin, setCin] = React.useState('')
    const [id, setId] = React.useState("");

    let [openUpdate, setOpenUpdate] = React.useState();
    let [openDelete, setOpenDelete] = React.useState();

    const loadClients = async()=>{
        const all = await axios.get(ipURL+'/Phone-Internet/client/all')
        setClients(all.data)
        console.log(all.data)
    }

    const ipURL = process.env.REACT_APP_URL

    const deleteClient = async(e) => {
      console.log(e.target.value)
      const id = e.target.value
      document.getElementById('deleteId').value = id
    }

    const confirmDeleteClient = async(e) => {
      console.log(e.target.value)
      const id = e.target.value
      await axios.delete(ipURL+'/Phone-Internet/client/delete?id='+id)
      loadClients()
      setOpenDelete(openDelete?false:true)
    }

    const editClient = async(e) => {
      console.log(e.target.value)
      const id = e.target.value
      const clientEdit = await axios.get(ipURL+'/Phone-Internet/client/get?id='+id)
      console.log('in edit')
      setEdit(clientEdit.data)

      setEmail(clientEdit.data.email)
      setFName(clientEdit.data.fname)
      setLName(clientEdit.data.lname)
      setNumber(clientEdit.data.number)
      setBirthDate(clientEdit.data.birthdate)
      setCin(clientEdit.data.cin)
      
      setId(clientEdit.data.id)

      console.log(clientEdit.data)
      

    }

    const updatePhone = async(e) => {
      const client = {id, number, email, fname, lname, birthdate, cin}
      console.log(client)
      await axios.post(ipURL+'/Phone-Internet/client/update', client)
      loadClients()
      setOpenUpdate(openUpdate?false:true)


    }

    

    React.useEffect(()=>{
        loadClients()
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
                <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Wifi CLients /</span> list</h4>
            </div>
            <div className='col-1 pt-3'>
                <a href="/wifi/clients-add" className="btn btn-primary">add</a>
            </div>
        </div>
        <div className="card">
              <div className="row text-nowrap">
                <div className="col-9">
                  <h5 className="card-header">Clients List</h5>
                  </div>
                  <div className="col-3 pe-5">
                  <input
                      type="text"
                      name='fname'
                      className="form-control m-3"
                      placeholder="Search by code (#...)"
                    />
                  </div>
              </div>
                <div className="table-responsive text-nowrap">
                  <table className="table" id="tab">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Bith Date</th>
                        <th>Cin</th>
                        <th>Code</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        {clients.map((client)=>(
                      <tr>
                        <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>{client.id}</strong></td>
                        <td>{client.fname}</td>
                        <td>{client.lname}</td>
                        <td>{client.email}</td>
                        <td>
                        {client.birthdate}
                        </td>
                        <td>{client.cin}</td>
                        <td>{client.code}</td>
                        <td>
                          <div className="dropdown">
                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i className="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div className="dropdown-menu">
                              <button className="dropdown-item" data-bs-toggle="modal"
                              data-bs-target="#editModal" onClick={(e)=>editClient(e)} value={client.id}
                                ><i className="bx bx-edit-alt me-1" ></i> Edit</button>
                              <button className="dropdown-item" data-bs-toggle="modal"
                              data-bs-target="#deleteModal" onClick={(e)=>deleteClient(e)} value={client.id}
                                ><i className="bx bx-trash me-1"></i> Delete</button>
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
                                <h5 className="modal-title" id="exampleModalLabel1">Edit Phone Bill </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <div className="row">
                                  <div className="col mb-3">
                                    <label for="nameBasic" className="form-label">Number</label>
                                    <input type="text" id="editNumber" className="form-control" placeholder="Enter Name" value={number} onChange={(e)=>setNumber(e.target.value)}/>
                                  </div>
                                </div>
                                <div className="row g-2">
                                  <div className="col mb-0">
                                  <label for="dobBasic" className="form-label">First Name</label>
                                  <input
                                type="text"
                                name='fname'
                                value={fname}
                                className="form-control"
                                placeholder="first name"
                                aria-label="Amount (to the nearest dollar)"
                                onChange={(e)=>setFName(e.target.value)}
                              />
                              </div>
                                  <div className="col mb-0">
                                    <label for="dobBasic" className="form-label">Last Name</label>
                                    <input
                                type="text"
                                name='lname'
                                value={lname}
                                className="form-control"
                                placeholder="first name"
                                aria-label="Amount (to the nearest dollar)"
                                onChange={(e)=>setLName(e.target.value)}
                              />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col mb-3">
                                    <label for="nameBasic" className="form-label">Email</label>
                                    <input type="text" id="editEmail" className="form-control" placeholder="Enter Name" value={email}  onChange={(e)=>setEmail(e.target.value)}/>
                                  </div>
                                </div>
                                <div className="row g-2">
                                  <div className="col mb-0">
                                  <label for="dobBasic" className="form-label">Bithdate</label>
                                  <input
                                type="date"
                                name='bdate'
                                value={birthdate}
                                className="form-control"
                                placeholder="100"
                                aria-label="Amount (to the nearest dollar)"
                                onChange={(e)=>setBirthDate(e.target.value)}
                              />
                              </div>
                                  <div className="col mb-0">
                                    <label for="dobBasic" className="form-label">CIN</label>
                                    <input
                                type="text"
                                name='cin'
                                value={cin}
                                className="form-control"
                                placeholder="B123..."
                                aria-label="Amount (to the nearest dollar)"
                                onChange={(e)=>setCin(e.target.value)}
                              />
                                  </div>
                                </div>
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
                                <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={(e)=>updatePhone()}>Save changes</button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel1">Delete Phone Bill </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">Are you sure you want to delete this phone bill.</div>
                              <div className="modal-footer">
                              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                                  Close
                                </button>
                                <button
                                  className="btn btn-primary"
                                  id='deleteId'
                                  onClick={(e)=>confirmDeleteClient(e)}
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

export default Client