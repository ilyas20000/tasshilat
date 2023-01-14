/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/style-prop-object */
import * as React from 'react';
import Swal from 'sweetalert2';

import { Link } from 'react-router-dom';


import Navbar from '../Water/Navbar';


function Reference(props) {



  const ipURL = process.env.REACT_APP_URL;

  const [searchQuery, setSearchQuery] = React.useState('');
  const [data, setData] = React.useState([]);
  const [dataHelper, setDataHelper] = React.useState([]);

  const [bol, setBol] = React.useState('');

  const handleSearch = async (value) => {
    fetch(ipURL+`/water/facture/getFactureByClient/${searchQuery}`)
      .then(response => response.json())
      .then(result => {
        setData(result);
        localStorage.setItem('searchQuery', searchQuery);
      });


  };
 
 

  const handleEdit = item => {
    console.log()
    Swal.fire({
      title: `Edit ${item.reference}`,
      text: 'Are you sure you want to pay this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, pay it!'
    }).then(result => {
      if (result.value) {
        // Fetch the API to perform the edit action
        fetch(ipURL+`/water/facture/updateEtat/${item.id_bill}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // Update the data here
          })
        })
          .then()
          .then(data => {
            // Display a success message
            Swal.fire({
              title: 'Success!',
              text: 'The facture was payed successfully.',
              icon: 'success'
            });
            
           
            
          })
         
            const storedSearchQuery = localStorage.getItem('searchQuery');
            handleSearch(storedSearchQuery);
       
          
      }
    });
  };



  return (

    <>
      <div className="layout-page">
        <Navbar />
        <div class="content-wrapper">


          <div class="container-xxl flex-grow-1 container-p-y">
            <div class="row">

              <div class="col-xxl">
                <div class="card mb-4">
                  <div class="card-header d-flex align-items-center justify-content-between">
                    <h5 class="mb-0">Enter reference</h5>
                    <small class="text-muted float-end">Default label</small>
                  </div>
                  <div class="card-body">

                    <div class="row mb-3">
                      <label class="col-sm-2 col-form-label" for="basic-default-name">Reference</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="basic-default-name" placeholder="John Doe"
                          value={searchQuery}
                          onChange={(e) => { setSearchQuery(e.target.value) }}

                        />
                      </div>
                    </div>

                    <div class="row justify-content-end">
                      <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary" onClick={handleSearch}>Search</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="card">
                <h5 class="card-header">Factures</h5>
                <div class="table-responsive text-nowrap">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Reference</th>
                        <th>Mounth</th>
                        <th>Price</th>

                        <th>Year</th>
                        <th>Status</th>

                        <th></th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody class="table-border-bottom-0">

                      {data.map(item => (
                        <tr class="table-default" key={item.id_bill}>
                          <td><i class="fab fa-sketch fa-lg text-warning me-3"></i> <strong>{item.reference}</strong></td>
                          <td>{item.month}</td>

                          <td><span class="badge bg-label-primary ">$ {item.price} </span></td>
                          <td>
                            {item.year}
                          </td>
                          <td><span className={`badge ${item.etat == "payed" ? "bg-label-success " : "bg-label-warning"}  me-1`} >{item.etat}</span></td>

                          <td>
                            {

                              item.etat == "payed" ?

                                <button class="btn rounded-pill btn-icon btn-outline-success" disabled ><span class="tf-icons bx bx-check"></span> </button>

                                :
                                <button class="btn rounded-pill btn-outline-primary" onClick={() => handleEdit(item)}> Pay</button>

                            }


                          </td>
                          <td ><Link to={`/Recu/${item.id_bill}`} > <button type="button" class="btn btn-outline-danger"   >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-pdf" viewBox="0 0 16 16">
                              <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"></path>
                              <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"></path>
                            </svg>
                          </button></Link></td>
                        </tr>
                      ))}
                    </tbody>

                  </table>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div></>
  );
} export default Reference
