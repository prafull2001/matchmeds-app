import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./css/navbar.css"

export default class Navbar extends Component {

  render() {
    return (
        <>
        <header class="clearfix">
            <div class="container">
                    <div class="header-left">
                    <   img src={ require('./img/logo.png') } />
                    </div>
                    <div class="header-right">
                        <label for="open">
                            <span class="hidden-desktop"></span>
                        </label>
                        <input type="checkbox" name="" id="open"/>
                        <nav>
                            <Link to="/matching">View Dashboard</Link>
                            <Link to="/register">Create New Patient</Link>
                            <Link to="/join">Create New Clinic</Link>
                        </nav>
                    </div>
                </div>
	    </header>
        </>
    );
  }
}