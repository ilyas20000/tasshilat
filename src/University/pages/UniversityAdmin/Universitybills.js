import { useParams } from "react-router-dom";
import Aside from '../../components/Aside';

import Container from '../../components/Container';
import Universitybilltable from "../../components/Universitybilltable";
import Universitybillform from "../../components/Universitybillform";
import React, { Component }  from 'react';


export default function Universitybills(){
    const {university_id} = useParams();
    return(   <>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
          <Aside/>
          <Container>
            
            <Universitybillform university_id={university_id} key={university_id}/>
            <Universitybilltable/>
    
          </Container>
        </div>
        </div>
    
    
        </>) 
}