import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import SideBar from '../../WaterAdmin/Sidebar'
import Navbar from '../../../InternetAndPhone/components/Navbar'


export default function HomeClient() {
    let navigate = useNavigate()
    const ipURL=process.env.REACT_APP_URL;

    const [client, setClient] = useState({
        nom: "",
        prenom: "",
        email: "",
        number: "",
        ref: ""
    })

    const { nom, prenom, email, number, ref } = client

    const onInputChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(ipURL+ "/Elect-service/client/addClient", client)
        navigate("/client");
    };

    const [clients, setClients] = useState([]);

    const { id } = useParams()

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        const result = await axios.get(ipURL+ "/Elect-service/client/clients");
        setClients(result.data);
    }

    const deleteClient = async (id) => {
        await axios.delete(ipURL+ `/Elect-service/client/deleteClient/id=${id}`)
        loadClients()
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
                deleteClient(id)
                Swal.fire(
                    'Deleted!',
                    'The client has been deleted successfully.',
                    'success'
                )
            }
        })
    }

    const popSuccess = () => {
        Swal.fire({
            title: 'Added!!',
            text: "The client has been added successfully",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                document.location = '/client'
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
                                            <h5 class="mb-0">Add a new client</h5>
                                        </div>
                                        <div class="card-body">
                                            <form onSubmit={(e) => onSubmit(e)}>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">First name</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='prenom' class="form-control" id="basic-default-name" value={prenom} onChange={(e) => onInputChange(e)} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Last name</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='nom' class="form-control" id="basic-default-name" value={nom} onChange={(e) => onInputChange(e)} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Email</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='email' class="form-control" id="basic-default-name" value={email} onChange={(e) => onInputChange(e)} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Phone</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='number' class="form-control" id="basic-default-name" value={number} onChange={(e) => onInputChange(e)} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Reference</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='ref' class="form-control" id="basic-default-name" value={ref} onChange={(e) => onInputChange(e)} />
                                                    </div>
                                                </div>
                                                <div class="row justify-content-end">
                                                    <div class="col-sm-10">
                                                        <button type="submit" class="btn btn-primary" onClick={() => { popSuccess() }}><i class='bx bx-save'></i> Save</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <h5 class="card-header">Liste des clients</h5>
                                <div class="table-responsive text-nowrap" style={{ "overflow": "visible" }}>
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>First name</th>
                                                <th>Last name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Reference</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody class="table-border-bottom-0" >
                                            {
                                                clients.map((client, index) => (
                                                    <tr>
                                                        <td>{client.client_id}</td>
                                                        <td>{client.prenom}</td>
                                                        <td>{client.nom}</td>
                                                        <td>{client.email}</td>
                                                        <td>{client.number}</td>
                                                        <td>{client.ref}</td>
                                                        <td>
                                                            <div class="dropdown">
                                                                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                    <i class="bx bx-dots-vertical-rounded"></i>
                                                                </button>
                                                                <div class="dropdown-menu">
                                                                    <Link class="dropdown-item" to={`/editClient/${client.client_id}`}><i class="bx bx-edit-alt me-1"></i>Edit</Link>
                                                                    <a class="dropdown-item" onClick={() => popDel(client.client_id)}><i class="bx bx-trash me-1"></i> Delete</a>
                                                                </div>
                                                            </div>
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
                </div >
            </div>
        </div>
    )
}
