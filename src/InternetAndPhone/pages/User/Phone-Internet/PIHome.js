import React from 'react'
import NavbarUser from '../../../components/NavbarUser'

function PIHome() {
  return (
    <>
    <div className="layout-page">
      <NavbarUser/>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
        <div className="m-5 text-center"><h2>Phone & Internet</h2></div>
        <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">

                <div class="col">
                  <div class="card h-100">
                    <img class="card-img-top" src="../assets/img/elements/call.jpg" alt="Card image cap" />
                    <div class="card-body">
                      <h5 class="card-title">Minutes</h5>
                      <p class="card-text">
                        Refill your phone with the amount of minutes that you want.
                      </p>
                      <a href="/phone-internet/phone" class="btn btn-outline-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100">
                    <img class="card-img-top" src="../assets/img/elements/internet2.jpg" alt="Card image cap" />
                    <div class="card-body">
                      <h5 class="card-title">Internet</h5>
                      <p class="card-text">
                        Refill your phone with internet with a forfait of your choice.
                      </p>
                      <a href="/phone-internet/internet" class="btn btn-outline-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100">
                    <img class="card-img-top" src="../assets/img/elements/wifi.png" alt="Card image cap" />
                    <div class="card-body">
                      <h5 class="card-title">Wifi</h5>
                      <p class="card-text">
                        Pay your wifi bills in ENSAJ Tashilat.
                      </p>
                      <a href="/phone-internet/wifi" class="btn btn-outline-primary">Go somewhere</a>
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

export default PIHome