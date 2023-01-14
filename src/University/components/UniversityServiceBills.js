import { useParams } from "react-router-dom";
import React from 'react';
import Swal from 'sweetalert2'
import PDF from "./PDF";
import emailjs from '@emailjs/browser';


export default function UniversityServiceBills(props){
 
 const {university_id}= useParams();

  const [universityBillId, setUniversityBillId] = React.useState('')
  const [universityBills, setUniversityBills] = React.useState([])
  const [universityBillsOdered, setUniversityBillsOrdered] = React.useState([])

  const [clients, setClients] = React.useState([])

  const [client, setClient] = React.useState({})
  const [university, setUniversity] = React.useState({})
  const [price, setPrice] = React.useState('')
  const [reference, setReference] = React.useState('')
  const [id, setId]= React.useState('')
  const ipURL = process.env.REACT_APP_URL
  
  function search(e){
    console.log(ipURL+"/Univ-service/api/universityBill/universityBillsContains/"+e.value) 
   if(e.value == ""){
    fetch(ipURL+"/Univ-service/api/universityBill/allUniversitiesBills")
    .then(res => res.json())
    .then((result) => {
        setUniversityBills(result.filter(x =>x.university.id==university_id && x.university != null && x.client != null));
    }
    )
   }else{
    fetch(ipURL+"/Univ-service/api/universityBill/universityBillsContains/"+e.value)
    .then(res => res.json())
    .then((result) => {
        setUniversityBills(result.filter(x =>x.university.id==university_id && x.university != null && x.client != null));
    }
    )
   }
  }

  function popUp (universityBill,left,reference) {Swal.fire({
    title: `You cannot pay this bill unless you've payed the previous ones ! this client had ${left} bills left to pay !`,
    text: ` you should pay first the bill with the reference : ${reference}  `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Search for it'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Ok ! Will help you finding it',
        'Your file has been found.',
        'success'
      )
      let searchInput = document.getElementById('searchByReference')
      searchInput.value = reference
      search(searchInput)
    }
  })}

  function pay(universitiesBill){
   
    fetch(ipURL+"/Univ-service/api/universityBill/universityBillByClientId/"+universitiesBill.client.id+"/orderBydate")
    .then(res => res.json())
    .then((result) => {
        setUniversityBillsOrdered(result.filter(x => x.university != null && x.client != null ));
        let unpayedBills = result.filter(x => x.university != null && x.client != null && x.status == 0);
        if(universitiesBill.id != unpayedBills[0].id ){
           
          popUp(universitiesBill,unpayedBills.length-1 ,unpayedBills[0].reference)
           
        }else{
          let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

          const putMethod = {
            method: 'PUT', // Method itself
            headers: {
             'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify({"id":universitiesBill.id,"status":1}) // We send data in JSON format
           }
           
           // make the HTTP put request using fetch api
           fetch(ipURL+"/Univ-service/api/universityBill/putUniversityBill/"+universitiesBill.id, putMethod)
           .then((response) =>{
            response.json()
            let searchInput = document.getElementById('searchByReference')
            searchInput.value =""
            //pop up succes
            Swal.fire({
             position: 'top-end',
             icon: 'success',
             title: 'This bill has been payed',
             showConfirmButton: false,
             timer: 1500
           })

          //send email with popup in success
          emailjs.send("gmail","template_kof4y6o",{
            reference: universitiesBill.reference,
            date: universitiesBill.date,
            status:response.status ? "PAYED":"UNPAYED",
            price: universitiesBill.price,
            to_email: universitiesBill.client.email,
            reply_to: "mouhibmoughtanim47@gmail.com",
            },"D4HbLUl8RlGsLOljF")
            .then((result) => {
                console.log(result.text);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `An email was sent to Mr.${universitiesBill.client.nom} <br/> To email: ${universitiesBill.client.email} <br/> containing the bills`,
                    showConfirmButton: false,
                    timer: 4000, width:"700px"
                  })
            }, (error) => {
                console.log(error.text);
            });
          
           search(searchInput)
           } )
           .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
           .catch(err => console.log(err)) // Do something with the error
           
         

        }

   
    }
    )
    
   
  }
 
  function searchByClient(id){
   
    if(id == "all"){
        fetch(ipURL+"/Univ-service/api/universityBill/allUniversitiesBills")
        .then(res => res.json())
        .then((result) => {
            setUniversityBills(result.filter(x =>x.university.id==university_id && x.university != null && x.client != null));
        }
        )
    }else{
        fetch(ipURL+"/Univ-service/api/universityBill/universityBillByClientId/"+id)
            .then(res => res.json())
            .then((result) => {
            setUniversityBills(result.filter(x =>x.university.id==university_id && x.university != null && x.client != null));
            }
    )
    }
  }
  
  React.useEffect(() => {

    // setClient(JSON.parse(localStorage.getItem('client')))
    // setUniversity(JSON.parse(localStorage.getItem('university')))
    // setId(localStorage.getItem('id'))
    // setPrice(localStorage.getItem('price'))
   
    fetch(ipURL+"/Univ-service/api/universityBill/universityBillsById/" + university_id)        .then(res => res.json())
        .then((result) => {
            setUniversityBills(result.filter(x => x.university != null && x.client != null));
        }
        )
        fetch(ipURL+"/Univ-service/api/client/allClients")
        .then(res => res.json())
        .then((result) => {
            setClients(result);
        }
        )

}, [])
    return(
      <>
     
                   <h5 class="py-3 my-4">Universities bills</h5>
     
                  <div class="row">
                   
                  <div class=" col-3 m-auto" >
                               
                                <select class="form-select" id="inputGroupSelect02" onChange={(e)=>searchByClient(e.target.value)}>
                                    <option selected="" value={"all"}>Search By Client...</option>
                                    {
                                        clients.map(client=><option value={client.id}>{client.nom} {client.prenom}</option>)
                                    }
                                </select>
                  </div>

                  
                  
                  </div>
                   <div class="row">
                     <div class="col-xl-12">
                       {/* <h6 class="text-muted">Basic</h6> */}
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
                               Unpayed
                             </button>
                           </li>
                         </ul>
                         
                         <div class="tab-content">
                        
                           <div class="tab-pane fade show active" id="navs-pills-top-home" role="tabpanel">
                            
                           <div className="row text-nowrap">
                               
                                <div className="col-9">
                                <h5 className="card-header">Universities bills</h5>
                                </div>
                                
                                <div className="col-3 pe-5">
                                <input
                                id="searchByReference"
                                    type="text"
                                    name='fname'
                                    className="form-control m-3"
                                    placeholder="Search by reference (#...)"
                                    onChange={(e)=>search(e.target)}
                                    />
                                </div>
                            </div>

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
                                             <td><span class="badge bg-label-primary ">$ {universityBill.price}</span></td> 
                                             <td>{universityBill.client.nom}</td>
                                             
                                               {universityBill.status==1? <><td><span className="badge bg-label-success me-1">Payed</span></td>
                                               <td><button type="button" class="btn rounded-pill btn-icon btn-outline-success" disabled>
                                                    <span class="tf-icons bx bx-check"></span>
                                                </button></td> </> :
                                                <><td><span class="badge bg-label-warning me-1">Not payed</span>
                                                </td>
                                                 <td><button type="button" class="btn rounded-pill btn-outline-primary" value={universityBill.client.id} onClick={(e)=>{e.preventDefault();pay(universityBill)}}>Pay</button></td></> }
                                                <td><PDF universityBill={universityBill}/></td>                        
                                         </tr>
                                 ))}
                               
                                 
                                 </tbody>
                               </table>
                             </div>
                          
                     
                           </div>
                           <div class="tab-pane fade" id="navs-pills-top-profile" role="tabpanel">
                       
                           <div className="row text-nowrap">
                                <div className="col-9">
                                <h5 className="card-header">Payed Universities bills</h5>
                                </div>
                                <div className="col-3 pe-5">
                                <input
                                    type="text"
                                    name='fname'
                                    className="form-control m-3"
                                    placeholder="Search by reference (#...)"
                                    onChange={(e)=>search(e)}
                                    />
                                </div>
                            </div>

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
                                         
                                               <td><button type="button" class="btn rounded-pill btn-icon btn-outline-success" disabled>
                                                    <span class="tf-icons bx bx-check"></span>
                                                </button></td> 
                                         </tr>
                                 ))}
                               
                                 
                                 </tbody>
                               </table>
                             </div>
                           
                             
                           </div>
                           <div class="tab-pane fade" id="navs-pills-top-messages" role="tabpanel">
                           <div className="row text-nowrap">
                                <div className="col-9">
                                <h5 className="card-header">Unpayed Universities bills</h5>
                                </div>
                                <div className="col-3 pe-5">
                                <input
                                    type="text"
                                    name='fname'
                                    className="form-control m-3"
                                    placeholder="Search by reference (#...)"
                                    onChange={(e)=>search(e)}
                                    />
                                </div>
                            </div>
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
                                             <button type="button" class="btn rounded-pill btn-outline-primary" onClick={(e)=>{e.preventDefault();pay(universityBill)}}>Pay</button>
                                            
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
                   
     
                 
   

       
      </>
      
    )
}