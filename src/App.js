import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import './App.css';

//University Routes
import Universitybills from './University/pages/UniversityAdmin/Universitybills';
import Universityindex from './University/pages/UniversityAdmin/Universityindex';
import Universitybillsindex from './University/pages/UniversityAdmin/Universitybillsindex';
import UniversityService from './University/pages/UniversityService/UniversityService';
import UniversityDashboard from './University/pages/UniversityAdmin/UniversityDashboard';
import React, { Component } from 'react';
import UniversityServiceBillsPage from './University/pages/UniversityService/UniversityServiceBillsPage';
import HomeUser from './WaterAndElectricityAdmin/ElectricityAdmin/Users/HomeUser';

//Internet And Phone
import Operator from './InternetAndPhone/pages/Admin/Operator/Operator';
import AddOperator from './InternetAndPhone/pages/Admin/Operator/AddOperator';
import Phone from './InternetAndPhone/pages/Admin/Phone/Phone';
import Internet from './InternetAndPhone/pages/Admin/Internet/Internet';
import AddPhone from './InternetAndPhone/pages/Admin/Phone/AddPhone';
import AddInternet from './InternetAndPhone/pages/Admin/Internet/AddInternet';
import Client from './InternetAndPhone/pages/Admin/Wifi/Client/Client';
import AddClient from './InternetAndPhone/pages/Admin/Wifi/Client/AddClient';
import Wifi from './InternetAndPhone/pages/Admin/Wifi/Bill/Wifi';
import AddWifi from './InternetAndPhone/pages/Admin/Wifi/Bill/AddWifi';
import Login from './InternetAndPhone/pages/Login/Login';
import Home from './InternetAndPhone/pages/User/Home';
import Dashboard from './InternetAndPhone/pages/Admin/Dashboard';
import Main from './InternetAndPhone/pages/Login/Main';
import UserPhone from './InternetAndPhone/pages/User/Phone-Internet/UserPhone';
import UserInternet from './InternetAndPhone/pages/User/Phone-Internet/UserInternet';
import UserWifi from './InternetAndPhone/pages/User/Phone-Internet/UserWifi';
import PIHome from './InternetAndPhone/pages/User/Phone-Internet/PIHome';
import Navbar from './InternetAndPhone/components/Navbar';
import NavbarUser from './InternetAndPhone/components/NavbarUser';

import { StrictMode } from 'react';
import HomeEntreprise from './WaterAndElectricityAdmin/ElectricityAdmin/Entreprises/HomeEntreprise';
import EditEntreprise from './WaterAndElectricityAdmin/ElectricityAdmin/Entreprises/EditEntreprise';
import HomeClient from './WaterAndElectricityAdmin/ElectricityAdmin/Clients/HomeClient';
import EditClient from './WaterAndElectricityAdmin/ElectricityAdmin/Clients/EditClient';
import CreateFacture from './WaterAndElectricityAdmin/ElectricityAdmin/Factures/CreateFacture';
import Water from './WaterAndElectricityAdmin/WaterAdmin/Water'
import Factures from './WaterAndElectricityAdmin/WaterAdmin/Factures'

import PaiementByEntreprise from './WaterAndElectricityService/WaterAndElectricity/Electricity/PaiementByEntreprise'
import Recu from './WaterAndElectricityService/WaterAndElectricity/Electricity/Recu'
import HomeAgent from './WaterAndElectricityService/WaterAndElectricity/Electricity/HomeAgent'
import Choise from './WaterAndElectricityService/WaterAndElectricity/Water/Choise'
import RecuW from './WaterAndElectricityService/WaterAndElectricity/Water/RecuW'
import Reference from './WaterAndElectricityService/WaterAndElectricity/Water/Reference'




//### Insurance 

import ListHouseComponent from './components/ListHouseComponent'
import ListCarComponent from './components/ListCarComponent'

import AddHouseComponent from './components/AddHouseComponent';
import UpdateHouseComponent from './components/UpdateHouseComponent';
import AddCarComponent from './components/AddCarComponent';
import UpdateCarComponent from './components/UpdateCarComponent';

import ListFaceurComponent from './components/ListFaceurComponent';
import Print from './components/Print';
import PCar from './components/PCar';
import DashboardComponent from './components/DashboardComponent';
import ServiceComponent from './components/ServiceComponent';
import ServicePayComponent from './components/ServicePayComponent';
import PH_S from './components/PH_S';
import PC_S from './components/PC_S';

import MainComponent from './components/MainComponent';
import ProfilUser from './WaterAndElectricityAdmin/ElectricityAdmin/Users/ProfilUser';

// fin insurance

function App() {
  if (sessionStorage.getItem("user") != null) {
    if (JSON.parse(sessionStorage.getItem("user")).type == "admin") {
      return (

        <>
        
          <Routes>

            <Route exact path="/" element={<Dashboard />} />

            <Route exact path="/login" element={<Login />} />

            <Route exact path="/operator" element={<Operator />} />
            <Route exact path="/operator/add" element={<AddOperator />} />

            <Route exact path="/phone" element={<Phone />} />
            <Route exact path="/phone/add" element={<AddPhone />} />

            <Route exact path="/internet" element={<Internet />} />
            <Route exact path="/internet/add" element={<AddInternet />} />

            <Route exact path="/wifi/clients" element={<Client />} />
            <Route exact path="/wifi/clients-add" element={<AddClient />} />

            <Route exact path="/wifi/bills" element={<Wifi />} />
            <Route exact path="/wifi/bills-add" element={<AddWifi />} />

            <Route exact path="/home" element={<Home />} />

            {/*  University */}

            <Route path='/admin/university/' element={<Universityindex />} />
            <Route path='/admin/university/dashboard' element={<UniversityDashboard />} />
            <Route path='/admin/universities-bills' element={<Universitybillsindex />} />
            <Route path='/admin/university/:university_id/bills' element={<Universitybills />} />


            <Route exact path='/water' element={<Water />} />
            <Route exact path='/Factures/:id' element={<Factures />} />
            {/* <Route exact path='/Dashbord' element={<Dashboard />} /> */}


            <Route exact path="/entreprise" element={<HomeEntreprise />} />
            <Route exact path="/editentreprise" element={<EditEntreprise />} />

            <Route exact path="/client" element={<HomeClient />} />
            <Route exact path="/editclient/:id" element={<EditClient />} />



            <Route exact path="/addfacture" element={<CreateFacture />} />


            <Route exact path='/water' element={<Water />} />

            <Route exact path='/user' element={<HomeUser/>} />
            <Route exact path='/user/profil/:id' element={<ProfilUser/>} />

         {/*  insurance */}
              <Route path='/Addcar' exact element={<AddCarComponent/>}></Route>
              <Route path='/House_Car_Insurance' exact element={<ServiceComponent/>}></Route>
              <Route path='/House_Car_Insurance/:id' exact element={<ServicePayComponent/>}></Route>
              <Route path='/dashboard' exact element={<DashboardComponent/>}></Route>
              <Route path='/p/:id' exact element={<Print/> }></Route>
              <Route path='/pHs/:id' exact element={<PH_S/> }></Route>
              <Route path='/pCar/:id' exact element={<PCar/> }></Route>
              <Route path='/pCs/:id' exact element={<PC_S/> }></Route>
              <Route path='/houses' exact element={<ListHouseComponent/>}></Route>
              <Route path='/addHouse' exact element={<AddHouseComponent/>}></Route>
              <Route path='/updateHouse/:house_id' exact element={<UpdateHouseComponent/>}></Route>
              <Route path='/cars' exact element={<ListCarComponent/>}></Route>
              <Route path='/factory_entrobrise/:id' exact element={<ListFaceurComponent/>}></Route>
              <Route path='/factory_entrobrise/:id/:billId' exact element={<ListFaceurComponent/>}></Route>
             
              <Route path='/factureM' exact element={<MainComponent/> }></Route>
              <Route path='/factureM/:id' exact element={<MainComponent/>}>
                
              </Route>
              <Route path='/updateCar/:car_id' exact element={<UpdateCarComponent/>}></Route>
          {/* fin  insurance */}

         </Routes>


        </>


      );
    } else if (JSON.parse(sessionStorage.getItem("user")).type == "user") {
      return (
        <>




          {/* <NavbarUser/> */}
          <Routes>

            <Route exact path='/Reference' element={<Reference />} />
            <Route exact path='/Recu/:id_bill' element={<RecuW />}></Route>
            <Route exact path='/Choise' element={<Choise />}></Route>

            <Route exact path="/homeAgent" element={<HomeAgent />} />
            <Route exact path="/recue/:id" element={<Recu />} />
            <Route exact path="/paiementFactureByEntreprise/:id" element={<PaiementByEntreprise />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/phone-internet/phone" element={<UserPhone />} />
            <Route exact path="/phone-internet/internet" element={<UserInternet />} />
            <Route exact path="/phone-internet/wifi" element={<UserWifi />} />
            <Route exact path="/phone-internet" element={<PIHome />} />

            {/*  University */}
            <Route path='/universityService' element={<UniversityService />} />
            <Route path='/universityService-bills/:university_id' element={<UniversityServiceBillsPage />} />
         
             {/*  end University */}



          {/*  Insurance */}
              <Route path='/p/:id' exact element={<Print />}></Route>
              <Route path='/pHs/:id' exact element={<PH_S />}></Route>
              <Route path='/pCar/:id' exact element={<PCar />}></Route>
              <Route path='/pCs/:id' exact element={<PC_S />}></Route>
              <Route path='/House_Car_Insurance' exact element={<ServiceComponent/>}></Route>
              <Route path='/House_Car_Insurance/:id' exact element={<ServicePayComponent/>}></Route>
          {/*  end Insurance */}

 </Routes>
        </>


      );
    }
  } else {
    return (

      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Main />} />
      </Routes>


    );
  }


}

export default App;
