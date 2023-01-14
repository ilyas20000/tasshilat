import Aside from '../../components/Aside';
import Cardgrid from '../../components/Cardgrid';
import Form from '../../components/Universityform';
import Container from '../../components/Container';
import React, { Component }  from 'react';
import Navbar from '../../../InternetAndPhone/components/Navbar';



function Universityindex() {
  return (
   
    <>
    
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
      <Aside/>
      <Container>
        
        <Form/>
        <Cardgrid/>
       
      </Container>
    </div>
    </div>


    </>
    
    
  );
}

export default Universityindex;
