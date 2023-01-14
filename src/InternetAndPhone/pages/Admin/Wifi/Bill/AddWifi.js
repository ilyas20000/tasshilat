import React from 'react'
import axios from 'axios'
import Sidebar from '../../../../components/Sidebar'
import Navbar from '../../../../components/Navbar'

function AddWifi() {

    const [operators, setOperators] = React.useState([])
    const [clients, setClients] = React.useState([])

    const [clie, setClient] = React.useState('')
    const [month, setMonth] = React.useState('')
    const [operat, setOperator] = React.useState('')

    let [openAdd, setOpenAdd] = React.useState();

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const ipURL = process.env.REACT_APP_URL

    const loadOperators = async()=>{
    
        const all = await axios.get(ipURL+'/Phone-Internet/operator/all')
        setOperators(all.data)
        console.log(all.data)
      }

    const loadClients = async()=>{

        const all = await axios.get(ipURL+'/Phone-Internet/client/all')
        setClients(all.data)
        console.log(all.data)
    }

    const handleCreation = async(e) =>{
        e.preventDefault()
        const operator = JSON.parse(operat)
        const client = JSON.parse(clie)
        const wifi = {client ,operator, month}
        console.log(wifi)
        await axios.post(ipURL+'/Phone-Internet/wifi/add',wifi)
    

        setOperator("")
        setClient("")
        setMonth("")
    
        setOpenAdd(openAdd?false:true)
        
        //alert('internet was create successfully')
    
      }

      const toMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString('en-US', {
          month: 'long',
        });
      }

    React.useEffect(()=>{
        loadOperators()
        loadClients()
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
                <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Wifi Bills /</span> add</h4>
                <div className="col-xxl" style={{ width: '70%', margin: 'auto'}}>
                  <div className="card mb-4">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">Add Wifi Bill</h5>

                    </div>
                    <div className="card-body">
                      <form id='form_id'>
                        <div className="row mb-3">
                          <div className="col mb-3 col-6 border-end">
                            <label className="col-sm-2 col-form-label" htmlFor="basic-default-name">Month</label>
                            <div className="input-group input-group-merge">
                              <div className="input-group input-group-merge">
                            <select className="form-select" id="exampleFormControlSelect1" name='operator' value={month} aria-label="Default select example" onChange={(e)=>setMonth(e.target.value)}>
                                <option selected>--Select Month</option>
                                {months.map((month, index) => (
                                <option value={month}>{toMonthName(month)+" "+(new Date().getFullYear())}</option>
                                ))}
                              </select>
                            </div>
                            </div>
                          </div>
                          <div className="col mb-3 col-6">
                            <label className="col-sm-2 col-form-label" htmlFor="basic-default-name">Client</label>
                            <div>
                            <select className="form-select" id="exampleFormControlSelect1" name='operator' value={clie} aria-label="Default select example" onChange={(e)=>setClient(e.target.value)}>
                                <option selected>--Select Client</option>
                                {clients.map((client, index) => (
                                <option value={JSON.stringify(client)}>{client.lname+" "+client.fname}</option>
                                ))}
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

export default AddWifi