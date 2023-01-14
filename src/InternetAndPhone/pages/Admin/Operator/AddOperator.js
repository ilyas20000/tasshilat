import React from 'react'
import Sidebar from '../../../components/Sidebar'
import Navbar from '../../../components/Navbar'

function AddOperator() {
  return (
    <>
    <Sidebar/>
      <div className="layout-page">
        <Navbar/>
        <div className="content-wrapper">
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Operators /</span> add</h4>


                <div className="col-xxl" style={{ width: '70%', margin: 'auto'}}>
                  <div className="card mb-4">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">Add Operator</h5>

                    </div>
                    <div className="card-body">
                      <form>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" for="basic-default-name">Name</label>
                          <div className="col-sm-10">
                            <input type="text" className="form-control" id="basic-default-name" placeholder="John Doe" />
                          </div>
                        </div>
  
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" for="basic-default-message">Image</label>
                          <div className="col-sm-10">
                            <input class="form-control" type="file" id="formFile" />
                          </div>
                        </div>
                        <div className="row justify-content-end">
                          <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">Send</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
       
    </div>
    </div>
    </div>
    </>
  )
}

export default AddOperator