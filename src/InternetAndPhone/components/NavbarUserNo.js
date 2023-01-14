import React from 'react'

function NavbarUserNo() {
  return (
    <nav
    className="layout-navbar navbar navbar-expand-xl navbar-atached align-items-center bg-navbar-theme bg-dark p-4"
    id="layout-navbar"
  >
    <a className="navbar-brand" href="#"><b className="display-6">T A S H I L A T</b></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

    <div className="navbar-nav-right d-flex align-items-center ms-5" id="navbar-collapse">

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
        <li className="nav-item active me-2">
            <a className="nav-link" href="/login">Home</a>
        </li>
        <li className="nav-item me-2">
            <a className="nav-link" href="/login">Water & Electricity</a>
        </li>
        <li className="nav-item me-2">
            <a className="nav-link" href="/login">Insurance</a>
        </li>
        <li className="nav-item me-2">
            <a className="nav-link" href="/login">Phone & Internet</a>
        </li>
        <li className="nav-item me-2">
            <a className="nav-link" href="/login">University</a>
        </li>
        </ul>
    </div>


      <ul className="navbar-nav flex-row align-items-center ms-auto">

        <li className="nav-item lh-1 me-3">
          <a
            className="button"
            href="#"
            ></a>
        </li>

        <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a class="btn btn-outline-light my-2 my-sm-0" href="/login">Login</a>
        </li>

      </ul>
    </div>
  </nav>

  )
}

export default NavbarUserNo