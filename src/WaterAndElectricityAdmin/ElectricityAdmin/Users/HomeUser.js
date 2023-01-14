import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import Sidebar from '../../../InternetAndPhone/components/Sidebar';


export default function HomeUser() {
    const ipURL=process.env.REACT_APP_URL;
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
        fetch(ipURL+'/Elect-service/user/addUser', {
            method: 'post',
            body: formData
        }).then(res => {
            if (res.ok) {
                console.log(res);
            }
        });
    };

    const [users, setUsers] = useState([]);

    const { id } = useParams()

    useEffect(() => {
        loadUsers();
    }, []);
    


    const loadUsers = async () => {
        const result = await axios.get(ipURL + "/Elect-service/user/users");
        setUsers(result.data);

    }

    const deleteUser = async (id) => {
        await axios.delete(ipURL + `/Elect-service/user/deleteUser/id=${id}`)
        loadUsers()
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
                deleteUser(id)
                Swal.fire(
                    'Deleted!',
                    'The user has been deleted successfully.',
                    'success'
                )
            }
        })
    }

    const popSuccess = () => {
        Swal.fire({
            title: 'Added!!',
            text: "The user has been added successfully",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                document.location = '/user'
            }
        })
    }



    return (
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <Sidebar/>
                <div class="layout-page">
                    
                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
                            <div class="row">
                                <div class="col-xxl">
                                    <div class="card mb-4">
                                        <div class="card-header d-flex align-items-center justify-content-center">
                                            <h5 class="mb-0">Ajouter un Agent</h5>
                                        </div>
                                        <div class="card-body">
                                            <form onSubmit={(e) => onSubmit(e)} enctype="multipart/form-data">

                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">First name</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='prenom' class="form-control" id="basic-default-name" onChange={(e) => { setPrenom(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Last name</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='nom' class="form-control" id="basic-default-name" onChange={(e) => { setNom(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-company">Picture</label>
                                                    <div class="col-sm-10">
                                                        <input
                                                            type={"file"}
                                                            name='img'
                                                            class="form-control"
                                                            id="basic-default-company"
                                                            onChange={(e) => { setImg(e.target.files[0]) }}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Email</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='email' class="form-control" id="basic-default-name" onChange={(e) => { setEmail(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Password</label>
                                                    <div class="col-sm-10">
                                                        <input type={"password"} name='password' class="form-control" id="basic-default-name" onChange={(e) => { setPassword(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Phone</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='phone' class="form-control" id="basic-default-name" onChange={(e) => { setPhone(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Agency</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='agence' class="form-control" id="basic-default-name" onChange={(e) => { setAgence(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="row justify-content-end">
                                                    <div class="col-sm-6 justify-content-center">
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
                                    users.map((user, index) => (
                                        <div class="col-md-6 col-lg-4 mb-3">
                                            <div class="card h-100">
                                                <img class="card-img-top" src={'data:image/jpeg;base64,' + user.img} alt="Card image cap" width="350" height="350" />
                                                <div class="card-body">
                                                    <h5 class="card-title">{user.prenom} {user.nom}</h5>
                                                    <p class="card-text">
                                                        {user.email}
                                                    </p>
                                                    <Link to={`/user/profil/${user.user_id}`} class="btn btn-outline-primary " style={{ margin: 3 }}><i class='bx bx-detail'></i>Profil</Link>
                                                    <Link to={`/user/edit/${user.user_id}`} class="btn btn-outline-warning" style={{ margin: 3 }}><i class="bx bx-edit-alt me-1"></i>Edit</Link>
                                                    <button onClick={() => popDel(user.user_id)} class="btn btn-outline-danger" style={{ margin: 3 }}><i class="bx bx-trash me-1"></i>Delete</button>
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
