import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class CreatePatient extends Component {
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDOB = this.onChangeDOB.bind(this)
        this.onChangePhonenumber = this.onChangePhonenumber.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeFamilySize = this.onChangeFamilySize.bind(this);
        this.onChangePrescription = this.onChangePrescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            dob: new Date(),
            phonenumber: 0,
            address: '',
            familysize: '',
            prescription: '',
            clinicID: null,
            prescriptions: [],
        }
    }


    componentDidMount() {
        axios.get('http://localhost:5000/clinics/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                prescriptions: response.data.map(med => med.prescription),
                prescription: response.data[0].prescription,
                //clinicID: response.data[0]._id
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    onChangeDOB(dob){
        this.setState({
            dob: dob
        })
    }

    onChangePhonenumber(e){
        this.setState({
            phonenumber: e.target.value
        })
    }

    onChangeAddress(e){
        this.setState({
            address: e.target.value
        })
    }

    onChangeFamilySize(e){
        this.setState({
            familysize: e.target.value
        })
    }

    onChangePrescription(e){
        this.setState({
            prescription: e.target.value
        })
    }


    exportPatient() {
        return {
          name: this.state.name,
          email: this.state.email,
          dob: this.state.dob,
          phonenumber: this.state.phonenumber,
          address: this.state.address,
          familysize: this.state.familysize,
          prescription: this.state.prescription,
          clinicID: this.state.clinicID
        }
      }
      
      
      isCurrentClinic = clinic => {
        return clinic.prescription.localeCompare(this.state.prescription) === 0;
      }
      
      setClinicID = async() => {
        const url = 'http://localhost:5000/clinics/';
        const { data: clinics } = await axios.get(url);
      
        const clinic = clinics.find(clinic => this.isCurrentClinic(clinic));
        this.setState({ clinicID: clinic.name });
      }
      
      addPatient = async() => {
        const url = 'http://localhost:5000/patients/add';
        const { data } = await axios.post(url, this.exportPatient())
      }

      async onSubmit(e) {
        e.preventDefault();
      
        try {
          await this.setClinicID();
          await this.addPatient();
        } catch (error) {
          console.log(error);
        }
        window.location = '/matching';
      }

    render(){
        return(
            <>
                <section class="joinnetwork sec-apply">
                    <div class="container">
                        <div class="row text-center">
                            <div class="col-md-12">
                                <div class="border-line text-center"></div>
                                <h1>SIGN UP</h1>
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

                <section class="contact-section area-padding">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <form class="form-contact contact_form" onSubmit={this.onSubmit} >
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <input class="form-control" name="name" id="name" type="text" placeholder="NAME" value={this.state.name} onChange={this.onChangeName}/>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <input class="form-control" name="email" id="email" type="email" placeholder="EMAIL" value={this.state.email} onChange={this.onChangeEmail}/>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <label>DATE OF BIRTH: </label>
                                                <div>
                                                    <DatePicker
                                                    selected={this.state.dob}
                                                    onChange={this.onChangeDOB}
                                                    />
                                                </div>
                                                <br/>
                                        </div>
                                        
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <input class="form-control" name="phone" id="phone" type="text" placeholder="PHONE NUMBER" value={this.state.phonenumber} onChange={this.onChangePhonenumber}/>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <input class="form-control" name="address" id="address" type="text" placeholder="FULL ADDRESS" value={this.state.address} onChange={this.onChangeAddress}/>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <input class="form-control" name="famsize" id="famsize" type="text" placeholder="FAMILY SIZE (INCLUDING YOU)" value={this.state.familysize} onChange={this.onChangeFamilySize}/>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                            <select ref="userInput"
                                                    required
                                                    className="form-control"
                                                    value={this.state.prescription}
                                                    onChange={this.onChangePrescription}>
                                                    {
                                                        this.state.prescriptions.map(function(prescription) {
                                                        return <option 
                                                            key={prescription}
                                                            value={prescription}>{prescription}
                                                            </option>;
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group mt-3 text-center">
                                            <button type="submit" class="button button-contactForm">SUBMIT</button>
                                        </div>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </>         
        )
    }
}