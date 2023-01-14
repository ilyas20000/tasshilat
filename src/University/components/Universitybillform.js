import * as React from 'react';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import PDF from './PDF';
import emailjs from '@emailjs/browser';

export default function Universitybillform(props) {
    //const [university_id,setUniversityId] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [reference, setReference] = React.useState('')
    const [allClients, setClients] = React.useState([])
    //const [date, setDate] = React.useState()
    let [pdf, setPDF] = React.useState();
    const ipURL = process.env.REACT_APP_URL

    const [university, setUniversity] = React.useState({})
    const [client, setClient] = React.useState({})
    const [universityBill,setUniversityBill] = React.useState({
        reference: "",
        price:0,
        date: "",
        client: {
            id: 0,
            nom: "",
            prenom: "",
            cin: "",
            telephone: "",
            email: "",
            address: ""
        },
        university: {
            id: 0,
            nom: "",
            video: "",
            site: "",
            logo: ""}})
    
    const { university_id } = useParams();

    const logo = 'data:image/jpeg;base64,' + university.logo

    const popUp= ()=>{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
    }

    const onSubmit = (e) => {

    const datee = new Date();
    //    const mysqlDate = datee.toISOString().replace(/\.\d{3}Z$/, '').replace('T', ' ');
        
        e.preventDefault()
        const universityBill = { "reference":reference,"price":price,"date": datee, "university":university,"client":client }
        console.log(universityBill)

        fetch(ipURL+"/Univ-service/api/universityBill/saveUniveristyBill", {
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify(universityBill),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }})
        // Converting to JSON
        .then(response => {
            if(response.ok) { 
            response.json();
            popUp()
        }} )
        // Displaying results to console
        .then(json => console.log(json));
         
        setPDF(pdf?false:true)
        setUniversityBill(universityBill)
       
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


        emailjs.send("gmail","template_kof4y6o",{
            reference: universityBill.reference,
            date: universityBill.date.toLocaleDateString("en-US", options),
            status:universityBill.status ? "PAYED":"UNPAYED",
            price: universityBill.price,
            to_email: universityBill.client.email,
            reply_to: "mouhibmoughtanim47@gmail.com",
            },"D4HbLUl8RlGsLOljF")
            .then((result) => {
                console.log(result.text);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `An email was sent to Mr.${universityBill.client.nom} <br/> To email: ${universityBill.client.email} <br/> containing the bills`,
                    showConfirmButton: false,
                    timer: 4000, width:"700px"
                  })
            }, (error) => {
                console.log(error.text);
            });
      
       
    }

    React.useEffect(() => {
        fetch(ipURL+"/api/university/universityById/" + university_id)
            .then(res => res.json())
            .then((result) => {
                setUniversity(result);
            }
            )

        var date = new Date();
        setReference(`${date.getFullYear()}@${date.getMonth()}${date.getDate()}${date.getHours()}@${date.getMinutes()}${date.getSeconds()}##`)
        
        
        fetch(ipURL+"/api/client/allClients")
            .then(res => res.json())
            .then((result) => {
                setClients(result);
            }
            )
    }, [university, allClients])


    return (
        <>
            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">{university.nom}/</span> Bill Form & List Of Bills</h4>

            <div className="row">


                <div className="col-xxl">
                    <div className="card mb-4">
                        <div className="card-header d-flex align-items-center justify-content-between">
                            <h5 className="mb-0" >{university.nom} </h5>

                            <img src={logo} alt class="mx-auto h-auto rounded-circle" height={'100px'} />


                        </div>
                        <div className="card-body">
                            <form onSubmit={(e) => { onSubmit(e) }} enctype="multipart/form-data">

                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label" for="basic-icon-default-company">Reference</label>
                                    <div className="col-sm-10">
                                        <div className="input-group input-group-merge">
                                            <span id="basic-icon-default-company2" className="input-group-text"
                                            ><i class='bx bx-hash'></i>
                                            </span>
                                            <input
                                                type={"text"}
                                                id="basic-icon-default-company"
                                                className="form-control"
                                                name='reference'
                                                placeholder=" # # # "
                                                aria-label=" # # # "
                                                value={reference}
                                                disabled
                                                aria-describedby="basic-icon-default-company2"
                                                onChange={(e) => { setReference(e.target.value); console.log(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label" for="basic-icon-default-company">Price</label>
                                    <div className="col-sm-10">
                                        <div className="input-group input-group-merge">
                                            <span id="basic-icon-default-company2" className="input-group-text"
                                            ><i class='bx bxs-dollar-circle'></i>
                                            </span>
                                            <input
                                                type={"number"}
                                                id="basic-icon-default-company"
                                                className="form-control"
                                                name='price'
                                                placeholder=" $ $ $ "
                                                aria-label=" $ $ $ "
                                                aria-describedby="basic-icon-default-company2"
                                                onChange={(e) => { setPrice(e.target.value); console.log(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label" for="basic-icon-default-company">Client</label>
                                    <div className="col-sm-10">
                                        <div className="input-group input-group-merge">
                                            <span id="basic-icon-default-company2" className="input-group-text"
                                            ><i class='bx bxs-user-account' ></i>
                                            </span>

                                            <select id="defaultSelect" class="form-select" onChange={(e) => setClient(allClients.filter(x => x.id == e.target.value)[0])} >
                                                <option></option>
                                                {allClients.map(clientt => (
                                                    <option onSelect={(e) => { console.log(clientt.id); setClient(clientt) }} key={clientt.id} value={clientt.id}>Name : {clientt.prenom} {clientt.nom} | CIN : {clientt.cin}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>






                                <div className="row justify-content-end">
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary">Send</button>
                                    </div>
                                </div>
                            </form>
                            {/* <div id="pdf" style={{display: `${pdf?"block":"none"}`} }><PDF universityBill={universityBill} type={"btn btn-danger"}/></div> */}

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}