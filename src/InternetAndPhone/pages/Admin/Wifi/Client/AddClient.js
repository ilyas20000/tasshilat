import React from 'react'
import axios from 'axios'
import Sidebar from '../../../../components/Sidebar'
import Navbar from '../../../../components/Navbar'

function AddClient() {

  const [email, setEmail] = React.useState('')
  const [number, setNumber] = React.useState('')
  const [fname, setFName] = React.useState('')
  const [lname, setLName] = React.useState('')
  const [birthdate, setBirthDate] = React.useState('')
  const [cin, setCin] = React.useState('')
  
  const ipURL = process.env.REACT_APP_URL
  let [openAdd, setOpenAdd] = React.useState();

  const handleCreation = async(e) =>{
    e.preventDefault()
    const client = {email, number, fname, lname, birthdate, cin}
    console.log(client)
    await axios.post(ipURL+'/Phone-Internet/client/add',client)

    setNumber("")
    setEmail("")
    setFName("")
    setLName("")
    setBirthDate("")
    setCin("")

    setOpenAdd(openAdd?false:true)
    
    //alert('internet was create successfully')

  }

  return (
    <>
    <Sidebar/>
      <div className="layout-page">
        <Navbar/>
        <div className="content-wrapper">
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className={`bs-toast toast toast-placement-ex m-2 bg-success top-0 end-0 fade ${openAdd?"show":"hide"}`} role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
        <div className="toast-header">
          <i className="bx bx-bell me-2"></i>
          <div className="me-auto fw-semibold">Item created</div>
          <small>now</small>
          <button type="button" className="btn-close" data-bs-dismiss="toast" onClick={(e)=>setOpenAdd(openAdd?false:true)} aria-label="Close"></button>
        </div>
        <div className="toast-body">This item was added successfully in the database.</div>
      </div>
        <div className='row pb-0'>
            <div className='col-11'>
                <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Internet Bills /</span> add</h4>
                <div className="col-xxl" style={{ width: '70%', margin: 'auto'}}>
                  <div className="card mb-4">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">Add Client</h5>

                    </div>
                    <div className="card-body">
                      <form id='form_id'>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" htmlFor="basic-default-name">Number</label>
                          <div className="col-sm-10">
                            <input type="text" name='number' value={number} className="form-control" id="basic-default-name" placeholder="+212-.." onChange={(e)=>setNumber(e.target.value)}/>
                          </div>
                        </div>
  
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" htmlFor="basic-default-message">Email</label>
                          <div className="col-sm-10">
                          <div className="input-group input-group-merge">
                              <input type="text" id="basic-default-email" name='email' value={email} className="form-control" placeholder="email.doe" aria-label="john.doe" aria-describedby="basic-default-email2" onChange={(e)=>setEmail(e.target.value)}/>
                              <span className="input-group-text" id="basic-default-email2">@example.com</span>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col mb-3 col-6 border-end">
                            <label className="col-form-label" htmlFor="basic-default-name">First Name</label>
                            <div className="input-group input-group-merge">
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
                          </div>
                          <div className="col mb-3 col-6">
                            <label className="col-form-label" htmlFor="basic-default-name">Last Name</label>
                            <div>
                            <input
                                type="text"
                                name='lname'
                                value={lname}
                                className="form-control"
                                placeholder="last name"
                                aria-label="Amount (to the nearest dollar)"
                                onChange={(e)=>setLName(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col mb-3 col-6 border-end">
                            <label className="col-form-label" htmlFor="basic-default-name">Bithdate</label>
                            <div className="input-group input-group-merge">
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
                          </div>
                          <div className="col mb-3 col-6">
                          <label className="col-form-label" htmlFor="basic-default-message">CIN</label>
                          <div className="input-group input-group-merge">
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
                        </div>

                        <div className="row justify-content-end">
                          <div className="col-sm-10">
                            <button className="btn btn-primary" onClick={(e)=>handleCreation(e)}>Send</button>
                          </div>
                        </div>
                      </form>
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

export default AddClient