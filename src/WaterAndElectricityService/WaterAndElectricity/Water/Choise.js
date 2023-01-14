/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Water/Navbar';

export default function Choise() {
  return (
    <>    
     <div className="layout-page">

    
    <Navbar />
    <div class="content-wrapper">


      <div class="container-xxl flex-grow-1 container-p-y">
        <h5 class="pb-1 mb-4"></h5>
        <div class="row mb-5">
          <div class="col-md" >
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <img class="card-img card-img-left" src="../téléchargé.jpg" alt="Card image" />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Water Service</h5>
                    <p class="card-text">
                      Water supply and sanitation in Morocco is provided by a wide array of utilities. They range from private companies in the largest city, Casablanca, the capital, Rabat, Tangier, and Tetouan, to public municipal utilities in 13 other cities, as well as a national electricity and water company (ONEE).
                    </p>
                    <Link to="/Reference" class="btn btn-outline-primary">go to service</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">electricity service</h5>
                    <p class="card-text">
                      The electrical sector has shown great dynamism since the launching the Global Rural Electrification Programme (PERG) in 1995, carried out mainly by Moroccan companies  in the largest city, Casablanca, the capital, Rabat, Tangier, and Tetouan,  with locally manufactured products.
                    </p>
                    <Link to="/homeAgent/" class="btn btn-outline-primary">go to service</Link>
                  </div>
                </div>
                <div class="col-md-4">
                  <img class="card-img card-img-right" src="../téléchargéE.png" alt="Card image" height={"200px"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div></div>
      </div></>
  )
}
