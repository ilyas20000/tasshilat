import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import SideBar from '../../WaterAdmin/Sidebar'
import Navbar from '../../../InternetAndPhone/components/Navbar';

export default function CreateFacture() {
    const [mois, setMois] = React.useState('');
    const [annee, setAnnee] = React.useState('');
    const [montant, setMontant] = React.useState('');
    const [client_id, setClientId] = React.useState('');
    const [entreprise_id, setEntrepriseId] = React.useState('');

    const [refAll, setRefAll] = React.useState('');
    const [refAllP, setRefAllP] = React.useState('');
    const [refAllNP, setRefAllNP] = React.useState('');
    const ipURL=process.env.REACT_APP_URL;


    const onSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('mois', mois);
        formData.append('annee', annee);
        formData.append('montant', montant);
        formData.append('client_id', client_id);
        formData.append('entreprise_id', entreprise_id);
        fetch(ipURL+ '/Elect-service/factElec/addFactElec', {
            method: 'post',
            body: formData
        }).then(res => {
            if (res.ok) {
                console.log(res);
            }
        });
    };

    const [facts, setFacts] = useState([]);
    const [factsP, setFactsP] = useState([]);
    const [factsNP, setFactsNP] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadFacts();
        loadFactsP();
        loadFactsNP();
        loadEntreprises();
        loadClients();
    }, []);

    const loadFacts = async () => {
        const result = await axios.get(ipURL+ "/Elect-service/factElec/factElecs");
        setFacts(result.data);

    }

    const loadFactsP = async () => {
        const result = await axios.get(ipURL + "/Elect-service/factElec/factElecsPaye");
        setFactsP(result.data);

    }

    const loadFactsNP = async () => {
        const result = await axios.get(ipURL+"/Elect-service/factElec/factElecsNonPaye");
        setFactsNP(result.data);

    }

    const loadFactsRef = async (refAll) => {
        const result = await axios.get(ipURL+ `/Elect-service/factElec/factElecs/ref=${refAll}`)
        setFacts(result.data)

    }

    const loadFactsRefP = async (refAllP) => {
        const result = await axios.get(ipURL+ `/Elect-service/factElec/factElecsP/ref=${refAllP}`)
        setFactsP(result.data)

    }

    const loadFactsRefNP = async (refAllNP) => {
        const result = await axios.get(ipURL+ `/Elect-service/factElec/factElecsNP/ref=${refAllNP}`)
        setFactsNP(result.data)

    }

    const [entreprises, setEntreprises] = useState([]);

    const loadEntreprises = async () => {
        const result = await axios.get(ipURL+ "/Elect-service/entreprise/entreprises");
        setEntreprises(result.data);

    }

    const [clients, setClients] = useState([]);

    const loadClients = async () => {
        const result = await axios.get(ipURL+ "/Elect-service/client/clients");
        setClients(result.data);
    }

    const popSuccess = () => {
        Swal.fire({
            title: 'Added!!',
            text: "The entreprise has been added successfully",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                document.location = '/addFacture'
            }
        })
    }

    const etat = (etat) => {
        if (etat == "Non payé") {
            return <span className="badge bg-label-danger me-1">Unpaid</span>;
        } else if (etat == "Payé") {
            return <span className="badge bg-label-success me-1">Paid</span>;
        }
    }

    return (
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <SideBar/>
                <div class="layout-page">
                <Navbar/>
                    
                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
                            <div class="row">
                                <div class="col-md-6 mx-auto">
                                    <div class="card mb-4">
                                        <div class="card-header d-flex align-items-center justify-content-center">
                                            <h5 class="mb-0">Add an invoice</h5>
                                        </div>
                                        <div class="card-body">
                                            <form onSubmit={(e) => onSubmit(e)}>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Month</label>
                                                    <div class="col-sm-10">
                                                        <select class="form-select placement-dropdown" name='mois' onChange={(e) => { setMois(e.target.value); }}>
                                                            <option ></option>
                                                            <option value="January">January</option>
                                                            <option value="February">February</option>
                                                            <option value="March">March</option>
                                                            <option value="April">April</option>
                                                            <option value="May">May</option>
                                                            <option value="June">June</option>
                                                            <option value="July">July</option>
                                                            <option value="August">August</option>
                                                            <option value="September">September</option>
                                                            <option value="October">October</option>
                                                            <option value="November">November</option>
                                                            <option value="December">December</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-company">Year</label>
                                                    <div class="col-sm-10">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            name='annee'
                                                            onChange={(e) => { setAnnee(e.target.value); }}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-email">Amount</label>
                                                    <div class="col-sm-10">
                                                        <div class="input-group input-group-merge">
                                                            <input
                                                                type="text"
                                                                id="basic-default-email"
                                                                class="form-control"
                                                                name='montant'
                                                                onChange={(e) => { setMontant(e.target.value); }}
                                                            />
                                                            <span id="basic-icon-default-email2" class="input-group-text">DH</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-email">Client</label>
                                                    <div class="col-sm-10">
                                                        <select class="form-select placement-dropdown" name='mois' onChange={(e) => { setClientId(e.target.value); }}>
                                                            <option></option>
                                                            {
                                                                clients.map((client, index) => (
                                                                    <option value={client.client_id} >{client.nom} {client.prenom}</option>
                                                                ))}

                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-phone">Company</label>
                                                    <div class="col-sm-10">
                                                        <select class="form-select placement-dropdown" name='mois' onChange={(e) => { setEntrepriseId(e.target.value); }}>
                                                            <option></option>
                                                            {
                                                                entreprises.map((entreprise, index) => (
                                                                    <option value={entreprise.elecEntreprise_id} >{entreprise.nom}</option>
                                                                ))}

                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row justify-content-center">
                                                    <div class="col-sm-4">
                                                        <button type="submit" class="btn btn-primary" onClick={() => popSuccess()}><i class='bx bx-save'></i> Save</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
