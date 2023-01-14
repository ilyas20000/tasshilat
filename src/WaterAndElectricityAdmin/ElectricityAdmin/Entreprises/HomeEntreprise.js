
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import SideBar from '../../WaterAdmin/Sidebar'
import Navbar from '../../../InternetAndPhone/components/Navbar';

export default function HomeEntreprise() {

    const [descr, setDescr] = React.useState('');
    const [nom, setNom] = React.useState('');
    const [logo, setLogo] = React.useState();
    const ipURL=process.env.REACT_APP_URL;


    const onSubmit = (e) => {
        e.preventDefault()
        console.log(nom)
        console.log(descr)
        console.log(logo)

        const formData = new FormData();
        formData.append('logo', logo);
        formData.append('nom', nom);
        formData.append('descr', descr);
        fetch(ipURL + '/Elect-service/entreprise/addEntreprise', {
            method: 'post',
            body: formData
        }).then(res => {
            if (res.ok) {
                loadEntreprises()
            }
        });
    };
    const [entreprises, setEntreprises] = useState([]);

    const { id } = useParams()

    useEffect(() => {
        loadEntreprises();
    }, []);

    const loadEntreprises = async () => {
        const result = await axios.get(ipURL+ "/Elect-service/entreprise/entreprises");
        setEntreprises(result.data);

    }

    const deleteEntreprise = async (id) => {
        await axios.delete(ipURL+ `/Elect-service/entreprise/deleteEntreprise/id=${id}`)
        loadEntreprises()
    }

    const popDel = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEntreprise(id)
                Swal.fire(
                    'Deleted!',
                    'The Entreprise has been deleted successfully.',
                    'success'
                )
            }
        })
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
                document.location = '/entreprise'
            }
        })
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
                                <div class="col-xxl">
                                    <div class="card mb-4">
                                        <div class="card-header d-flex align-items-center justify-content-between">
                                            <h5 class="mb-0">Add a new company</h5>
                                        </div>
                                        <div class="card-body">
                                            <form onSubmit={(e) => onSubmit(e)} enctype="multipart/form-data">
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Name of the company</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='nom' class="form-control" id="basic-default-name" onChange={(e) => { setNom(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-company">Logo</label>
                                                    <div class="col-sm-10">
                                                        <input
                                                            type={"file"}
                                                            name='logo'
                                                            class="form-control"
                                                            id="basic-default-company"
                                                            onChange={(e) => { setLogo(e.target.files[0]) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-message">Description</label>
                                                    <div class="col-sm-10">
                                                        <textarea
                                                            name='descr'
                                                            id="basic-default-message"
                                                            class="form-control"
                                                            onChange={(e) => { setDescr(e.target.value); }}
                                                        ></textarea>
                                                    </div>
                                                </div>
                                                <div class="row justify-content-end">
                                                    <div class="col-sm-10">
                                                        <button type="submit" class="btn btn-primary" onClick={() => popSuccess()}><i class='bx bx-save'></i>Save</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                                    <a onClick={() => popDel(entreprise.elecEntreprise_id)} class="btn btn-outline-danger"><i class="bx bx-trash me-1"></i> Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </div>

    )
}
