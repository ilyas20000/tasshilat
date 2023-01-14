import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Navbar from '../Water/Navbar';

export default function Recu() {

    const [fact, setFact] = useState({
        factelec_id: "",
        mois: "",
        annee: "",
        montant: "",
        date: "",
        etat: "",
        client: "",
        user: "",
        entreprise: ""
    })

    const ipURL=process.env.REACT_APP_URL;

    const { id } = useParams();

    useEffect(() => {
        loadFact()
    }, []);

    const loadFact = async () => {
        const result = await axios.get(ipURL+`/Elect-service/factElec/factElec/id=${id}`)
        setFact(result.data)
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Facture'
    });

    return (
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <div class="layout-page">
                    <Navbar/>
                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
                            <button onClick={handlePrint} class="btn btn-light text-capitalize border-0" data-mdb-ripple-color="dark"><i class='bx bxs-printer' style={{ color: "red" }}></i> Print</button>
                            <div class="row">
                                <div class="card mb-4">
                                    <div ref={componentRef} class="card-body">
                                        <div class="container mb-5 mt-3">
                                            <div class="row d-flex align-items-baseline">
                                                <div class="col-xl-3">
                                                    <img class="card-img-top" src={'data:image/jpeg;base64,' + fact.entreprise.logo} alt="Card image cap" width="80" height="80" />
                                                </div>
                                                <div class="col-xl-6">

                                                </div>
                                                <div class="col-xl-3 float-end">
                                                    <img class="card-img-top" src="https://seeklogo.com/images/T/tasshilat-logo-EF4B36438D-seeklogo.com.png" alt="Card image cap" width="130" height="130" />
                                                </div>
                                                <hr />
                                            </div>

                                            <div class="container">
                                                <div class="col-md-12">
                                                    <div class="text-center">
                                                        <h3 ><b>Reçu de paiement</b></h3>
                                                    </div>

                                                </div>
                                                <div class="row">

                                                    <div class="col-xl-8">
                                                        <ul class="list-unstyled">
                                                            <li > <span
                                                                class="fw-bold">Référence:</span>{fact.client.ref}</li>
                                                            <li > <span
                                                                class="fw-bold">Client: </span>{fact.client.nom} {fact.client.prenom}</li>
                                                            <li > <span
                                                                class="me-1 fw-bold">Agence:</span>{fact.user.agence}</li>
                                                            <li > <span
                                                                class="me-1 fw-bold">Agent:</span>{fact.user.nom} {fact.user.prenom}</li>
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
                                                                <td>{fact.annee}</td>
                                                                <td>{fact.mois}</td>
                                                                <td>{fact.entreprise.nom}</td>
                                                                <td>{fact.date}</td>
                                                                <td>{fact.montant} DH</td>
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
                    </div>
                </div >
            </div>
        </div>
    )
}
