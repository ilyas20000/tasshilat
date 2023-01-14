/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Navbar from '../Water/Navbar';

function Recu() {

    const { id_bill } = useParams();
    const ipURL=process.env.REACT_APP_URL;

    const [facture, setData] = React.useState({
        reference: "",
        price: "",
        date: "",
        number: "",
        email: "",
        fournisseur: {
            id_fournisseur: "",
            name: "",
            image: ""
        },
        user: "",
        id_bill: "",
        month: "",
        year: "",
        etat: ""
    });

    const fetchData = (id_bill) => {
        fetch(ipURL+`/water/facture/getFactureById/${id_bill}`)
            .then(response => response.json())
            .then(result => setData(result));
    }
    useEffect(() => {
        fetchData(id_bill);
    }, []);


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Facture'
    });


    return (
        <>
        <div class="layout-page">
            <Navbar />
            <div class="content-wrapper">
            
                <div class="container-xxl flex-grow-1 container-p-y">
                    <button onClick={handlePrint} class="btn btn-light text-capitalize border-0" data-mdb-ripple-color="dark"><i class='bx bxs-printer' style={{ color: "red" }}></i> Print</button>
                    <div class="row">
                        <div class="card mb-4">
                            <div ref={componentRef} class="card-body">
                                <div class="container mb-5 mt-3">
                                    <div class="row d-flex align-items-baseline">
                                        <div class="col-xl-3">
                                            <img class="card-img-top" src={facture.fournisseur.image} alt="Card image cap" width="80" height="80" />
                                        </div>
                                        <div class="col-xl-6">

                                        </div>

                                        <div class="col-xl-3 float-end">
                                            <img class="card-img-top" src="../WhatsApp Image 2022-12-25 at 21.17.12.jpeg" alt="Card image cap" width="130" height="130" />
                                        </div>
                                        <hr />
                                    </div>

                                    <div class="container">
                                        <div class="col-md-12">
                                            <div class="text-center">
                                                <h3><b>Reçu de paiement</b></h3>
                                            </div>

                                        </div>
                                        <div class="row">

                                            <div class="col-xl-8">
                                                <ul class="list-unstyled">
                                                    <li> <span
                                                        class="fw-bold">Référence:</span>{facture.reference}</li>

                                                    <li> <span
                                                        class="me-1 fw-bold">Agence:</span>{facture.fournisseur.name}</li>
                                                    <li> <span
                                                        class="me-1 fw-bold">Agent:</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <br />

                                        <div class="row my-2 mx-1 justify-content-center ">
                                            <table class="table table-striped table-bordered">
                                                <thead class="text-white">
                                                    <tr>

                                                        <th scope="col">Année</th>
                                                        <th scope="col">Mois</th>
                                                        <th scope="col">Nom de l'entreprise</th>
                                                        <th scope="col">Date de paiement</th>
                                                        <th scope="col">Montant</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    <tr>
                                                        <td>{facture.year}</td>
                                                        <td>{facture.month}</td>
                                                        <td>{facture.fournisseur.name}</td>
                                                        <td>{facture.date}</td>
                                                        <td>{facture.price} DH</td>
                                                    </tr>
                                                </tbody>

                                            </table>
                                        </div>
                                        <br />
                                        <hr />
                                        <div class="row d-flex align-items-baseline">
                                            <div class="col-xl-3">
                                                <p>Signature de l'Agent</p>
                                            </div>
                                            <div class="col-xl-6">

                                            </div>
                                            <div class="col-xl-3 float-end">
                                                <p>Signature du client</p>
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <br />
                                        <hr />
                                        <div class="row">
                                            <div class="col-xl-12">
                                                <p>Merci de votre visite</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div></div></>
    )
} export default Recu
