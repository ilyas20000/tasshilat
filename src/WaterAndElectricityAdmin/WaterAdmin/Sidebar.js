/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';


export default function Sidebar() {
  const navigate = useNavigate();
  const handleOnClick = useCallback((e) => navigate(`/admin/university`, { replace: true }), [navigate]);
  const universitiesBills = useCallback((e) => navigate(`/admin/universities-bills`, { replace: true }), [navigate]);
  const universityDashborad = useCallback((e) => navigate(`/admin/university/dashboard`, { replace: true }), [navigate]);

  let [open, setOpen] = React.useState();
  let [open2, setOpen2] = React.useState();
  let [open3, setOpen3] = React.useState();

  let [open4, setOpen4] = React.useState();
  let [open5, setOpen5] = React.useState();
  let [open6, setOpen6] = React.useState();


  return (
    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
      <div className="app-brand demo">
        <a href="index.html" className="app-brand-link">
          <span className="app-brand-logo demo">
            <svg
              width="25"
              viewBox="0 0 25 42"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <path
                  d="M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2305145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0011079 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z"
                  id="path-1"
                ></path>
                <path
                  d="M5.47320593,6.00457225 C4.05321814,8.216144 4.36334763,10.0722806 6.40359441,11.5729822 C8.61520715,12.571656 10.0999176,13.2171421 10.8577257,13.5094407 L15.5088241,14.433041 L18.6192054,7.984237 C15.5364148,3.11535317 13.9273018,0.573395879 13.7918663,0.358365126 C13.5790555,0.511491653 10.8061687,2.3935607 5.47320593,6.00457225 Z"
                  id="path-3"
                ></path>
                <path
                  d="M7.50063644,21.2294429 L12.3234468,23.3159332 C14.1688022,24.7579751 14.397098,26.4880487 13.008334,28.506154 C11.6195701,30.5242593 10.3099883,31.790241 9.07958868,32.3040991 C5.78142938,33.4346997 4.13234973,34 4.13234973,34 C4.13234973,34 2.75489982,33.0538207 2.37032616e-14,31.1614621 C-0.55822714,27.8186216 -0.55822714,26.0572515 -4.05231404e-15,25.8773518 C0.83734071,25.6075023 2.77988457,22.8248993 3.3049379,22.52991 C3.65497346,22.3332504 5.05353963,21.8997614 7.50063644,21.2294429 Z"
                  id="path-4"
                ></path>
                <path
                  d="M20.6,7.13333333 L25.6,13.8 C26.2627417,14.6836556 26.0836556,15.9372583 25.2,16.6 C24.8538077,16.8596443 24.4327404,17 24,17 L14,17 C12.8954305,17 12,16.1045695 12,15 C12,14.5672596 12.1403557,14.1461923 12.4,13.8 L17.4,7.13333333 C18.0627417,6.24967773 19.3163444,6.07059163 20.2,6.73333333 C20.3516113,6.84704183 20.4862915,6.981722 20.6,7.13333333 Z"
                  id="path-5"
                ></path>
              </defs>
              <g id="g-app-brand" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Brand-Logo" transform="translate(-27.000000, -15.000000)">
                  <g id="Icon" transform="translate(27.000000, 15.000000)">
                    <g id="Mask" transform="translate(0.000000, 8.000000)">
                      <mask id="mask-2" fill="white">
                        <use xlinkHref="#path-1"></use>
                      </mask>
                      <use fill="#696cff" xlinkHref="#path-1"></use>
                      <g id="Path-3" mask="url(#mask-2)">
                        <use fill="#696cff" xlinkHref="#path-3"></use>
                        <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-3"></use>
                      </g>
                      <g id="Path-4" mask="url(#mask-2)">
                        <use fill="#696cff" xlinkHref="#path-4"></use>
                        <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-4"></use>
                      </g>
                    </g>
                    <g
                      id="Triangle"
                      transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) "
                    >
                      <use fill="#696cff" xlinkHref="#path-5"></use>
                      <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-5"></use>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </span>
          <span className="app-brand-text demo menu-text fw-bolder ms-2">Tashilat</span>
        </a>

        <a href="#" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1">

        <li className="menu-item active">
          <a href="/" className="menu-link">
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <div data-i18n="Analytics">Dashboard</div>
          </a>
        </li>

        <li className="menu-header small text-uppercase">
          <span className="menu-header-text">Phone & Internet</span>
        </li>
        <li className="menu-item">
          <a href="/phone" className="menu-link ">
            <i className="menu-icon tf-icons bx bx-mobile-alt"></i>
            <div data-i18n="Account Settings">Phone bills</div>
          </a>
          
        </li>
        <li className="menu-item">
          <a href="/internet" className="menu-link ">
            <i className="menu-icon tf-icons bx bx-globe"></i>
            <div data-i18n="Authentications">Internet bills</div>
          </a>
          
        </li>
        <li className="menu-item">
          <a href="/operator" className="menu-link ">
            <i className="menu-icon tf-icons bx bx-phone"></i>
            <div data-i18n="Misc">Operators</div>
          </a>
          <ul className="menu-sub">
            <li className="menu-item">
              <a href="pages-misc-error.html" className="menu-link">
                <div data-i18n="Error">Error</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="pages-misc-under-maintenance.html" className="menu-link">
                <div data-i18n="Under Maintenance">Under Maintenance</div>
              </a>
            </li>
          </ul>
        </li>

        <li className={`menu-item ${open ? "open" : ""}`} onClick={() => { setOpen(open ? false : true) }}>
          <a className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-wifi"></i>
            <div data-i18n="Misc">Wifi</div>
          </a>
          <ul className="menu-sub">
            <li className="menu-item">
              <a href="/wifi/bills" className="menu-link">
                <div data-i18n="Error">Bills</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="/wifi/clients" className="menu-link">
                <div data-i18n="Under Maintenance">Clients</div>
              </a>
            </li>
          </ul>
        </li>
        <li className="menu-header small text-uppercase">
          <span className="menu-header-text">Water & Electricity</span>
        </li>
        <li className={`menu-item ${open2 ? "open" : ""}`} onClick={() => { setOpen2(open2 ? false : true) }}>
          <a className="menu-link menu-toggle">
            <i class=' menu-icon bx bx-droplet'></i>
            <div data-i18n="Misc">Water</div>
          </a>


          <ul className="menu-sub">

            <li className="menu-item">
              <a href="/water" className="menu-link">
                <div data-i18n="Under Maintenance">Water</div>
              </a>
            </li>
          </ul>
        </li>

        {/* Electricity */}
        <li className={`menu-item ${open5 ? "open" : ""}`} onClick={() => { setOpen5(open5 ? false : true) }}>
          <a className="menu-link menu-toggle">
            <i class=' menu-icon bx bxs-zap'></i>
            <div data-i18n="Misc">Electricity</div>
          </a>


          <ul className="menu-sub">
            <li className="menu-item">
              <a href="/entreprise" className="menu-link">
                <div data-i18n="Error">Add Entreprise</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="/client" className="menu-link">
                <div data-i18n="Under Maintenance">Add Client</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="/addFacture" className="menu-link">
                <div data-i18n="Under Maintenance">Add Electricity Bill</div>
              </a>
            </li>
          </ul>
        </li>


        {/* University */}
        <li className="menu-header small text-uppercase">
          <span className="menu-header-text">University</span>
        </li>

        <li className={`menu-item ${open3 ? "open" : ""}`} onClick={() => { setOpen3(open3 ? false : true) }} >
          <a href="#" className="menu-link menu-toggle">
            <i class='menu-icon bx bxs-institution'></i>
            <div data-i18n="Layouts">University</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item">

              <a href="layouts-without-menu.html" className="menu-link" onClick={(e) => { e.preventDefault(); handleOnClick() }}>
                <div data-i18n="Without menu">List Of Universities</div>
              </a>

            </li>

            <li className="menu-item">

              <a href="layouts-without-menu.html" className="menu-link" onClick={(e) => { e.preventDefault(); handleOnClick() }}>
                <div data-i18n="Without menu">Add University</div>
              </a>

            </li>

            <li className="menu-item">

              <a href="layouts-without-menu.html" className="menu-link" onClick={(e) => { e.preventDefault(); universitiesBills() }}>
                <div data-i18n="Without menu">List Of Bills</div>
              </a>

            </li>

            <li className="menu-item">

              <a href="layouts-without-menu.html" className="menu-link" onClick={(e) => { e.preventDefault(); universityDashborad() }}>
                <div data-i18n="Without menu">UniversityDashboard</div>
              </a>

            </li>

          </ul>
        </li>
        {/* University */}


        {/* insurance */}
        <li className="menu-header small text-uppercase">
          <span className="menu-header-text">House & Car</span>
        </li>

        <li className={`menu-item ${open4 ? "open" : ""}`} onClick={() => { setOpen4(open4 ? false : true) }} >
          <a href="#" className="menu-link menu-toggle">
            <i class="menu-icon bx bx-shield"></i>
            <div data-i18n="Layouts">House & Car</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item">

              <a href="/factureM" className="menu-link" >
                <div data-i18n="Without menu">Administration Service</div>
              </a>

            </li>

            <li className="menu-item">

              <a href="/houses" className="menu-link" >
                <i className="menu-icon tf-icons bx bx-home" /> <div data-i18n="Without menu">House</div>
              </a>

            </li>

            <li className="menu-item">

              <a href="/cars" className="menu-link" >
                <i className="menu-icon tf-icons bx bx-car" /> <div data-i18n="Without menu">Car</div>
              </a>

            </li>

            <li className="menu-item">

              <a href="/dashboard" className="menu-link">
                <i className="menu-icon tf-icons bx bx-chart" /> <div data-i18n="Without menu">Dashboard</div>
              </a>

            </li>

          </ul>
        </li>

        <li className="menu-header small text-uppercase">
          <span className="menu-header-text">User</span>
        </li>
        <li className={`menu-item ${open6 ? "open" : ""}`} onClick={() => { setOpen6(open6 ? false : true) }} >
          <a href="#" className="menu-link menu-toggle">
            <i class=' menu-icon bx bx-user'></i>
            <div data-i18n="Layouts">User</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item">

              <a href="/user" className="menu-link" >
                <div data-i18n="Without menu">User Form & List</div>
              </a>

            </li>

          </ul>
        </li>
        <li className="menu-header small text-uppercase">
          <span className="menu-header-text"></span>
        </li>




        {/* insurance */}
      </ul>
    </aside>)
}
