import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import Navbar from '../Water/Navbar';

export default function HomeAgent() {
    const [entreprises, setEntreprises] = useState([]);
    const ipURL=process.env.REACT_APP_URL;

    const { id } = useParams()

    useEffect(() => {
        loadEntreprises();
    }, []);
    
    const loadEntreprises = async () => {
        const result = await axios.get(ipURL+"/Elect-service/entreprise/entreprises");
        setEntreprises(result.data);
        console.log(result.data)
    }
    return (
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <div class="layout-page">
                    <Navbar />
                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
                            <div class="row mb-5">
                                {
                                    entreprises.map((entreprise, index) => (
                                        <div class="col-md-6 col-lg-4 mb-3">
                                            <div class="card h-100">
                                                <img class="card-img-top" src={'data:image/jpeg;base64,' + entreprise.logo} alt="Card image cap" width="250" height="250" />
                                                <div class="card-body">
                                                    <h5 class="card-title">{entreprise.nom}</h5>
                                                    <p style={{ minHeight: "100px", maxHeight: "100px" }} class="card-text">
                                                        {entreprise.descr}
                                                    </p>
                                                    <Link to={`/paiementFactureByEntreprise/${entreprise.elecEntreprise_id}`} class="btn btn-outline-warning">View bills</Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
