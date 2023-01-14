import React from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import Operator from './Operator/Operator'
import ApexCharts from 'apexcharts'
import UniversityChartCourbe from '../../../University/components/UniversityChartCourbe'
import UniversityChartAll from '../../../University/components/UniversityChartAll'
import UniversityChartBar from '../../../University/components/UniversityChartBar'
import ChartHouse from '../../../University/components/ChartHouse'

function Dashboard() {

  const [phones, setPhones] = React.useState("")
  const [orangeTotal, setOrangeTotal] = React.useState("")
  const [inwiTotal, setInwiTotal] = React.useState("")

  const [temp, setTemp] = React.useState([])
  const ipURL = process.env.REACT_APP_URL
  
  const [operators, setOperators] = React.useState([])
  const [names, setNames] = React.useState([])
  const [amounts, setAmount] = React.useState([])

  const loadOperators = async()=>{
    const all = await axios.get(ipURL+'/Phone-Internet/operator/all')
    setOperators(all.data)
    console.log(all.data)
    
  }

  const orange = {
    operatorId: "1",
    name: "orange",
    image: "orange.jpg"
  }

  const inwi = {
    operatorId: "2",
    name: "inwi",
    image: "inwi2.jpg"
  }


  const getPhonesCount = async() => {
    return await axios.get(ipURL+'/Phone-Internet/bills')
  }

  const getTotal = async(operator) => {
    return await axios.post(ipURL+'/Phone-Internet/total', operator)
  }

  React.useEffect(() => {

    loadOperators()
    getPhonesCount().then((res)=>{
      setPhones(res.data)
    })
    getTotal(orange).then((res) =>{
      setOrangeTotal(res.data)
    })
    getTotal(inwi).then((res) =>{
      setInwiTotal(res.data)
    })

    

  }, [])


  




  return (
    <>
    <Sidebar/>
      <div className="layout-page">
        <Navbar/>
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
            <div className='col-11'>
                <h4 className="fw-bold py-3 mb-4">Dashboard /</h4>
            </div>
              <div className="row">
                <div className="col-lg-8 mb-4 order-0">
                  <div className="card">
                    <div className="d-flex align-items-end row">
                      <div className="col-sm-7">
                        <div className="card-body">
                          <h5 className="card-title text-primary">{"Nice to see you again "+JSON.parse(sessionStorage.getItem("user")).prenom}</h5>
                          <p className="mb-4">
                            You have done <span className="fw-bold">72%</span> more sales today. Check your new badge in
                            your profile.
                          </p>

                          <a href="javascript:;" className="btn btn-sm btn-outline-primary">View Badges</a>
                        </div>
                      </div>
                      <div className="col-sm-5 text-center text-sm-left">
                        <div className="card-body pb-0 px-0 px-md-4">
                          <img
                            src="../assets/img/illustrations/man-with-laptop-light.png"
                            height="140"
                            alt="View Badge User"
                            data-app-dark-img="illustrations/man-with-laptop-dark.png"
                            data-app-light-img="illustrations/man-with-laptop-light.png"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 order-1">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                            <div class="avatar flex-shrink-0 me-3"><span class="avatar-initial rounded bg-label-danger"><i class="bx bxs-school"></i></span></div>
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt3"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                                <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                              </div>
                            </div>
                          </div>
                          <span className="fw-semibold d-block mb-1">University</span>
                          <h3 className="card-title mb-2">12,628 DH</h3>
                          <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +72.80%</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                            <div class="avatar flex-shrink-0 me-3"><span class="avatar-initial rounded bg-label-warning"><i class="bx bx-bulb"></i></span></div>
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt6"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                                <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                              </div>
                            </div>
                          </div>
                          <span>Water & Electricity</span>
                          <h3 className="card-title text-nowrap mb-1">4,679 DH</h3>
                          <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +28.42%</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
      
                <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                  <div className="card">
                    <div className="row row-bordered g-0">
                      <div className="col-md-12">
                        <h5 className="card-header m-0 me-2 pb-3">House Insurance Chart</h5>
                        <div id="totalRevenueChart" className="px-2">
                             <ChartHouse/>
                         </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              
                <div className="col-12 col-md-8 col-lg-4 order-3 order-md-2">
                  <div className="row">
                    <div className="col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                            <div class="avatar flex-shrink-0 me-3"><span class="avatar-initial rounded bg-label-success"><i class="bx bx-shield"></i></span></div>
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt4"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt4">
                                <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                              </div>
                            </div>
                          </div>
                          <span className="d-block mb-1">Insurance</span>
                          <h3 className="card-title text-nowrap mb-2">2,456 DH</h3>
                          <small className="text-danger fw-semibold"><i className="bx bx-down-arrow-alt"></i> -14.82%</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                            <div class="avatar flex-shrink-0 me-3"><span class="avatar-initial rounded bg-label-primary"><i class="bx bx-mobile-alt"></i></span></div>
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt1"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded"></i>
                              </button>
                              <div className="dropdown-menu" aria-labelledby="cardOpt1">
                                <a className="dropdown-item" href="javascript:void(0);">View More</a>
                                <a className="dropdown-item" href="javascript:void(0);">Delete</a>
                              </div>
                            </div>
                          </div>
                          <span className="fw-semibold d-block mb-1">Phone & Internet</span>
                          <h3 className="card-title mb-2">14,857 DH</h3>
                          <small className="text-success fw-semibold"><i className="bx bx-up-arrow-alt"></i> +28.14%</small>
                        </div>
                      </div>
                    </div>
                     </div>
                </div>
              </div>
              <div className="row">
       
                <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-4">
                  <div className="card h-100">
                    <div className="card-header d-flex align-items-center justify-content-between pb-0">
                      <div className="card-title mb-0">
                        <h5 className="m-0 me-2">Services</h5>
                        <small className="text-muted">42.82k Total Sales</small>
                      </div>
                      <div className="dropdown">
                        <button
                          className="btn p-0"
                          type="button"
                          id="orederStatistics"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="orederStatistics">
                          <a className="dropdown-item" href="javascript:void(0);">Select All</a>
                          <a className="dropdown-item" href="javascript:void(0);">Refresh</a>
                          <a className="dropdown-item" href="javascript:void(0);">Share</a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex flex-column align-items-center gap-1">
                          <h2 className="mb-2">8,258</h2>
                          <span>Total Orders</span>
                        </div>
                        <div id="orderStatisticsChart"></div>
                      </div>
                      <ul className="p-0 m-0">
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-primary"
                              ><i className="bx bx-mobile-alt"></i
                            ></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">Phone & Internet</h6>
                              <small className="text-muted">Phone minutes, Internet, Wifi</small>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">{phones}</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-success"><i className="bx bx-building"></i></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">University</h6>
                              <small className="text-muted">University fees</small>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">23.8k</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-info"><i className="bx bx-shield"></i></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">Insurance</h6>
                              <small className="text-muted">Car, House</small>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">849k</small>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex">
                          <div className="avatar flex-shrink-0 me-3">
                            <span className="avatar-initial rounded bg-label-secondary"
                              ><i className="bx bx-bulb"></i></span>
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <h6 className="mb-0">Water & Electricity</h6>
                              <small className="text-muted">Water bill, Electricity bill</small>
                            </div>
                            <div className="user-progress">
                              <small className="fw-semibold">99</small>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
    
                <div className="col-md-6 col-lg-4 order-1 mb-4">
                  <div className="card h-100">
                    <div className="card-header">
                    <div class="nav-align-top mb-4">
                         <ul class="nav nav-pills mb-3" role="tablist">
                           <li class="nav-item">
                             <button
                               type="button"
                               class="nav-link active"
                               role="tab"
                               data-bs-toggle="tab"
                               data-bs-target="#navs-pills-top-home"
                               aria-controls="navs-pills-top-home"
                               aria-selected="true"
                             >
                               Number of bills payed/unpayed by mounth 
                             </button>
                           </li>
                           <li class="nav-item">
                             <button
                               type="button"
                               class="nav-link"
                               role="tab"
                               data-bs-toggle="tab"
                               data-bs-target="#navs-pills-top-profile"
                               aria-controls="navs-pills-top-profile"
                               aria-selected="false"
                             >
                               Total of payment
                             </button>
                           </li>
                           <li class="nav-item">
                             <button
                               type="button"
                               class="nav-link"
                               role="tab"
                               data-bs-toggle="tab"
                               data-bs-target="#navs-pills-top-messages"
                               aria-controls="navs-pills-top-messages"
                               aria-selected="false"
                             >
                               Evolution of payment By mounth 
                             </button>
                           </li>
                         </ul>
                         
                         <div class="tab-content">
                        
                           <div class="tab-pane fade show active" id="navs-pills-top-home" role="tabpanel">
                            
                           <UniversityChartCourbe/>
                           
                     
                           </div>
                           <div class="tab-pane fade" id="navs-pills-top-profile" role="tabpanel">
                       
                           
                           <UniversityChartAll/>
                             
                           </div>
                           <div class="tab-pane fade" id="navs-pills-top-messages" role="tabpanel">
                           
                          <UniversityChartBar/>
                           </div>

                         </div>
                       </div>
                    </div>
                    
                  </div>
                </div>
   
                <div className="col-md-6 col-lg-4 order-2 mb-4">
                  <div className="card h-100">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title m-0 me-2">Partners</h5>
                      <div className="dropdown">
                        <button
                          className="btn p-0"
                          type="button"
                          id="transactionID"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="transactionID">
                          <a className="dropdown-item" href="javascript:void(0);">Last 28 Days</a>
                          <a className="dropdown-item" href="javascript:void(0);">Last Month</a>
                          <a className="dropdown-item" href="javascript:void(0);">Last Year</a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <ul className="p-0 m-0">
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <img src="../assets/img/operators/orange.png" alt="User" className="rounded" />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <small className="text-muted d-block mb-1">Phone & Internet</small>
                              <h6 className="mb-0">Orange</h6>
                            </div>
                            <div className="user-progress d-flex align-items-center gap-1">
                              <h6 className="mb-0">+{orangeTotal}</h6>
                              <span className="text-muted"> DH</span>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <img src="../assets/img/operators/inwi2.jpg" alt="User" className="rounded" />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <small className="text-muted d-block mb-1">Phone & Internet</small>
                              <h6 className="mb-0">Inwi</h6>
                            </div>
                            <div className="user-progress d-flex align-items-center gap-1">
                              <h6 className="mb-0">+{inwiTotal}</h6>
                              <span className="text-muted"> DH</span>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <img src="../assets/img/MIT.png" alt="User" className="rounded" />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <small className="text-muted d-block mb-1">University</small>
                              <h6 className="mb-0">MIT</h6>
                            </div>
                            <div className="user-progress d-flex align-items-center gap-1">
                              <h6 className="mb-0">+637.91</h6>
                              <span className="text-muted"> DH</span>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <img src="../assets/img/harvard.png" alt="User" className="rounded" />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <small className="text-muted d-block mb-1">University</small>
                              <h6 className="mb-0">Harvard</h6>
                            </div>
                            <div className="user-progress d-flex align-items-center gap-1">
                              <h6 className="mb-0">+838.71</h6>
                              <span className="text-muted"> DH</span>
                            </div>
                          </div>
                        </li>
                        <li className="d-flex mb-4 pb-1">
                          <div className="avatar flex-shrink-0 me-3">
                            <img src="../assets/img/axa.png" alt="User" className="rounded" />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <small className="text-muted d-block mb-1">Insurance</small>
                              <h6 className="mb-0">AXA</h6>
                            </div>
                            <div className="user-progress d-flex align-items-center gap-1">
                              <h6 className="mb-0">+203.33</h6>
                              <span className="text-muted"> DH</span>
                            </div>
                          </div>
                        </li>
                        
                        <li className="d-flex">
                          <div className="avatar flex-shrink-0 me-3">
                            <img src="https://www.challenge.ma/wp-content/uploads/2014/07/Lydec.gif" alt="User" className="rounded" />
                          </div>
                          <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div className="me-2">
                              <small className="text-muted d-block mb-1">Water & Electricity</small>
                              <h6 className="mb-0">Lydec</h6>
                            </div>
                            <div className="user-progress d-flex align-items-center gap-1">
                              <h6 className="mb-0">+92.45</h6>
                              <span className="text-muted"> DH</span>
                            </div>
                          </div>
                        </li>
                        
                      </ul>
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

export default Dashboard