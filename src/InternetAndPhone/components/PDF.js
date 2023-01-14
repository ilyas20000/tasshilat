import React, { Component ,useRef} from 'react';
import { useReactToPrint } from "react-to-print";
import '../assets/css/hidden.css';
import '../assets/css/pdfCss.css';


const PDF = (props) => {

    const date = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    const ref =React.createRef();

const componentRef = useRef();
const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
    return(
        <>
        <div style={{margin:"0px"}} >
        <button onClick={handlePrint} className="dropdown-item"><i className="bx bxs-file-pdf me-1"></i> PDF</button>
        <div className='rowRegistration' ref={componentRef}>
            {/* <h1>{props.first_name}</h1>
            <h1>{props.last_name}</h1> */}

            {/* debut dernierement ajouté */}
<div className="container">
    <div className="row justify-content-center" >
    <img class="img-responsive" alt="iamgurdeeposahan" src="../assets/img/elements/tashilat.jpg" style={{width: "300px",borderRadius:"75px"}} />
    </div>

            <div className="receipt-main"></div>
            <center>
            <div className="row d-flex justify-content-center">
    			
            <div className="col-md-4 text-left">
					{/* <div className="col-xs-6 col-sm-6 col-md-6 text-left"> */}
						<div>
							<h5>TechiTouch.</h5>
							<p>+91 12345-6789 <i className="fa fa-phone"></i></p>
							<p>info@gmail.com <i className="fa fa-envelope-o"></i></p>
							<p>Australia <i className="fa fa-location-arrow"></i></p>
						</div>
					{/* </div> */}
            </div>
			
          
            <div className="col-md-8"> 
						<div>
							<h5>Gurdeep Singh <small>  |   Lucky Number : 156</small></h5>
							<p><b>Mobile :</b> +91 12345-6789</p>
							<p><b>Email :</b> info@gmail.com</p>
							<p><b>Address :</b> Australia</p>
						</div>
					</div>
					
				
         
                    </div></center>
            <div>
                    <div className="d-flex justify-content-center text-center">
						
							<h1>{props.wifi.id}</h1>
						
					</div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="col-md-9">Payment for August 2016</td>
                            <td className="col-md-3"><i className="fa fa-inr"></i> 15,000/-</td>
                        </tr>
                        <tr>
                            <td className="col-md-9">Payment for June 2016</td>
                            <td className="col-md-3"><i className="fa fa-inr"></i> 6,00/-</td>
                        </tr>
                        <tr>
                            <td className="col-md-9">Payment for May 2016</td>
                            <td className="col-md-3"><i className="fa fa-inr"></i> 35,00/-</td>
                        </tr>
                        <tr>
                            <td className="text-right">
                            <p>
                                <strong>Total Amount: </strong>
                            </p>
                            <p>
                                <strong>Late Fees: </strong>
                            </p>
							<p>
                                <strong>Payable Amount: </strong>
                            </p>
							<p>
                                <strong>Balance Due: </strong>
                            </p>
							</td>
                            <td>
                            <p>
                                <strong><i className="fa fa-inr"></i> 65,500/-</strong>
                            </p>
                            <p>
                                <strong><i className="fa fa-inr"></i> 500/-</strong>
                            </p>
							<p>
                                <strong><i className="fa fa-inr"></i> 1300/-</strong>
                            </p>
							<p>
                                <strong><i className="fa fa-inr"></i> 9500/-</strong>
                            </p>
							</td>
                        </tr>
                        <tr>
                           
                            <td className="text-right"><h2><strong>Total: </strong></h2></td>
                            <td className="text-left text-danger"><h2><strong><i className="fa fa-inr"></i> 31.566/-</strong></h2></td>
                        </tr>
                    </tbody>
                </table>
            </div>
			
			<div className="row d-flex justify-content-center">
				<div className="receipt-header receipt-header-mid receipt-footer">
					<div className="col-xs-8 col-sm-8 col-md-8 text-left">
						<div className="receipt-center d-flex">
							<p><b>Date :</b> {date()}</p>
						</div>
					</div>
					<div className="col-xs-4 col-sm-4 col-md-4">
						<div className="receipt-right">
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