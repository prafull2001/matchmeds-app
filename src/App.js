import React from 'react';
import "./components/css/bootstrap.css";
import "./components/css/themify-icons.css"
import "./components/css/flaticon.css"
import "./components/vendors/animate-css/animate.css"
import "./components/css/style.css"
import "./components/css/responsive.css"


//npm install this in your workspace:
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from "./components/navbar.component"
import EditPatient from "./components/edit-patient.component";
import CreatePatient from "./components/create-patient.component";
import CreateClinic from "./components/create-clinic.component";
import Dashboard from "./components/dashboard.component";



function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/register" component={CreatePatient} />
      <Route path="/join" component={CreateClinic} />
      <Route path="/edit/:id" component={EditPatient} />
      <Route path="/matching" component={Dashboard} />
      </div>
    </Router>
  );
}

export default App;