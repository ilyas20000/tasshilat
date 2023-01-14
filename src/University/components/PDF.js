import React, { Component ,useRef} from 'react';
import Pdf  from 'react-to-pdf';
import { useReactToPrint } from "react-to-print";
import '../assets/hidden.css';
import '../assets/pdfCss.css';
// const ref =React.createRef();
// const componentRef = useRef();
// const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

const today  = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const PDF = (props) => {
    const ref =React.createRef();
    const [showResults, setShowResults] = React.useState(false)
    const componentRef = useRef();
    const logo = 'data:image/jpeg;base64,' + props.universityBill.university.logo

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
  });
    return(
        <>
        <div style={{margin:"0px"}} >
        <i class="fas fa-file-pdf"></i>
      
            <button type="button" class="btn btn-outline-danger"  onClick={handlePrint} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-pdf" viewBox="0 0 16 16">
                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"></path>
                <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"></path>
                </svg>
              </button>
        <div className='rowRegistration' ref={componentRef}>
            {/* <h1>{props.first_name}</h1>
            <h1>{props.last_name}</h1> */}

            {/* debut dernierement ajouté */}
<div class="container">
    <div class="row justify-content-center" >
    <img class="img-responsive" alt="iamgurdeeposahan" src={logo} style={{width: "200px",borderRadius:"75px"}} />
    </div>

            <div class="receipt-main"></div>
            <center>
            <div class="row d-flex justify-content-center">
    			
            <div class="col-md-4 text-left">
					{/* <div class="col-xs-6 col-sm-6 col-md-6 text-left"> */}
						<div>
							<h5>TechiTouch.</h5>
							<p>+91 12345-6789 <i class="fa fa-phone"></i></p>
							<p>info@gmail.com <i class="fa fa-envelope-o"></i></p>
							<p>Australia <i class="fa fa-location-arrow"></i></p>
						</div>
					{/* </div> */}
            </div>
			<div class="col-md-4 text-center">

            </div>
          
            <div class="col-md-4 text-right"> 
						<div>
							<h5>{props.universityBill.client.nom} {props.universityBill.client.prenom} <small>  |   CIN : {props.universityBill.client.cin}</small></h5>
							<p><b>Mobile :</b> {props.universityBill.client.telephone}</p>
							<p><b>Email :</b> {props.universityBill.client.email}</p>
							<p><b>Address :</b> {props.universityBill.client.address}</p>
						</div>
					</div>
					
				
         
                    </div></center>
            <div>
                    <div class="d-flex justify-content-center text-center">
						
							<h1>{props.universityBill.university.nom} Receipt</h1>
						
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
                            <td class="col-md-9">Reference</td>
                            <td class="col-md-3"><i class="fa fa-inr"></i> {props.universityBill.reference}</td>
                        </tr>
                        <tr>
                            <td class="col-md-9">Payed</td>
                            <td class="col-md-3"><i class="fa fa-inr"></i>{props.universityBill.status == 1 ? "PAYED" : "NOT PAYED"}</td>
                        </tr>
                        <tr>
                            <td class="col-md-9">Bill created at:</td>
                            <td class="col-md-3"><i class="fa fa-inr"></i>{props.universityBill.date}</td>
                        </tr>
                        
                        <tr>
                           
                            <td class="text-right"><h2><strong>Total: </strong></h2></td>
                            <td class="text-left text-danger"><h2><strong><i class="fa fa-inr"></i> {props.universityBill.price}</strong></h2></td>
                        </tr>
                    </tbody>
                </table>
            </div>
			
			<div class="row d-flex justify-content-center">
				<div class="receipt-header receipt-header-mid receipt-footer">
					<div class="col-xs-8 col-sm-8 col-md-8 text-left">
						<div class="receipt-center d-flex justify-content-center">
							<p><b>Date :</b> {today.toLocaleDateString("en-US", options)}</p>
							<h5 style={{color: "rgb(140, 140, 140)"}}><br/><br/><br/>Thank you for your business!</h5>
						</div>
					</div>
					<div class="col-xs-4 col-sm-4 col-md-4">
						<div class="receipt-right">
							<h1>Signature</h1>
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

export default PDF;