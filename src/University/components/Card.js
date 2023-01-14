import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";

export default function Card(props){
    const logoo = 'data:image/jpeg;base64,'+ props.university.logo
    
      const navigate = useNavigate();
      const ipURL = process.env.REACT_APP_URL
      function popUp () {Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteClick()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })}
      
      const [nom,setNom] = useState('')
      const [description,setDescription] = useState('')
      const [logo,setLogo]=useState()
      const handleOnClick = useCallback((e) => navigate(`/admin/university/${props.university.id}/bills`, {replace: true}), [navigate]);
      const deleteClick =  (e)=>{
        //e.preventDefault()
        fetch(ipURL+'/Univ-service/api/university/deleteUniversity/'+props.university.id, {
            method: 'DELETE',
         
        }).then(res => {
            if(res.ok) {
                console.log(res);
            }
        });
      }
      const onSubmit =  (e)=>{
        e.preventDefault()
       
        console.log(localStorage.getItem('UniversityId'))
        console.log(localStorage.getItem('nom'))
      
        
       const formData = new FormData();
        formData.append('logo', logo);
        formData.append('nom', localStorage.getItem('nom'));
        formData.append('id', localStorage.getItem('UniversityId'));
        formData.append('description', localStorage.getItem('description'));
       
      
        fetch(ipURL+'/Univ-service/api/university/putUniversity/'+localStorage.getItem('UniversityId'), {
            method: 'put',
            body: formData
        }).then(res => {
            if(res.ok) {
                console.log(res);
                alert("File uploaded successfully.")
            }
        });
      
    }
      React.useEffect(() =>{
        setNom(localStorage.getItem('nom'))
        setDescription(localStorage.getItem('description'))
        
      },[])

    return(
      <>
      <div class="col" >
            <div class="card h-100">
              <img class="card-img-top" src={logoo} alt="Card image cap" height={'250px'} />
              <div class="card-body">
                <h5 class="card-title">{props.university.nom}</h5>
                <p class="card-text">
                {props.university.description}
                </p>
                <a class="btn btn-outline-primary" href="" onClick={(e)=>{ e.preventDefault(); handleOnClick()}}
                        ><i class='bx bx-food-menu'></i>  Bills</a
                      >
                <div class="dropdown float-end">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                      <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                  
                      {/* <a class="dropdown-item" href="" onClick={(e)=>{ e.preventDefault(); 
                      localStorage.setItem('nom',props.university.nom);
                      localStorage.setItem('description',props.university.description);
                      localStorage.setItem('props.university.id',props.university.id);
                     
                      updateClick()}}>
                        
                       
                        <i class="bx bx-edit-alt me-1"></i> Edit</a> */}
            
                     <a class="dropdown-item" href="" type="button"   
                      data-bs-toggle="modal"
                      data-bs-target="#modalCenter" 
                      onClick={(e)=>{e.preventDefault(); localStorage.setItem('nom',props.university.nom);
                      localStorage.setItem('description',props.university.description);
                      localStorage.setItem('UniversityId',props.university.id);}}>
                        
                       
                        <i class="bx bx-edit-alt me-1"></i> Edit</a>
                      <button class="dropdown-item" href="" onClick={(e)=>{ e.preventDefault(); popUp()}}
                        ><i class="bx bx-trash me-1"></i> Delete</button>
                      <a class="dropdown-item" href="" onClick={(e)=>{ e.preventDefault(); handleOnClick()}}
                        ><i class='bx bx-food-menu'></i>  Bills</a
                      >
                      <button class="dropdown-item"
                       data-bs-toggle="modal"
                       data-bs-target="#youTubeModal"
                       data-theVideo={props.university.video}
                      href="" onClick={(e)=>{ }}
                        ><i class='bx bxs-slideshow'></i> Learn More</button>
                       <a class="dropdown-item" href={props.university.site} onClick={(e)=>{ }}
                        ><i class='bx bx-right-arrow-alt'></i> Contact  </a>
                    
                      
                    </div>
                  </div>
              </div>
            </div>
          </div>

          {/*  update Modal */}
          <div class="modal fade" id="modalCenter" tabindex="-1" aria-hidden="true" key={props.university.id}>
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
                                <label className="col-sm-2 form-label" for="basic-icon-default-message">Name</label>

                                  <div class="col mb-3">
                                  <div className="input-group input-group-merge">
                                      <span id="basic-icon-default-company2" className="input-group-text"
                                        ><i className="bx bx-buildings"></i
                                      ></span>
                                      <input
                                        type={"text"}
                                        id="basic-icon-default-company"
                                        className="form-control"
                                        name='nom'
                                        value={localStorage.getItem('nom')}
                                        onChange={(e)=>{localStorage.setItem('nom',e.target.value);console.log(e.target.value)}}
                                        placeholder="ACME Inc."
                                        aria-label="ACME Inc."
                                        aria-describedby="basic-icon-default-company2"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div class="row ">
                                <label className="col-sm-2 form-label" for="basic-icon-default-message">Description</label>

                                  <div class="col mb-3">
                                  <div className="input-group input-group-merge">
                                    <span id="basic-icon-default-message2" className="input-group-text"
                                      ><i className="bx bx-comment"></i
                                    ></span>
                                    <textarea
                                      id="basic-icon-default-message"
                                      className="form-control"
                                      value={localStorage.getItem('description')}
                                      onChange={(e)=>{localStorage.setItem('description',e.target.value);console.log(e.target.value)}}

                                      aria-describedby="basic-icon-default-message2"
                                      name='description'
                                    ></textarea>
                                  </div> 
                                  </div>
                                  
                                </div>
                                <div class="row ">
                                <label className="col-sm-2 form-label" for="basic-icon-default-message">Logo</label>

                                  <div class="col mb-3">
                                  <div className="input-group input-group-merge">
                                      <input class="form-control" type={"file"} id="formFile" onChange={(e)=>setLogo(e.target.files[0])}  name='logo' />
                                  </div>
                                  </div>
                                  
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                  Close
                                </button>
                                <button type="button"  data-bs-dismiss="modal" class="btn btn-primary" onClick={(e)=>{onSubmit(e)}}>Save changes</button>
                              </div>
                            </div>
                          </div>
           </div>
          {/*  youtube Modal */}
               
          <div class="modal fade" id="youTubeModal" tabindex="-1" aria-hidden="true" >
                                                    <div class="modal-dialog" role="document">
                                                      <div class="modal-content">
                                                        <iframe height="350" title={props.university.id+"title"} src={props.university.video}></iframe>
                                                      </div>
                                                    </div>
         </div>
       
          
                                                 
       
     </>
           
    )
}