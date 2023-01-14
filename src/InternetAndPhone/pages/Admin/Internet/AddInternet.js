import React from 'react'
import axios from 'axios'
import Sidebar from '../../../components/Sidebar'
import Navbar from '../../../components/Navbar'

function AddInternet() {

  const [operators, setOperators] = React.useState([])

  const [email, setEmail] = React.useState('')
  const [number, setNumber] = React.useState('')
  const [operat, setOperator] = React.useState('')
  const [forfait, setForfait] = React.useState('')
  const [price, setPrice] = React.useState('')

  let [openAdd, setOpenAdd] = React.useState();

  const ipURL = process.env.REACT_APP_URL

  const loadOperators = async()=>{
    
    const all = await axios.get(ipURL+'/Phone-Internet/operator/all')
    setOperators(all.data)
    console.log(all.data)
  }

  const handleCreation = async(e) =>{
    e.preventDefault()
    const operator = JSON.parse(operat)
    const internet = {email, number, operator, forfait, price}
    console.log(internet)
    await axios.post(ipURL+'/Phone-Internet/internet/add',internet)

    setNumber("")
    setEmail("")
    setOperator("")
    setForfait("")
    setPrice("")

    setOpenAdd(openAdd?false:true)
    
    //alert('internet was create successfully')

  }

  React.useEffect(()=>{
      loadOperators()
  },[])


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
                      <h5 className="mb-0">Add Internet Bill</h5>

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
                            <label className="col-sm-2 col-form-label" htmlFor="basic-default-name">Amount</label>
                            <div className="input-group input-group-merge">
                              <span className="input-group-text">DH</span>
                              <input
                                type="text"
                                name='price'
                                value={price}
                                className="form-control"
                                placeholder="100"
                                aria-label="Amount (to the nearest dollar)"
                                onChange={(e)=>setPrice(e.target.value)}
                              />
                              <span className="input-group-text">.00</span>
                            </div>
                          </div>
                          <div className="col mb-3 col-6">
                            <label className="col-sm-2 col-form-label" htmlFor="basic-default-name">Forfait</label>
                            <div>
                            <select className="form-select" id="exampleFormControlSelect1" name='forfait' value={forfait} aria-label="Default select example" onChange={(e)=>setForfait(e.target.value)}>
                              <option selected>--Select Forfait</option>
                              <option value="*3">*3</option>
                              <option value="*6">*6</option>
                            </select>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" htmlFor="basic-default-message">Operator</label>
                          <div className="col-sm-10">
                          <div className="input-group input-group-merge">
                            <select className="form-select" id="exampleFormControlSelect1" name='operator' value={operat} aria-label="Default select example" onChange={(e)=>setOperator(e.target.value)}>
                                <option selected>--Select Operator</option>
                                {operators.map((operator, index) => (
                                <option value={JSON.stringify(operator)}>{operator.name}</option>
                                ))}
                              </select>
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

export default AddInternet