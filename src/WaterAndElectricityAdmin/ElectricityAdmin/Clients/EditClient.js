import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from '../../../InternetAndPhone/components/Navbar'
import SideBar from '../../WaterAdmin/Sidebar'


export default function EditClient() {

    let navigate = useNavigate()
    const ipURL=process.env.REACT_APP_URL;


    const { id } = useParams()

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
    };

    useEffect(() => {
        loadClient()
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(ipURL+`/Elect-service/client/updateClient/id=${id}`, client)

    };

    const loadClient = async () => {
        const result = await axios.get(ipURL + `/Elect-service/client/client/id=${id}`)
        setClient(result.data)
    }

    const pop = () => {
        Swal.fire(
            'Updated!',
            'The client has been updated successfully.',
            'success'
        ).then((result) => {
            if (result.isConfirmed) {
                document.location = '/client';
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
                                            <h5 class="mb-0">Edit client</h5>
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
                                                        <button type="submit" class="btn btn-primary" onClick={() => pop()}><i class='bx bx-save'></i> Save</button>
                                                    </div>
                                                </div>
                                            </form>
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
