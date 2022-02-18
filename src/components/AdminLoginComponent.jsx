import React, { Component } from 'react';
// import {connect} from 'react-redux';
import {Row, Col, Card, Form, InputGroup, FormControl, Button, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignInAlt, faLock, faUndo, faUser} from "@fortawesome/free-solid-svg-icons";
import UserService from '../services/UserService';
import HeaderComponent from './HeaderComponent';


class AdminLoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.isValid = false
    }

    initialState = {
        username:'', password:'', error:'', loggedIn: false
    };
    
    credentialChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };
    
    validateUser = () => {

        let user = { 

            username: this.state.username, 
            password: this.state.password,
        };
        
        UserService.authenticateUser(user).then((res) => {
            if(res.data === 'SUCCESS') {
                window.sessionStorage.setItem("isUserLogged", true);
                this.props.history.push('/')
            } else if(res.data === 'FAILURE') {
                this.resetLoginForm();
                this.setState({"error":"Invalid username or password"});
            }
        })
    };
   
    resetLoginForm = () => {
        this.setState(() => this.initialState);
    };

    render() {
        const {username, password, error} = this.state;

        return (
            <div>
            <HeaderComponent/>
            <Row className="justify-content-md-center">
                <Col xs={"auto"}>
                    <br></br>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={faSignInAlt}/> Login
                        </Card.Header>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                            
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="text" name="username" value={username} onChange={this.credentialChange}
                                            className={"bg-dark text-white"} placeholder="Enter Username"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="password" name="password" value={password} onChange={this.credentialChange}
                                            className={"bg-dark text-white"} placeholder="Enter Password"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"text-align":"right"}}>
                            <Button size="sm" type="button" variant="success" onClick={this.validateUser}
                                disabled={this.state.username.length === 0 || this.state.password.length === 0}>
                                <FontAwesomeIcon icon={faSignInAlt}/> Login
                            </Button>{' '}
                            <Button size="sm" type="button" variant="info" onClick={this.resetLoginForm}
                                disabled={this.state.username.length === 0 && this.state.password.length === 0 && this.state.error.length === 0}>
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            </div>
        );
    }
}

export default (AdminLoginComponent);
