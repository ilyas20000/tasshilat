import React, { Component }  from 'react';
import Navbar from '../../InternetAndPhone/components/Navbar';
import NavbarUser from '../../InternetAndPhone/components/NavbarUser';

export default function Container({children}){

  

  return(
    <div className="layout-page">
      <Navbar/>
       <div class="content-wrapper">
            
            <div className="container-xxl flex-grow-1 container-p-y">
            <div class="m-5 text-center"><h2>List of universities</h2></div>
         {children}
       </div>
    </div>
    </div>
 )  
}