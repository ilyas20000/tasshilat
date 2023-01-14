import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NavbarUser from '../pages/NavbarUser';

export default function EditUser() {

    const [nom, setNom] = React.useState('');
    const [prenom, setPrenom] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [agence, setAgence] = React.useState('');
    const [type, setType] = React.useState('');
    const [img, setImg] = React.useState();

    const onSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);
        formData.append('agence', agence);
        formData.append('type', type);
        formData.append('img', img);
        fetch(process.env.React_App_URLd + 'user/updateUser/id=4', {
            method: 'PUT',
            body: formData
        }).then(res => {
            if (res.ok) {
                console.log(res);
                alert("Hello")
            }
        });
    };

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


    const { id } = useParams();

    useEffect(() => {
        loadUser()
    }, []);

    const loadUser = async () => {
        const result = await axios.get(process.env.React_App_URLd + `user/user/id=${id}`)
        setUser(result.data)

    }

    return (
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <div class="layout-page">
                    <NavbarUser />
                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
                            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Account Settings /</span> Account</h4>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card mb-4">
                                        <form onSubmit={(e) => onSubmit(e)} enctype="multipart/form-data">
                                            <h5 class="card-header">Profile Details</h5>
                                            <div class="card-body">
                                                <div class="d-flex align-items-start align-items-sm-center gap-4">
                                                    <img
                                                        src={'data:image/jpeg;base64,' + user.img}
                                                        alt="user-avatar"
                                                        class="d-block rounded"
                                                        height="100"
                                                        width="100"
                                                        id="uploadedAvatar"
                                                    />
                                                    <div class="button-wrapper">
                                                        <label for="upload" class="btn btn-primary me-2 mb-4" tabindex="0">
                                                            <span class="d-none d-sm-block">Upload new photo</span>
                                                            <i class="bx bx-upload d-block d-sm-none"></i>
                                                            <input
                                                                type={"file"}
                                                                id="upload"
                                                                name='img'
                                                                class="account-file-input"
                                                                hidden
                                                                accept="image/png, image/jpeg"
                                                                onChange={(e) => { setImg(e.target.files[0]) }}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr class="my-0" />
                                            <div class="card-body">

                                                <div class="row">
                                                    <div class="mb-3 col-md-6">
                                                        <label for="firstName" class="form-label">Nom</label>
                                                        <input
                                                            class="form-control"
                                                            type={"text"}
                                                            id="firstName"
                                                            name="nom"

                                                            autofocus
                                                            onChange={(e) => { setNom(e.target.value); }}
                                                        />
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label for="lastName" class="form-label">Prénom</label>
                                                        <input class="form-control" type={"text"} name="prenom" id="lastName"
                                                            onChange={(e) => { setPrenom(e.target.value); }} />
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label for="email" class="form-label">E-mail</label>
                                                        <input class="form-control" type={"text"} name="email"
                                                            onChange={(e) => { setEmail(e.target.value); }} />
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label for="organization" class="form-label">Password</label>
                                                        <input
                                                            type={"password"}
                                                            class="form-control"
                                                            id="organization"
                                                            name="password"

                                                            onChange={(e) => { setPassword(e.target.value); }}
                                                        />
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label class="form-label" for="phoneNumber">Téléphone</label>
                                                        <div class="input-group input-group-merge">
                                                            <input
                                                                type={"text"}
                                                                id="phoneNumber"
                                                                name='phone'
                                                                class="form-control"
                                                                onChange={(e) => { setPhone(e.target.value); }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label for="address" class="form-label">Agence</label>
                                                        <input type={"text"} class="form-control" id="address" name="agence"
                                                            onChange={(e) => { setAgence(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <button type="submit" class="btn btn-primary me-2">Save changes</button>
                                                    <Link to={'/user'} class="btn btn-outline-secondary">Annuler</Link>
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
    )
}
