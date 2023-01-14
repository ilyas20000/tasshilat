import React, { Component ,useRef} from 'react';

import { useReactToPrint } from "react-to-print";
import '../assets/css/hidden.css';
import '../assets/css/pdfCss.css';
// const ref =React.createRef();
// const componentRef = useRef();
// const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });
const PdfInternet = (props) => {

    const date = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }


    const ref =React.createRef();
    const [showResults, setShowResults] = React.useState(false)
const componentRef = useRef();
const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
    return(
        <>
        <div style={{margin:"0px"}} >
        <i class="fas fa-file-pdf"></i>
        <button onClick={handlePrint} className={""+props.type}><i className="bx bxs-file-pdf me-1"></i> PDF</button>
        <div className='rowRegistration' ref={componentRef}>
            {/* <h1>{props.first_name}</h1>
            <h1>{props.last_name}</h1> */}

            {/* debut dernierement ajouté */}
<div class="container">
    <div class="row justify-content-center mb-5" >
    <img class="img-responsive" alt="iamgurdeeposahan" src="../assets/img/elements/tashilat.jpg" style={{width: "300px",borderRadius:"75px"}} />
    </div>

            <center>
            <div class="row d-flex justify-content-center">
    			
            <div class="col-md-4 text-left">
					{/* <div class="col-xs-6 col-sm-6 col-md-6 text-left"> */}
						<div>
							<h5>Client.</h5>
							<p>{props.internet.number} <i class="fa fa-phone"></i></p>
							<p>{props.internet.email} <i class="fa fa-envelope-o"></i></p>
						</div>
					{/* </div> */}
            </div>
			
          
            <div class="col-md-8"> 
						<div>
							<h5>TASHILAT ENSAJ <small>  |   agency</small></h5>
							<p><b>Mobile :</b> +212 63482-2409</p>
							<p><b>Email :</b> tashilat.ensaj@gmail.com</p>
							<p><b>Address :</b> Morocco</p>
						</div>
					</div>
					
				
         
                    </div></center>
            <div>
                    <div class="d-flex justify-content-center text-center">
						
							<h1>Receipt</h1>
						
					</div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="col-md-9">Type</td>
                            <td class="col-md-3"><i class="fa fa-inr"></i> Internet</td>
                        </tr>
                        <tr>
                            <td class="col-md-9">Operator</td>
                            <td class="col-md-3"><i class="fa fa-inr"></i> {props.internet.operator.name}</td>
                        </tr>
                        <tr>
                            <td class="col-md-9">Forfait</td>
                            <td class="col-md-3"><i class="fa fa-inr"></i> {props.internet.forfait}</td>
                        </tr>
                        <tr>
                            <td class="col-md-9">Price</td>
                            <td class="col-md-3"><i class="fa fa-inr"></i> {props.internet.price} DH</td>
                        </tr>
                        <tr>
                           
                            <td class="text-right"><h2><strong>Total: </strong></h2></td>
                            <td class="text-left text-primary"><h2><strong><i class="fa fa-inr"></i> {props.internet.price} DH</strong></h2></td>
                        </tr>
                    </tbody>
                </table>
            </div>
			
			<div class="row d-flex justify-content-center">
				<div class="receipt-header receipt-header-mid receipt-footer">
					<div class="col-xs-8 col-sm-8 col-md-8 text-left">
						<div class="receipt-center d-flex">
							<p><b>Date :</b> {date()}</p>
						</div>
					</div>
					<div class="col-xs-4 col-sm-4 col-md-4">
						<div class="receipt-right">
							<h1>Signature</h1>
                            <img class="img-responsive" alt="iamgurdeeposahan" src="../assets/img/elements/signature.png" style={{width: "200px",borderRadius:"75px"}} />
						</div>
					</div>
				</div>
            </div>
			
        </div>    
	</div>


        


            {/* dernierement ajouté */}


        </div>      
       
        
        </>
    );

}

export default PdfInternet;