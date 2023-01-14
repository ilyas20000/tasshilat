import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    render() {
        return (
            <div>
            <footer className="content-footer footer bg-footer-theme">
  <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
    <div className="mb-2 mb-md-0">
      ©
      , All right reseved
      <a href="/" alt="_blank" className="footer-link fw-bolder"> ❤️</a>
    </div>
    <div>
      <a href="/House_Car_Insurance" alt="_blank" className="footer-link me-4">Sv</a>
    </div>
  </div>
</footer>

            </div>

        );
    }
}

export default FooterComponent;