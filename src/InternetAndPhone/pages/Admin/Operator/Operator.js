import React from 'react'
import axios from 'axios'
import Sidebar from '../../../components/Sidebar'
import Navbar from '../../../components/Navbar'

function Operator() {

    const [operators, setOperators] = React.useState([])
    const ipURL = process.env.REACT_APP_URL
    const loadOperators = async()=>{
        const all = await axios.get(ipURL+'/Phone-Internet/operator/all')
        setOperators(all.data)
        console.log(all.data)
    }

    const deleteOperator = async(e) => {
        console.log(e.target.value)
        const id = e.target.value
        document.getElementById('deleteId').value = id
  
      }

    const confirmDeleteInternet = async(e) => {
        console.log(e.target.value)
        const id = e.target.value
        await axios.delete(ipURL+'/Phone-Internet/operator/delete?id='+id)
        loadOperators()

    }
  
      const editOperator = async(e) => {
        console.log(e.target.value)
  
  
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
        <div className='row pb-0'>
            <div className='col-11'>
                <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Operators /</span> list</h4>
            </div>
            <div className='col-1 pt-3'>
                <a href="/operator/add" className="btn btn-primary">add</a>
            </div>
        </div>
        <div className='row'>
            {operators.map((operator)=>(
            <div className="col-md-6 col-lg-4 mb-3" key={operator.operatorId}>
                <div className="card h-100">
                <div className='img-fluid' style={{"height": "200px","maxHeight": "200px", "background-size":"auto 100%","background-position":"50%", "background-repeat":"no-repeat","background-image": 'url(../assets/img/operators/'+operator.image+')', }}></div>
                    <div className="card-body">
                        <h5 className="card-title">{operator.name}</h5>
                        <p className="card-text">
                        The operator {operator.name}.
                        </p>
                        <button value={operator.operatorId} data-bs-toggle="modal"
                              data-bs-target="#editModal" onClick={(e)=>editOperator(e)} className="btn btn-outline-info">edit</button>
                        <button value={operator.operatorId} data-bs-toggle="modal"
                              data-bs-target="#deleteModal" onClick={(e)=>deleteOperator(e)} className="btn btn-outline-danger" style={{ marginLeft: 10 }}>delete</button>
                    </div>
                </div>
            </div>
            ))}
        </div>

        <div className="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel1">Edit Operator </h5>
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
                                    <label for="nameBasic" className="form-label">Name</label>
                                    <input type="text" id="editNumber" className="form-control" placeholder="Enter Name" />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col mb-3">
                                    <label for="nameBasic" className="form-label">Image</label>
                                    <input type="file" id="editEmail" className="form-control" placeholder="Enter Name" />
                                  </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                                  Close
                                </button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel1">Delete Operator </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">Are you sure you want to delete this operator.</div>
                              <div className="modal-footer">
                              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                                  Close
                                </button>
                                <button
                                  className="btn btn-primary"
                                  id='deleteId'
                                  onClick={(e)=>confirmDeleteInternet(e)}
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
    </>
  )
}

export default Operator