import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../InternetAndPhone/components/Sidebar';


export default function ProfilUser() {

    const [user, setUser] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        phone: "",
        agence: "",
        type: "",
        img: ""
    })
    const ipURL=process.env.REACT_APP_URL;


    const { id } = useParams();

    useEffect(() => {
        loadUser()
    }, []);

    const loadUser = async () => {
        const result = await axios.get(ipURL + `/Elect-service/user/user/id=${id}`)
        setUser(result.data)
        console.log(result.password)
    }

    return (
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <Sidebar/>
                <div class="layout-page">
                    
                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
                            <div class="row">
                                <div class="col-md-6 mx-auto">
                                    <div class="card mb-4">
                                        <h5 class="card-header">Profile Details</h5>
                                        <div class="card-body">
                                            <div class="d-flex justify-content-center">
                                                <img
                                                    src={'data:image/jpeg;base64,' + user.img}
                                                    alt="user-avatar"
                                                    class="d-block rounded"
                                                    height="100"
                                                    width="100"
                                                    id="uploadedAvatar"
                                                />
                                            </div>
                                        </div>
                                        <hr class="my-0" />
                                        <div class="card-body">
                                            <div class="row">

                                                <div class="mb-3 col-md-6">
                                                    <label for="lastName" class="form-label">First name</label>
                                                    <p>{user.prenom}</p>
                                                </div>
                                                <div class="mb-3 col-md-6">
                                                    <label for="firstName" class="form-label">Last name</label>
                                                    <p>{user.nom}</p>
                                                </div>
                                                <div class="mb-3 col-md-6">
                                                    <label for="email" class="form-label">Email</label>
                                                    <p>{user.email}</p>
                                                </div>
                                                <div class="mb-3 col-md-6">
                                                    <label class="form-label" for="phoneNumber">Phone</label>
                                                    <p>{user.phone}</p>
                                                </div>
                                                <div class="mb-3 col-md-6">
                                                    <label for="address" class="form-label">Agency</label>
                                                    <p>{user.agence}</p>
                                                </div>
                                                <div class="mb-3 col-md-6">
                                                    <label for="address" class="form-label">User type</label>
                                                    <p>{user.type}</p>
                                                </div>
                                            </div>
                                            <div class="mt-2">
                                                <Link class="btn btn-outline-primary me-2" to={"/user"}>Back</Link>
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
