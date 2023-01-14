/* eslint-disable jsx-a11y/anchor-is-valid */

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../InternetAndPhone/components/Navbar';
import Sidebar from './Sidebar';

export default function Factures() {
  const { id } = useParams();
  const pathVariable = id
  const [items, setItems] = useState([]);

  const [data, setData] = useState([]);
  const ipURL=process.env.REACT_APP_URL;


  useEffect(() => {
    fetch(ipURL+`/water/fournisseur/getF/${pathVariable}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json()
      )
      .then(data => setData(data));
  }, []);

  console.log(`My object: ${JSON.stringify(data, null, 2)}`);

  useEffect(() => {
    fetch(ipURL+`/water/facture/getFactureByFournisseur/${pathVariable}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json()
      )
      .then(data => setItems(data));
  }, []);
  console.log(`My object: ${JSON.stringify(data, null, 2)}`);
  const [reference, setReference] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [price, setPrice] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');



  const handleReferenceChange = (event) => {
    setReference(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleTelephoneChange = (event) => {
    setNumber(event.target.value);
  };
  const handlePrixChange = (event) => {
    setPrice(event.target.value);
  };
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };


  const deletedata = (id) => {

    axios.delete(ipURL+`/water/facture/delete/${id}`)
      .then(res => {
        // update your component's state or perform some other action
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
      });
  }



  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the form data to your API here
    fetch(ipURL+`/water/facture/add`, {
      method: 'POST',
      body: JSON.stringify({ reference, price, date, number, email, "fournisseur": data, month, year }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        // update your component's state or perform some other action
       window.location.reload();
  })
      .then((data) => {
        // Do something with the response data
        

      });
  };

  return (

    <>
       

     <div class="layout-wrapper layout-content-navbar  ">
     <div class="layout-container">
            <Sidebar />
            <div class="layout-page">
    <Navbar />
      <div class="container-xxl flex-grow-1 container-p-y  ">
        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Basic with Icons</h5>
            <small class="text-muted float-end">Merged input group</small>
          </div>
          <div class="card-body">
            <form onSubmit={handleSubmit}>

              <div class="mb-3">
                <label class="form-label" for="basic-icon-default-company">Reference</label>
                <div class="input-group input-group-merge">
                  <input
                    type="text"
                    id="name"
                    class="form-control"
                    aria-describedby="basic-icon-default-company2"

                    value={reference} onChange={handleReferenceChange} />
                </div>
                <label class="form-label" for="basic-icon-default-company">Date</label>
                <div class="input-group input-group-merge">
                  <input
                    type="date"
                    id="name"
                    class="form-control"
                    aria-describedby="basic-icon-default-company2"
                    value={date} onChange={handleDateChange} />
                </div>
                <label class="form-label" for="basic-icon-default-company">email</label>
                <div class="input-group input-group-merge">
                  <input
                    type="email"
                    id="name"
                    class="form-control"
                    aria-describedby="basic-icon-default-company2"
                    value={email} onChange={handleEmailChange} />
                </div>
                <label class="form-label" for="basic-icon-default-company">Telephone</label>
                <div class="input-group input-group-merge">
                  <input
                    type="number"
                    id="name"
                    class="form-control"
                    aria-describedby="basic-icon-default-company2"
                    value={number} onChange={handleTelephoneChange} />
                </div>
                <label class="form-label" for="basic-icon-default-company">Prix</label>
                <div class="input-group input-group-merge">
                  <input
                    type="number"
                    id="name"
                    class="form-control"
                    aria-describedby="basic-icon-default-company2"
                    value={price} onChange={handlePrixChange} />
                </div>


                <label class="form-label" for="basic-icon-default-company">Mois</label>
                <div class="input-group input-group-merge">
                  <input
                    type="number"
                    id="name"
                    class="form-control"
                    aria-describedby="basic-icon-default-company2"
                    value={month} onChange={handleMonthChange} />
                </div>
                <label class="form-label" for="basic-icon-default-company">Année</label>
                <div class="input-group input-group-merge">
                  <input
                    type="number"
                    id="name"
                    class="form-control"
                    aria-describedby="basic-icon-default-company2"
                    value={year} onChange={handleYearChange} />
                </div>
              </div>



              <button type="submit" value="submit" class="btn btn-primary">Send</button>
            </form>
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
                  <th>Year</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="table-border-bottom-0">
                {items.map(object => (
                  <tr class="table-default" key={object.id_bill}>
                    <td><i class="fab fa-sketch fa-lg text-warning me-3"></i> <strong>{object.reference}</strong></td>
                    <td>{object.month}</td>
                    <td>
                      {object.year}
                    </td>
                    <td><span  className={`badge ${object.etat == "payed" ? "bg-label-success " : "bg-label-warning"}  me-1`}>{object.etat}</span></td>

                    <td><span class="badge bg-label-primary me-1">$ {object.price}</span></td>
                    <td>
                      <div class="dropdown">
                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                          <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div class="dropdown-menu">

                          <button class="dropdown-item" onClick={() => deletedata(object.id_bill)}><i class="bx bx-trash me-1"></i> Delete</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div></div>      </div>

      </div></>
  )
}
