import React from 'react'
import axios from 'axios'
import emailjs from '@emailjs/browser'
import NavbarUser from '../../../components/NavbarUser'
import PdfInternet from '../../../components/PdfInternet'

function UserInternet() {

  const[internets, setInternets] = React.useState([])
  const [operators, setOperators] = React.useState([])

  const [internet, setInternet] = React.useState({
    operator: {name: ""}
  })

  const [email, setEmail] = React.useState('')
  const [number, setNumber] = React.useState('')
  const [operat, setOperator] = React.useState('')
  const [forfait, setForfait] = React.useState('')
  const [price, setPrice] = React.useState('')

  let [openAdd, setOpenAdd] = React.useState();
  let [pdf, setPDF] = React.useState();
  let [ability, setAbility] = React.useState();
  const ipURL = process.env.REACT_APP_URL
  const loadInternets = async()=>{
    const all = await axios.get(ipURL+'/Phone-Internet/internet/all')
    setInternets(all.data)
    console.log(all.data)
}

const loadOperators = async()=>{
  const all = await axios.get(ipURL+'/Phone-Internet/operator/all')
  setOperators(all.data)
  console.log(all.data)
  
}

const handleCreation = async(e) =>{
  e.preventDefault()
  const operator = JSON.parse(operat)
  const internet = {email, number, operator, forfait, price, user: JSON.parse(sessionStorage.getItem("user"))}
  console.log(internet)
  setInternet((await axios.post(ipURL+'/Phone-Internet/internet/add',internet)).data)

  
  emailjs.send("service_u16sz3s","template_oa5ayy",{
    type_subject: "Internet",
    type_text: "Internet",
    number: number,
    price: price,
    operator: operator.name,
    email: email,
    },"x-a75am7vos_rmljv");
  

  setOpenAdd(openAdd?false:true)
  setPDF(pdf?false:true)
  setAbility(ability?false:true)
  
  loadInternets();

  
  
  //alert('phone was create successfully')

}

const search = async(e)=>{
  /**const sid = e.target.value
  const some = await axios.get(ipURL+'/wifi/code/'+sid)
  setWifis(some.data)
  console.log(some.data)*/
}

const reset = async()=>{
  setNumber("")
  setEmail("")
  setOperator("")
  setForfait("")
  setPrice("")
  setPDF(pdf?false:true)
  setAbility(ability?false:true)
}

  React.useEffect(() => {
    loadInternets();
    loadOperators();

  }, [])

  return (
    <>
      <div className="layout-page">
        <NavbarUser/>
        <div className="content-wrapper pb-5">
          <div className="container-xxl flex-grow-1 container-p-y mb-5">
          <div className={`bs-toast toast toast-placement-ex m-2 bg-success top-0 end-0 fade ${openAdd?"show":"hide"}`} role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
        <div className="toast-header">
          <i className="bx bx-bell me-2"></i>
          <div className="me-auto fw-semibold">Item created</div>
          <small>now</small>
          <button type="button" className="btn-close" data-bs-dismiss="toast" onClick={(e)=>setOpenAdd(openAdd?false:true)} aria-label="Close"></button>
        </div>
        <div className="toast-body">This item was added successfully in the database.</div>
      </div>
          <div className="m-5 text-center"><h2>Internet</h2></div>
          <div className="card mb-4">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">Add Internet Bill</h5>

                    </div>
                    <div className="card-body">
                      <form>
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
                            <div className="col"  style={{ marginLeft: '80%'}}>
                              <button onClick={(e)=>handleCreation(e)} className="btn btn-primary">Send</button>
                              <button onClick={(e)=>reset()} type="reset" className={`btn btn-light ${ability?"":"disabled"}`} style={{ marginLeft: 10}} >Reset</button>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div style={{display: `${pdf?"block":"none"}`}}><PdfInternet internet={internet} type={"btn btn-danger"}/></div>
                    </div>
                  </div>
                  <div className="card">
                  <div className="row text-nowrap">
                <div className="col-9">
                  <h5 className="card-header">Internet Bills</h5>
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
                        <th>Reference</th>
                        <th>Number</th>
                        <th>Price</th>
                        <th>Forfait</th>
                        <th>Operator</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        {internets.map((internet) => (
                      <tr>
                        <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>{internet.internet_id}</strong></td>
                        <td>{internet.reference}</td>
                        <td>{internet.number}</td>
                        <td><span class="badge bg-label-primary ">{internet.price} DH</span></td>
                        <td>{internet.forfait}</td>
                        <td>{internet.operator.name}</td>
                        <td>{internet.date}</td>
                        <td>
                          <div className="dropdown">
                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i className="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div className="dropdown-menu">
                              
                                <PdfInternet internet={internet} type={"dropdown-item"}/>
                            </div>
                          </div>
                        </td>
                      </tr>
                        ))}
                    </tbody>
                  </table>


                </div>
              </div>

              
          </div>
        </div>
      </div>
      </>
  )
}

export default UserInternet