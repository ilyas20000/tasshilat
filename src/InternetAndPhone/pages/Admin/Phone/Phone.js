import React from 'react'
import axios from 'axios'
import Sidebar from '../../../components/Sidebar'
import Navbar from '../../../components/Navbar'

function Phone() {

    const[phones, setPhones] = React.useState([])
    const [operators, setOperators] = React.useState([])
    const [edit, setEdit] = React.useState("")


    const [number, setNumber] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [operator, setOperator] = React.useState("");
    const [id, setId] = React.useState("");

    let [openUpdate, setOpenUpdate] = React.useState();
    let [openDelete, setOpenDelete] = React.useState();
    const ipURL = process.env.REACT_APP_URL

    const loadPhones = async()=>{
        const all = await axios.get(ipURL+'/Phone-Internet/phone/all')
        setPhones(all.data)
        console.log(all.data)
    }

    const loadOperators = async()=>{
      const all = await axios.get(ipURL+'/Phone-Internet/operator/all')
      setOperators(all.data)
      console.log(all.data)
      
    }

    const deletePhone = async(e) => {
      console.log(e.target.value)
      const id = e.target.value
      document.getElementById('deleteId').value = id


    }

    const confirmDeletePhone = async(e) => {
      console.log(e.target.value)
      const id = e.target.value
      await axios.delete(ipURL+'/Phone-Internet/phone/delete?id='+id)
      setOpenDelete(openDelete?false:true)
      loadPhones()


    }

    const editPhone = async(e) => {
      console.log(e.target.value)
      const id = e.target.value
      const phoneEdit = await axios.get(ipURL+'/Phone-Internet/phone/get?id='+id)
      setEdit(phoneEdit.data)

      setEmail(phoneEdit.data.email)
      setAmount(phoneEdit.data.amount)
      setNumber(phoneEdit.data.number)
      setOperator(phoneEdit.data.operator)
      document.getElementById("editOperator").selectedIndex = phoneEdit.data.operator.operatorId-1;
      
      setId(phoneEdit.data.phoneId)

      console.log(phoneEdit.data)
      

    }

    const updatePhone = async(e) => {
      const phoneId = id
      const phone = {phoneId, number, email, amount, operator}
      console.log(phone)
      await axios.post(ipURL+'/Phone-Internet/phone/update', phone)
      setOpenUpdate(openUpdate?false:true)
      loadPhones()

    }

    

    React.useEffect(()=>{
        loadPhones()
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
                <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Phone Bills /</span> list</h4>
            </div>
            <div className='col-1 pt-3'>
                <a href="/phone/add" className="btn btn-primary">add</a>
            </div>
        </div>
        <div className="card">
                <h5 className="card-header">Phone Bills</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Reference</th>
                        <th>Number</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Operator</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        {phones.map((phone)=>(
                      <tr>
                        <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>{phone.phoneId}</strong></td>
                        <td>{phone.reference}</td>
                        <td>{phone.number}</td>
                        <td>{phone.price} DH</td>
                        <td>
                        {phone.amount} min
                        </td>
                        <td>{phone.operator.name}</td>
                        <td>{phone.date}</td>
                        <td>
                          <div className="dropdown">
                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i className="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div className="dropdown-menu">
                              <button className="dropdown-item" data-bs-toggle="modal"
                              data-bs-target="#editModal" onClick={(e)=>editPhone(e)} value={phone.phoneId}
                                ><i className="bx bx-edit-alt me-1" ></i> Edit</button>
                              <button className="dropdown-item" data-bs-toggle="modal"
                              data-bs-target="#deleteModal" onClick={(e)=>deletePhone(e)} value={phone.phoneId}
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
                                    <label for="emailBasic" className="form-label">Amount</label>
                                    <input type="text" id="editAmount" className="form-control" placeholder="xxxx@xxx.xx" value={amount}  onChange={(e)=>setAmount(e.target.value)}/>
                                  </div>
                                  <div className="col mb-0">
                                    <label for="dobBasic" className="form-label">Operator</label>
                                    <select className="form-select" id="editOperator" name='operator' aria-label="Default select example" onChange={(e)=>setOperator(JSON.parse(e.target.value))}>
                                      {operators.map((operator) => (
                                      <option value={JSON.stringify(operator)}>{operator.name}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col mb-3">
                                    <label for="nameBasic" className="form-label">Email</label>
                                    <input type="text" id="editEmail" className="form-control" placeholder="Enter Name" value={email}  onChange={(e)=>setEmail(e.target.value)}/>
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

export default Phone