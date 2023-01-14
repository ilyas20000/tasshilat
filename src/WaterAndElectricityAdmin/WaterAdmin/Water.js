/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../WaterAdmin/Sidebar';
import Navbar from '../../InternetAndPhone/components/Navbar';



class Water extends Component {
  state = {
    data: [],
    loading: true,
    formData: {
      name: '',
      image: ''
    }
  }

  handleChange = (event) => {
    const target = event.target.value;
    //const name = target.name;

    this.setState({
      formData: {
        ...this.state.formData,
        name: target
      }
    });
    console.log(this.state);
  }

  handleImageChange = (event) => {
    // Get the selected image file
    const image = event.target.files[0];

    // Update the formData state with the selected image
    this.setState({
      formData: {
        ...this.state.formData,
        image
      }
    });
  }



  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', this.state.formData.name);
    formData.append('image', this.state.formData.image);

    axios.post(process.env.REACT_APP_URL+'/water/fournisseur/addFournisseur', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
      });
  }


  componentDidMount() {
    fetch(process.env.REACT_APP_URL+'/water/fournisseur/allFournisseur')
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data,
          loading: false
        });

      })
      .catch(error => {
        console.error(error);
      });
  }


  deleteData = (itemToDelete) => {
    axios.delete(process.env.REACT_APP_URL+`/water/fournisseur/delete/${itemToDelete.id_fournisseur}`)
      .then(res => {
        // update your component's state or perform some other action
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
      });
  }






  render() {
    const { data, loading } = this.state;



    // if (loading) {
    //   return <p>Loading data...</p>;
    // }
    return (

      <>
        <div class="layout-wrapper layout-content-navbar">
          <div class="layout-container">
            <Sidebar />
            <div class="layout-page">
            <Navbar/>
              <div class="container-xxl flex-grow-1 container-p-y  ">
                <div class="col-xl">
                  <div class="card mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                      <h5 class="mb-0">Basic with Icons</h5>
                      <small class="text-muted float-end">Merged input group</small>
                    </div>
                    <div class="card-body">
                      <form onSubmit={this.handleSubmit}>

                        <div class="mb-3">
                          <label class="form-label" for="basic-icon-default-company">Nom</label>
                          <div class="input-group input-group-merge">
                            <span id="basic-icon-default-company2" class="input-group-text"
                            ><i class="bx bx-buildings"></i></span>
                            <input
                              type="text"
                              id="name"
                              class="form-control"
                              placeholder="name"
                              aria-label="ACME Inc."
                              aria-describedby="basic-icon-default-company2"
                              name="name"
                              onChange={this.handleChange} />

                          </div>
                        </div>


                        <div class="mb-3">
                          <label for="formFile" class="form-label">Default file input example</label>
                          <input class="form-control" type="file" name="image"
                            onChange={this.handleImageChange} />
                        </div>
                        <button type="submit" value="submit" class="btn btn-primary">Send</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="card">


                  <div class="container-xxl flex-grow-1 container-p-y">
                    <h6 class="pb-1 mb-4 text-muted">Entreprise</h6>
                    <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
                      {data.map(item => (
                        <div class="col">
                          <div class="card h-100">
                            <div class="card-img-top" style={{ "height": "200px", "maxHeight": "200px", "background-size": "auto 100%", "background-position": "50%", "background-repeat": "no-repeat", "background-image": 'url(' + item.image + ')', }}></div>
                            <div class="card-body">
                              <h5 class="card-title">{item.name}</h5>
                              <p class="card-text">



                              </p>
                              <a class="btn btn-outline-primary" href={`/Factures/${item.id_fournisseur}`}><i class="bx bx-food-menu"></i>  Bills</a>

                              <div class="dropdown float-end">
                                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                  <i class="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div class="dropdown-menu ">
                                 <button class="dropdown-item" onClick={() => this.deleteData(item)}><i class="bx bx-trash me-1"></i>Delete</button> 
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>


    )
  }
} export default Water
