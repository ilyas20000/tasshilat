import React from 'react'
import NavbarUserNo from '../../components/NavbarUserNo'

function Main() {
  return (
    <>
      <div className="layout-page">
        <NavbarUserNo />
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <div class="row">
              <div class="col-md">

                <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                  <ol class="carousel-indicators">
                    <li data-bs-target="#carouselExample" data-bs-slide-to="0" class="active"></li>
                    <li data-bs-target="#carouselExample" data-bs-slide-to="1"></li>
                    <li data-bs-target="#carouselExample" data-bs-slide-to="2"></li>
                  </ol>
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="d-block w-100" src="../assets/img/operators/iam.jpg" height={"680px"} alt="First slide" />
                      <div class="carousel-caption d-none d-md-block">

                      </div>
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" src="../assets/img/operators/ooredoo.png" height={"680px"} alt="Second slide" />
                      <div class="carousel-caption d-none d-md-block">

                      </div>
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" src="../assets/img/MIT.png" height={"680px"} alt="Third slide" />
                      <div class="carousel-caption d-none d-md-block">

                      </div>
                    </div>
                  </div>
                  <a class="carousel-control-prev" href="#carouselExample" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#carouselExample" role="button" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </a>
                </div>
              </div>
              <div class="col-md">

                <div id="carouselExample-cf"
                  class="carousel carousel-dark slide carousel-fade"
                  data-bs-ride="carousel"
                >
                  <ol class="carousel-indicators">
                    <li data-bs-target="#carouselExample-cf" data-bs-slide-to="0" class="active"></li>
                    <li data-bs-target="#carouselExample-cf" data-bs-slide-to="1"></li>
                    <li data-bs-target="#carouselExample-cf" data-bs-slide-to="2"></li>
                  </ol>
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="d-block w-100" src="../assets/img/axa.png" height={"680px"} alt="Second slide" />
                      <div class="carousel-caption d-none d-md-block">

                      </div>
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" src="../assets/img/saham.png" height={"680px"} alt="Second slide" />
                      <div class="carousel-caption d-none d-md-block">

                      </div>
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" src="../assets/img/Orange_logo.svg.png" alt="Third slide" />
                      <div class="carousel-caption d-none d-md-block">
                      </div>
                    </div>
                  </div>
                  <a class="carousel-control-prev" href="#carouselExample-cf" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#carouselExample-cf" role="button" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </a>
                </div>
              </div>
            </div>


            <div class="row mb-5 mt-5">
              <div class="col-md">
                <div class="card mb-3">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img class="card-img card-img-left" src="../assets/img/WaterLogo.jpg" height={"200px"} alt="Card image" />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">Water & Electricity</h5>
                        <p class="card-text">
                          This is a wider card with supporting text below as a natural lead-in to additional content.
                          This content is a little bit longer.
                        </p>
                        <a href='/login' class="btn btn-outline-primary">Go</a>
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
                        <h5 class="card-title">Phone</h5>
                        <p class="card-text">
                          This is a wider card with supporting text below as a natural lead-in to additional content.
                          This content is a little bit longer.
                        </p>
                        <a href='/login' class="btn btn-outline-primary">Go</a>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <img class="card-img card-img-right" src="../assets/img/phone.jpg" height={"200px"} alt="Card image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-0 mt-5">
              <div class="col-md">
                <div class="card mb-3">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img class="card-img card-img-left" src="../assets/img/university.jpeg" alt="Card image" />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">University</h5>
                        <p class="card-text">
                          This is a wider card with supporting text below as a natural lead-in to additional content.
                          This content is a little bit longer.
                        </p>
                        <a href='/login' class="btn btn-outline-primary">Go</a>
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
                        <h5 class="card-title">Insurance</h5>
                        <p class="card-text">
                          This is a wider card with supporting text below as a natural lead-in to additional content.
                          This content is a little bit longer.
                        </p>
                        <a href='/login' class="btn btn-outline-primary">Go</a>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <img class="card-img card-img-right" src="../assets/img/shield.png" height={"200px"} alt="Card image" />
                    </div>
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

export default Main