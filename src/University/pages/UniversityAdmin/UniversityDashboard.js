import Aside from '../../components/Aside';
import Container from '../../components/Container';
import React, { Component }  from 'react';
import ApexChart from '../../components/UniversityChartCourbe';
import ApexChartPayed from '../../components/UniversityChartBar';
import ApexChartUnpayed from '../../components/UniversityChartAll';

export default function UniversityDashboard(){

    return(
        <>
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
      <Aside/>
      <Container>
        
       

        <div class="nav-align-top mb-4">
                         <ul class="nav nav-pills mb-3" role="tablist">
                           <li class="nav-item">
                             <button
                               type="button"
                               class="nav-link active"
                               role="tab"
                               data-bs-toggle="tab"
                               data-bs-target="#navs-pills-top-home"
                               aria-controls="navs-pills-top-home"
                               aria-selected="true"
                             >
                               All
                             </button>
                           </li>
                           <li class="nav-item">
                             <button
                               type="button"
                               class="nav-link"
                               role="tab"
                               data-bs-toggle="tab"
                               data-bs-target="#navs-pills-top-profile"
                               aria-controls="navs-pills-top-profile"
                               aria-selected="false"
                             >
                               Payed
                             </button>
                           </li>
                           <li class="nav-item">
                             <button
                               type="button"
                               class="nav-link"
                               role="tab"
                               data-bs-toggle="tab"
                               data-bs-target="#navs-pills-top-messages"
                               aria-controls="navs-pills-top-messages"
                               aria-selected="false"
                             >
                               Unpayed
                             </button>
                           </li>
                         </ul>
                         
                         <div class="tab-content">
                        
                           <div class="tab-pane fade show active" id="navs-pills-top-home" role="tabpanel">
                            
                           
                           <ApexChart/>
                     
                           </div>
                           <div class="tab-pane fade" id="navs-pills-top-profile" role="tabpanel">
                       
                           <ApexChartPayed/>

                             
                           </div>
                           <div class="tab-pane fade" id="navs-pills-top-messages" role="tabpanel">
                           <ApexChartUnpayed/>

                           </div>

                         </div>
                       </div>

      </Container>
    </div>
    </div>


    </>
    )
}