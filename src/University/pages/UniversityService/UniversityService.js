
import Container from '../../components/Container';
import Navbar from '../../components/Navbar';
import React, { Component } from 'react';
import CardGridService from '../../components/CardGridService';
import NavbarUser from '../../../InternetAndPhone/components/NavbarUser';

export default function UniversityService() {
  return (

    <>


      <div className="layout-page">
        <NavbarUser />
        <div class="content-wrapper">
          <div class="card">
            <div class="d-flex align-items-end row">
              <div class="col-sm-7"><div class="card-body">
                <h5 class="card-title text-primary">HAOUSE-CAR-Bill </h5>
                <p class="mb-4">Hi weelcom on 
                <span class="fw-bold">INTERFACE</span> 
                of Payying  Houses And Car Insurance.</p>
                </div>
                </div>
                <div class="col-sm-5 text-center text-sm-left">
                  <div class="card-body pb-0 px-0 px-md-4">
                    <img src="assets/img/illustrations/man-with-laptop-light.png" height="140" alt="View Badge User" data-app-dark-img="illustrations/man-with-laptop-dark.png" data-app-light-img="illustrations/man-with-laptop-light.png" />
                    </div>
                    </div>
                    </div>
                    </div>
          <div className="container-xxl flex-grow-1 container-p-y">
            <div class="m-5 text-center"><h2>List of universities</h2></div>
            <CardGridService />
          </div>
        </div>
      </div>

    </>


  );
}

