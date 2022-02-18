import React, { Component } from 'react';
import {Jumbotron} from 'react-bootstrap';
import HeaderComponent from './HeaderComponent';

class LandingPageComponent extends Component {

    constructor(props) {
        super(props)

        //this.saveOrUpdateCustomer = this.saveOrUpdateCustomer.bind(this);
    }

    viewCustomers() {
        this.props.history.push('/customers');
    }

    viewCustomerReports() {
        this.props.history.push('/customerReports');
    }

    render() {
        return (
            <div>
                <HeaderComponent/>
                <div className="container">
                    <Jumbotron className="marginTop">
                    <center>
                        <h1>Welcome to Billing Dashboard!</h1>
                    </center>
                        <blockquote className="blockquote mb-0">
                    </blockquote>
                    </Jumbotron>
                    <button className = "btn btn-info" onClick={this.viewCustomers.bind(this)} style={{marginLeft: "1px"}}> View Customers </button> &nbsp;
                    <button className = "btn btn-info" onClick={this.viewCustomerReports.bind(this)} style={{marginLeft: "1px"}}> View Customer Reports </button>
                </div>
            </div>
        );
    }
}

export default LandingPageComponent;