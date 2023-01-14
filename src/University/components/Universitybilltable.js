import { useParams } from "react-router-dom";
import React from 'react';
import Swal from 'sweetalert2'

export default function Universitybilltable(){
 
  const { university_id } = useParams();
  const [universityBillId, setUniversityBillId] = React.useState('')
  const [universityBills, setUniversityBills] = React.useState([])

  const [client, setClient] = React.useState({})
  const [university, setUniversity] = React.useState({})
  const [price, setPrice] = React.useState('')
  const [reference, setReference] = React.useState('')
  const [id, setId]= React.useState('')
  const [status, setStatus]= React.useState('')

  

  const [allClients, setAllClients] = React.useState({})
  const [allClientsWithOutTheOne,SetAllClientsWithOutTheOne] = React.useState([])
  //const updateClick = useCallback((e) =>navigate(`/universityService/bill/update/`, {replace: true}), [navigate]);
 
  function popUp (university_bill_id) {Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteClickk(university_bill_id)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })}
  const ipURL = process.env.REACT_APP_URL

  function getClients(client){
    setClient(client)
    fetch(ipURL+"/Univ-service/api/client/allClients")
            .then(res => res.json())
            .then((result) => {
               setAllClients(result)
                SetAllClientsWithOutTheOne(result.filter(x => x.id != client.id));
            }
            )

  }
  const onSubmit =  (e)=>{
    e.preventDefault()
  
  const universityBill = { "id":id,
  "reference":reference,
  "price":price,
  "status":status,
  "university":{"id":university.id},
  "client":{"id":client.id} }

  console.log(universityBill)

  // console.log(`http://localhost:2222/Univ-service/api/universityBill/putUniversityBill/${universityBill.id}`)

  const putMethod = {
    method: 'PUT', // Method itself
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
    },
    body: JSON.stringify(universityBill) // We send data in JSON format
   }
   
   // make the HTTP put request using fetch api
   fetch(ipURL+"/Univ-service/api/universityBill/putUniversityBill/"+universityBill.id, putMethod)
   .then(response => response.json())
   .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
   .catch(err => console.log(err)) // Do something with the error

   

}
  function deleteClickk(university_bill_id) {
      //e.preventDefault()
      fetch(ipURL+'/Univ-service/api/universityBill/deleteUniversityBill/'+university_bill_id, {
          method: 'DELETE',
       
      }).then(res => {
          if(res.ok) {
              console.log(res);
          }
      });
      console.log(ipURL+"/Univ-service/api/universityBill/deleteUniversityBill/"+universityBillId)
    }

  React.useEffect(() => {

    // setClient(JSON.parse(localStorage.getItem('client')))
    // setUniversity(JSON.parse(localStorage.getItem('university')))
    // setId(localStorage.getItem('id'))
    // setPrice(localStorage.getItem('price'))
    // setReference(localStorage.getItem('reference'))

    fetch(ipURL+"/Univ-service/api/universityBill/universityBillsById/" + university_id)
        .then(res => res.json())
        .then((result) => {
            setUniversityBills(result);
        }
        )
   

}, [universityBills])

    return(
     
<>


              <h5 class="py-3 my-4">university bills</h5>

              <div class="row">
                <div class="col-xl-12">
                  <h6 class="text-muted">Basic</h6>
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
                          All
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
                          Payed
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
                          Not payed
                        </button>
                      </li>
                    </ul>
                    <div class="tab-content">
                      <div class="tab-pane fade show active" id="navs-pills-top-home" role="tabpanel">
                  
                        <h5 className="card-header">All university bills</h5>
                        <div className="table-responsive text-nowrap">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>University</th>
                                <th>Reference</th>
                                <th>Price</th>
                                <th>Client</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                            {universityBills.map(universityBill=>(
                                      <tr key={universityBill.id}>
                                        <td><i className="fab fa-react fa-lg text-info me-3"></i> <strong>{universityBill.university.nom}</strong></td>
                                        <td>{universityBill.reference}</td>
                                        <td>{universityBill.price}</td> 
                                        <td>{universityBill.client.nom}</td>
                                        
                                          {universityBill.status==1? <td><span className="badge bg-label-success me-1">Payed</span></td>:  <td><span class="badge bg-label-warning me-1">Not payed</span></td>}
                                    
                                        <td>
                                          <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                              <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                              <button className="dropdown-item" href=""
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalCenter" 
                                                
                                              onClick={(e)=>{ e.preventDefault(); 
                                                getClients(universityBill.client);
                                                setClient(universityBill.client)
                                                setReference(universityBill.reference)
                                                setId(universityBill.id)
                                                setPrice(universityBill.price)
                                                setStatus(universityBill.status)
                                                setUniversity(universityBill.university)
                                              //   localStorage.setItem('price',universityBill.price);
                                              //   localStorage.setItem('reference',universityBill.reference);
                                              //   localStorage.setItem('id',universityBill.id);
                                              //   localStorage.setItem('client',JSON.stringify(universityBill.client));
                                              //   localStorage.setItem('university',JSON.stringify(universityBill.university))
                                              }}
                                                ><i className="bx bx-edit-alt me-2"></i> Edit</button>
                                              <button className="dropdown-item" href="" onClick={(e)=>{e.preventDefault()  ;setUniversityBillId(universityBill.id); popUp(universityBill.id)}}
                                                ><i className="bx bx-trash me-2"></i> Delete</button>
                                            </div>
                                          </div>
                                        </td>
                                    </tr>
                            ))}
                          
                            
                            </tbody>
                          </table>
                        </div>
                     
                
                      </div>
                      <div class="tab-pane fade" id="navs-pills-top-profile" role="tabpanel">
                  
                        <h5 className="card-header">payed bills</h5>
                        <div className="table-responsive text-nowrap">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>University</th>
                                <th>Reference</th>
                                <th>Price</th>
                                <th>Client</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                            {universityBills.filter(x => x.status == 1).map(universityBill=>(
                                      <tr key={universityBill.id}>
                                        <td><i className="fab fa-react fa-lg text-info me-3"></i> <strong>{universityBill.university.nom}</strong></td>
                                        <td>{universityBill.reference}</td>
                                        <td>{universityBill.price}</td> 
                                        <td>{universityBill.client.nom}</td>
                                        
                                          {universityBill.status==1? <td><span className="badge bg-label-success me-1">Payed</span></td>:  <td><span class="badge bg-label-warning me-1">Not payed</span></td>}
                                    
                                        <td>
                                          <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                              <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                              <button className="dropdown-item" href=""
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalCenter" 
                                                
                                              onClick={(e)=>{ e.preventDefault(); 
                                                getClients(universityBill.client);
                                                setClient(universityBill.client)
                                                setReference(universityBill.reference)
                                                setId(universityBill.id)
                                                setPrice(universityBill.price)
                                                setUniversity(universityBill.university)
                                              //   localStorage.setItem('price',universityBill.price);
                                              //   localStorage.setItem('reference',universityBill.reference);
                                              //   localStorage.setItem('id',universityBill.id);
                                              //   localStorage.setItem('client',JSON.stringify(universityBill.client));
                                              //   localStorage.setItem('university',JSON.stringify(universityBill.university))
                                              }}
                                                ><i className="bx bx-edit-alt me-2"></i> Edit</button>
                                              <button className="dropdown-item" href="" onClick={(e)=>{e.preventDefault()  ;setUniversityBillId(universityBill.id); popUp(universityBill.id)}}
                                                ><i className="bx bx-trash me-2"></i> Delete</button>
                                            </div>
                                          </div>
                                        </td>
                                    </tr>
                            ))}
                          
                            
                            </tbody>
                          </table>
                        </div>
                      
                        
                      </div>
                      <div class="tab-pane fade" id="navs-pills-top-messages" role="tabpanel">
                   
                        <h5 className="card-header">payed bills</h5>
                        <div className="table-responsive text-nowrap">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>University</th>
                                <th>Reference</th>
                                <th>Price</th>
                                <th>Client</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                            {universityBills.filter(x => x.status == 0).map(universityBill=>(
                                      <tr key={universityBill.id}>
                                        <td><i className="fab fa-react fa-lg text-info me-3"></i> <strong>{universityBill.university.nom}</strong></td>
                                        <td>{universityBill.reference}</td>
                                        <td>{universityBill.price}</td> 
                                        <td>{universityBill.client.nom}</td>
                                        
                                          {universityBill.status==1? <td><span className="badge bg-label-success me-1">Payed</span></td>:  <td><span class="badge bg-label-warning me-1">Not payed</span></td>}
                                    
                                        <td>
                                          <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                              <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                              <button className="dropdown-item" href=""
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalCenter" 
                                                
                                              onClick={(e)=>{ e.preventDefault(); 
                                                getClients(universityBill.client);
                                                setClient(universityBill.client)
                                                setReference(universityBill.reference)
                                                setId(universityBill.id)
                                                setPrice(universityBill.price)
                                                setUniversity(universityBill.university)
                                              //   localStorage.setItem('price',universityBill.price);
                                              //   localStorage.setItem('reference',universityBill.reference);
                                              //   localStorage.setItem('id',universityBill.id);
                                              //   localStorage.setItem('client',JSON.stringify(universityBill.client));
                                              //   localStorage.setItem('university',JSON.stringify(universityBill.university))
                                              }}
                                                ><i className="bx bx-edit-alt me-2"></i> Edit</button>
                                              <button className="dropdown-item" href="" onClick={(e)=>{e.preventDefault()  ;setUniversityBillId(universityBill.id); popUp(universityBill.id)}}
                                                ><i className="bx bx-trash me-2"></i> Delete</button>
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

                
              </div>
              

              <div class="modal fade" id="modalCenter" tabindex="-1" aria-hidden="true" >
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="modalCenterTitle">Modal title</h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div class="row">
                            <label className="col-sm-2 form-label" for="basic-icon-default-message">Reference</label>

                              <div class="col mb-3">
                              <div className="input-group input-group-merge">
                              <span id="basic-icon-default-company2" className="input-group-text"
                                                            ><i class='bx bx-hash'></i>
                                                            </span>
                                                            <input
                                                                type={"text"}
                                                                id="basic-icon-default-company"
                                                                className="form-control"
                                                                name='reference'
                                                                placeholder=" # # # "
                                                                aria-label=" # # # "
                                                                value={reference}
                                                                disabled
                                                                aria-describedby="basic-icon-default-company2"
                                                                onChange={(e) => {  console.log(e.target.value);setReference(e.target.value) }}
                                                            />
                                </div>
                              </div>
                            </div>
                            <div class="row ">
                            <label className="col-sm-2 form-label" for="basic-icon-default-message">price</label>

                              <div class="col mb-3">
                              <div className="input-group input-group-merge">
                              <span id="basic-icon-default-company2" className="input-group-text"
                                                            ><i class='bx bxs-dollar-circle'></i>
                                                            </span>
                                                            <input
                                                                type={"number"}
                                                                id="basic-icon-default-company"
                                                                className="form-control"
                                                                name='price'
                                                                placeholder=" $ $ $ "
                                                                aria-label=" $ $ $ "
                                                                value={price}

                                                                aria-describedby="basic-icon-default-company2"
                                                                onChange={(e) => {  console.log(e.target.value);setPrice(e.target.value) }}
                                                            />
                              </div> 
                              </div>
                              
                            </div>
                            <div class="row ">
                            <label className="col-sm-2 form-label" for="basic-icon-default-message">Client</label>

                              <div class="col mb-3">
                              <div className="input-group input-group-merge">
                              <span id="basic-icon-default-company2" className="input-group-text"
                                                            ><i class='bx bxs-user-account' ></i>
                                                            </span>

                                                            <select id="defaultSelect" class="form-select"  onChange={(e) => setClient((allClients.filter(x => x.id == e.target.value)[0]))} >
                                                                <option key={client.id} value={client.id}> {client.prenom} {client.nom} | CIN : {client.cin}</option>
                                                                {allClientsWithOutTheOne.map(clientt => (
                                                                    <option onSelect={(e) => { console.log(clientt.id);  }} key={clientt.id} value={clientt.id}>Name : {clientt.prenom} {clientt.nom} | CIN : {clientt.cin}</option>
                                                                ))}
                                                            </select>
                              </div>
                              </div>
                              
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                              Close
                            </button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={(e)=>{onSubmit(e)}}>Save changes</button>
                          </div>
                        </div>
                      </div>
                </div>
</>
    )
}