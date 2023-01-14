import { useParams } from "react-router-dom";

import Container from '../../components/Container';
import Navbar from '../../components/Navbar';
import React, { Component }  from 'react';
import CardGridService from '../../components/CardGridService';
import UniversityServiceBills from '../../components/UniversityServiceBills';
import NavbarUser from "../../../InternetAndPhone/components/NavbarUser";

export default function UniversityServiceBillsPage() {
    const {university_id}= useParams();

  return (
   
    <>
    
      {/* <Navbar/> */}
    
      <div className="layout-page">
      <NavbarUser/>
      <div class="content-wrapper">
           
           <div className="container-xxl flex-grow-1 container-p-y">
           <div class="m-5 text-center"><h2>List of universities</h2></div>
           <UniversityServiceBills university_id={university_id} key={university_id}/>
      </div>
   </div>
   </div>


    </>
    
    
  );
}

