import * as React from 'react';
import Swal from 'sweetalert2'

export default function Form(){
    const [description,setDescription] = React.useState('')
    const [nom,setNom] = React.useState('')
    const [site,setSite] = React.useState('')
    const [video,setVideo] = React.useState('')
    const [logo,setLogo] = React.useState()
    const ipURL = process.env.REACT_APP_URL

    const onSubmit =  (e)=>{
        e.preventDefault()
   
       const formData = new FormData();
        formData.append('logo', logo);
        formData.append('nom', nom);
        formData.append('site', site);
        formData.append('video', video);
        formData.append('description', description);
        fetch(ipURL+'/Univ-service/api/university/saveUniversity', {
            method: 'post',
            body: formData
        }).then(res => {
            if(res.ok) {
                console.log(res);
                 popUp()
            }
        });

       
        
    }

    const popUp= ()=>{
      Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
  }

    return(
      
      <>  
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">University/</span> Form & List Of Universities</h4>

       <div className="row">
                
     
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">University Form</h5>
             
            </div>
            <div className="card-body">
              <form onSubmit={(e)=>{onSubmit(e)}} enctype="multipart/form-data">
               
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" for="basic-icon-default-company">Name</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-company2" className="input-group-text"
                        ><i className="bx bx-buildings"></i
                      ></span>
                      <input
                        type={"text"}
                        id="basic-icon-default-company"
                        className="form-control"
                        name='nom'
                        placeholder="ACME Inc."
                        aria-label="ACME Inc."
                        aria-describedby="basic-icon-default-company2"
                        onChange={(e)=>{setNom(e.target.value);console.log(e.target.value)}}
                      />
                    </div>
                  </div>
                </div>
               
                
                <div className="row mb-3">
                  <label className="col-sm-2 form-label" for="basic-icon-default-message">Description</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-message2" className="input-group-text"
                        ><i className="bx bx-comment"></i
                      ></span>
                      <textarea
                        id="basic-icon-default-message"
                        className="form-control"
                        aria-describedby="basic-icon-default-message2"
                        name='description'
                        onChange={(e)=>{setDescription(e.target.value);console.log(e.target.value)}}
                      ></textarea>
                    </div>
                  </div>
                </div>

                
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" for="basic-icon-default-company">Site URL</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-company2" className="input-group-text"
                        ><i class='bx bx-code-curly'></i></span>
                      <input
                        type={"text"}
                        id="basic-icon-default-company"
                        className="form-control"
                        name='site'
                        placeholder="www.university.about...com"
                        aria-label="ACME Inc."
                        aria-describedby="basic-icon-default-company2"
                        onChange={(e)=>{setSite(e.target.value);console.log(e.target.value)}}
                      />
                    </div>
                  </div>
                </div>


                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" for="basic-icon-default-company">Video URL</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-company2" className="input-group-text"
                        ><i class='bx bxl-youtube'></i></span>
                      <input
                        type={"text"}
                        id="basic-icon-default-company"
                        className="form-control"
                        name='video'
                        placeholder="www.youtube...com"
                        aria-label="ACME Inc."
                        aria-describedby="basic-icon-default-company2"
                        onChange={(e)=>{setVideo(e.target.value);console.log(e.target.value)}}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-sm-2 form-label" for="basic-icon-default-message">Logo</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                        <input class="form-control" type={"file"} id="formFile"  name='logo' onChange={(e)=>{setLogo(e.target.files[0])}}/>
                    </div>
                  </div>
                </div>

               
                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">Send</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </>
   
      
      );
       
 
}