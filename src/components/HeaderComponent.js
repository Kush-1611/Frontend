import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import UserService from '../services/UserService';
import { isAuth } from '../services/auth';

class HeaderComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false
        }
    }

    componentDidMount() {
        
        const user = window.sessionStorage.getItem("isUserLogged");
        if (user) {
            this.setState({
            loggedIn: true
          });
        }
    }

    logoutCurrentUser = () => {
        window.sessionStorage.removeItem("isUserLogged");
        this.setState({loggedIn: false});
    };

    render() {

        if(!isAuth()) {
            return (
                <div style={{height: "auto", width:"100%", padding: "0px", border:"0px"}}>
                    <header>
                        <Navbar bg = "dark" variant = "dark" style={{height: "auto", width: "auto"}}>
                            <Nav className="mr-auto">
                                <div className="navbar-brand"> <a href ="/" style={{color: "inherit"}}> Billing Dashboard </a></div>
                            </Nav>
                            <Nav className = "navbar-right">
                                <Link to={'/admin-register'} className="nav-link"><FontAwesomeIcon icon = {faUserPlus}/> Register </Link>
                                <Link to={'/admin-login'} className="nav-link"><FontAwesomeIcon icon = {faSignInAlt}/> Login </Link>
                            </Nav>
                        </Navbar>
                    </header>
                </div>
            );
        } else {
            return (
                <div>
                    <header>
                        <Navbar bg = "dark" variant = "dark">
                            <Nav className="mr-auto">
                                <div className="navbar-brand"> <a href ="/" style={{color: "inherit"}}> Billing Dashboard </a></div>
                            </Nav>
                            <Nav className = "navbar-right">
                                <Link to={'/admin-login'} className="nav-link" onClick={this.logoutCurrentUser}><FontAwesomeIcon icon = {faSignOutAlt}/> Logout </Link>
                            </Nav>
                        </Navbar>
                    </header>
                </div>
            );
        }
    }
}

export default HeaderComponent;