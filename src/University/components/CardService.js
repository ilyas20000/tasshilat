import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";

export default function CardService(props){
    const logoo = 'data:image/jpeg;base64,'+ props.university.logo
    
      const navigate = useNavigate();

    

      const handleOnClick = useCallback((e) => navigate(`/universityService-bills/${props.university.id}`, {replace: true}), [navigate]);
    
    

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
                <div class="dropdown float-end" >
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                      <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                    
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