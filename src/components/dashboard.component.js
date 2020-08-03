import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Patient = props => (
    <tr>
      <td>{props.patient.name}</td>
      <td>{props.patient.email}</td>
      <td>{props.patient.dob.substring(0,10)}</td>
      <td>{props.patient.phonenumber}</td>
      <td>{props.patient.address}</td>
      <td>{props.patient.familysize}</td>
      <td>{props.patient.prescription}</td>
      <td>{props.patient.clinicID}</td>
      <td>
        <Link to={"/edit/"+props.patient._id}>edit</Link> | <a href="#" onClick={() => { props.deletePatient(props.patient._id) }}>delete</a>
    </td>
    </tr>
)
  
export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.deletePatient = this.deletePatient.bind(this)
        this.state = {patients: []};
    }

    //find clinic name that corresponds to each patient object's clinicID property objID value
    componentDidMount() {
        axios.get('http://localhost:5000/patients/')
          .then(response => {
            this.setState({ patients: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
    }

    deletePatient(id) {
        axios.delete('http://localhost:5000/patients/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          patients: this.state.patients.filter(el => el._id !== id)
        })
      }

    patientList() {
        return this.state.patients.map(currentpatient => {
          return <Patient patient={currentpatient} deletePatient={this.deletePatient} key={currentpatient._id}/>;
        })
      }

    render(){
        return(
            <>
            <section class="joinnetwork sec-apply">
                <div class="container">
                    <div class="row text-center">
                        <div class="col-md-12">
                            <div class="border-line text-center"></div>
                            <h1>DASHBOARD</h1>
                        </div>
                    </div>
                </div>
            </section>

            <div class="container">
                <div class="flip-sp">
                    <center>
                        <div class="icon">
                            <img src={require('./img/logo-small.png')} />
                        </div>
                    </center>
                </div>
            </div>

            <br></br>
            <div>    
                <table>
                    <thead>
                        <tr>
                            <th>PATIENT NAME</th>
                            <th>EMAIL</th>
                            <th>DATE OF BIRTH</th>
                            <th>PHONENUMBER</th>
                            <th>ADDRESS</th>
                            <th>FAMILY SIZE</th>
                            <th>PRESCRIPTION</th>
                            <th>CLINIC NAME</th>
                        </tr>
                    </thead>
                <tbody>
                    { this.patientList() }
                </tbody>
                </table>
            </div>
            </>         
        )
    }
}
