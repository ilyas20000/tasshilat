import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, redirect, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser';

import Navbar from '../Water/Navbar';

export default function PaiementByEntreprise() {
    const ipURL=process.env.REACT_APP_URL;

    const [email, setEmail] = useState({
        client_nom: "",
        client_prenom: "",
        fact_montant: "",
        fact_date: "",
        user_nom: "",
        user_prenom: "",
        user_agence: "",
        client_email: ""
    });

    const [facts, setFacts] = useState([]);
    const [factsP, setFactsP] = useState([]);
    const [factsNP, setFactsNP] = useState([]);

    const [refAll, setRefAll] = React.useState('');
    const [refAllP, setRefAllP] = React.useState('');
    const [refAllNP, setRefAllNP] = React.useState('');

    const { id } = useParams();

    useEffect(() => {
        loadFacts();
        loadFactsP();
        loadFactsNP();
    }, []);

    const loadFacts = async () => {
        const result = await axios.get(ipURL+`/Elect-service/factElec/factElecs/entreprise=${id}`);
        setFacts(result.data);

    }
    const loadFactsP = async () => {
        const result = await axios.get(ipURL+`/Elect-service/factElec/factElecsP/entreprise=${id}`);
        setFactsP(result.data);

    }

    const loadFactsNP = async () => {
        const result = await axios.get(ipURL+`/Elect-service/factElec/factElecsNP/entreprise=${id}`);
        setFactsNP(result.data);

    }

    const loadFactsRef = async (refAll) => {
        const result = await axios.get(ipURL+`/Elect-service/factElec/factElecs/entreprise=${id}/ref=${refAll}`)
        setFacts(result.data)

    }

    const loadFactsRefP = async (refAllP) => {
        const result = await axios.get(ipURL+`/Elect-service/factElec/factElecsP/entreprise=${id}/ref=${refAllP}`)
        setFactsP(result.data)

    }

    const loadFactsRefNP = async (refAllNP) => {
        const result = await axios.get(ipURL+`/Elect-service/factElec/factElecsNP/entreprise=${id}/ref=${refAllNP}`)
        setFactsNP(result.data)

    }
    const payerFacture = async (id) => {
        await axios.put(ipURL+`/Elect-service/factElec/paye/id=${id}`)
        loadFacts();
        loadFactsP();
        loadFactsNP();
    }

    const etat = (etat) => {
        if (etat == "Non payé") {
            return <span className="badge bg-label-danger me-1">Unpaid</span>;
        } else if (etat == "Payé") {
            return <span className="badge bg-label-success me-1">Paid</span>;
        }
    }

    const popPaye = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                payerFacture(id)
                console.log(email)
                sendEmail()
                
            }
        })
    }

    const sendEmail = () => {

        emailjs.send('service_2mv7gls', 'template_okra1hd', email, 'f0A2iZqeU98m_LvM2')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });

    };
    return (
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <div class="layout-page">
                    <Navbar />
                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="nav-align-top mb-4">
                                        <ul class="nav nav-tabs" role="tablist">
                                            <li class="nav-item">
                                                <button
                                                    type="button"
                                                    class="nav-link active"
                                                    role="tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#navs-top-home"
                                                    aria-controls="navs-top-home"
                                                    aria-selected="true"
                                                >
                                                    All bills
                                                </button>
                                            </li>
                                            <li class="nav-item">
                                                <button
                                                    type="button"
                                                    class="nav-link"
                                                    role="tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#navs-top-profile"
                                                    aria-controls="navs-top-profile"
                                                    aria-selected="false"
                                                >
                                                    Paid bills
                                                </button>
                                            </li>
                                            <li class="nav-item">
                                                <button
                                                    type="button"
                                                    class="nav-link"
                                                    role="tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#navs-top-messages"
                                                    aria-controls="navs-top-messages"
                                                    aria-selected="false"
                                                >
                                                    Unpaid bills
                                                </button>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <div class="tab-pane fade show active" id="navs-top-home" role="tabpanel">
                                                <div class="table-responsive text-nowrap" style={{ "overflow": "visible" }}>
                                                    <div class="input-group w-25 mx-auto">
                                                        <input type={'text'} class="form-control mx-2" placeholder='Search here' onChange={(e) => { loadFactsRef(e.target.value); }} />
                                                    </div>
                                                    <table class="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>Id</th>
                                                                <th>Year</th>
                                                                <th>Month</th>
                                                                <th>Amout</th>
                                                                <th>Status</th>
                                                                <th>Reference</th>
                                                                <th>Company</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="table-border-bottom-0" >
                                                            {
                                                                facts.map((fact, index) => (
                                                                    <tr>
                                                                        <td>{fact.factelec_id}</td>
                                                                        <td>{fact.annee}</td>
                                                                        <td>{fact.mois}</td>
                                                                        <td>{fact.montant} DH</td>
                                                                        <td>{etat(fact.etat)}</td>
                                                                        <td>{fact.client.ref}</td>
                                                                        <td>{fact.entreprise.nom}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="navs-top-profile" role="tabpanel">
                                                <div class="table-responsive text-nowrap" style={{ "overflow": "visible" }}>
                                                    <div class="input-group w-25 mx-auto">
                                                        <input type={'text'} class="form-control mx-2" placeholder='Search here' onChange={(e) => { loadFactsRefP(e.target.value); }} />
                                                    </div>
                                                    <table class="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>Id</th>
                                                                <th>Year</th>
                                                                <th>Month</th>
                                                                <th>Amout</th>
                                                                <th>Status</th>
                                                                <th>Reference</th>
                                                                <th>Company</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="table-border-bottom-0" >
                                                            {
                                                                factsP.map((fact, index) => (
                                                                    <tr>
                                                                        <td>{fact.factelec_id}</td>
                                                                        <td>{fact.annee}</td>
                                                                        <td>{fact.mois}</td>
                                                                        <td>{fact.montant} DH</td>
                                                                        <td>{etat(fact.etat)}</td>
                                                                        <td>{fact.client.ref}</td>
                                                                        <td>{fact.entreprise.nom}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="navs-top-messages" role="tabpanel">
                                                <div class="table-responsive text-nowrap" style={{ "overflow": "visible" }}>
                                                    <div class="input-group w-25 mx-auto">
                                                        <input type={'text'} class="form-control mx-2" placeholder='Search here' onChange={(e) => { loadFactsRefNP(e.target.value); }} />
                                                    </div>
                                                    <table class="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>Id</th>
                                                                <th>Year</th>
                                                                <th>Month</th>
                                                                <th>Amout</th>
                                                                <th>Status</th>
                                                                <th>Reference</th>
                                                                <th>Company</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="table-border-bottom-0" >
                                                            {
                                                                factsNP.map((fact, index) => (
                                                                    <tr>
                                                                        <td>{fact.factelec_id}</td>
                                                                        <td>{fact.annee}</td>
                                                                        <td>{fact.mois}</td>
                                                                        <td>{fact.montant} DH</td>
                                                                        <td>{etat(fact.etat)}</td>
                                                                        <td>{fact.client.ref}</td>
                                                                        <td>{fact.entreprise.nom}</td>
                                                                        <td>
                                                                            <button onClick={() => {

                                                                                email.client_email = `${fact.client.email}`;
                                                                                email.client_nom = `${fact.client.nom}`;
                                                                                email.client_prenom = `${fact.client.prenom}`;
                                                                                email.fact_montant = `${fact.montant}`;
                                                                                email.fact_date = `${fact.date}`;
                                                                                email.user_nom = `${fact.user.nom}`;
                                                                                email.user_prenom = `${fact.user.prenom}`;
                                                                                email.user_agence = `${fact.user.agence}`;

                                                                                popPaye(fact.factelec_id);

                                                                            }} class="btn btn-outline-primary" ><i class='bx bxs-dollar-circle'></i> Pay</button>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
