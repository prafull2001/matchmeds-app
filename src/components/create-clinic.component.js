import React, { Component } from 'react';
import axios from 'axios';


export default class CreateClinic extends Component {
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhonenumber = this.onChangePhonenumber.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePrescription = this.onChangePrescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            phonenumber: 0,
            address: '',
            prescription: ''

        }
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

    onChangePrescription(e){
        this.setState({
            prescription: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const clinic = {
            name: this.state.name,
            email: this.state.email,
            phonenumber: this.state.phonenumber,
            address: this.state.address,
            prescription: this.state.prescription
        }

        console.log(clinic);

        axios.post('http://localhost:5000/clinics/add', clinic)
            .then(res => console.log(res.data));
            
        this.setState = {
            name: '',
            email: '',
            phonenumber: 0,
            address: '',
            prescription: ''

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
                    <h1>JOIN OUR NETWORK</h1>
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
                                    <input class="form-control" name="name" id="name" type="text" placeholder="ORGANIZATION" value={this.state.name} onChange={this.onChangeName}/>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <input class="form-control" name="email" id="email" type="email" placeholder="EMAIL" value={this.state.email} onChange={this.onChangeEmail}/>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <input class="form-control" name="phone" id="phone" type="text" placeholder="PHONE NUMBER" value={this.state.phonenumber} onChange={this.onChangePhonenumber}/>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <input class="form-control" name="age" id="age" type="text" placeholder="FULL ADDRESS" value={this.state.address} onChange={this.onChangeAddress}/>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <input class="form-control" name="city" id="city" type="text" placeholder="PRESCRIPTION" value={this.state.prescription} onChange={this.onChangePrescription}/>
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
