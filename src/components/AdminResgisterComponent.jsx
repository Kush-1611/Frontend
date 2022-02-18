import React, { Component } from 'react';
import {Row, Col, Card, Form, InputGroup, FormControl, Button, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPhone, faLock, faUndo, faUserPlus, faUser, faUserTag, faProjectDiagram} from "@fortawesome/free-solid-svg-icons";
import UserService from '../services/UserService';
import HeaderComponent from './HeaderComponent';

class AdminResgisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {

        username:'',
        password:'',
        mobileNo: '',
        email: '',
        firstName: '',
        lastName: '',
        role: '',
        confirm_password: '',
        message:'', 
        error:''
    };

    userChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    registerUser = (e) => {
        
        e.preventDefault();
            
        let user = { 
            username: this.state.username,
            password: this.state.password,
            mobileNo: this.state.mobileNo,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            role: this.state.role  
        };

        UserService.createUser(user).then(res =>{
            if(res.data === 'SUCCESS') {
                this.resetRegisterForm(); 
                this.setState({"message":"User created, proceed to login"});
            } else if(res.data === 'USER_ALREADY_EXISTS') {
                this.resetRegisterForm(); 
                this.setState({"error":"User with given username already exists"});
            }
            console.log(res.data);
        })
    }

    resetRegisterForm = () => {
        this.setState(() => this.initialState);
    };

    render() {
        const {username, password, mobileNo, email, firstName, lastName, role, confirm_password, error, message} = this.state;

        return (
        <div>
            <HeaderComponent/>
            <div className="container">
                <Form onSubmit = {this.registerUser}>
                    <Row className="justify-content-md-center">
                        <Col xs={"auto"}>
                            <br></br>
                            {message && <Alert variant="success">{message}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Card className={"border border-dark bg-dark text-white"}>
                                <Card.Header>
                                    <FontAwesomeIcon icon={faUserPlus}/> Register
                                </Card.Header>
                                <Card.Body>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="firstName" value={firstName} onChange={this.userChange}
                                                    className={"bg-dark text-white"} placeholder="Enter First Name"/>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl required autoComplete="off" type="text" name="lastName" value={lastName} onChange={this.userChange}
                                                    className={"bg-dark text-white"} placeholder="Enter Last Name"/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    {/* <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="email" value={email} onChange={this.userChange}
                                                    className={"bg-dark text-white"} placeholder="Enter Email"/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row> */}
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faPhone}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="mobileNo" value={mobileNo} onChange={this.userChange}
                                                    className={"bg-dark text-white"} placeholder="Enter Mobile Number"/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faUserTag}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="username" value={username} onChange={this.userChange}
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
                                                <FormControl required autoComplete="off" type="password" name="password" value={password} onChange={this.userChange}
                                                    className={"bg-dark text-white"} placeholder="Enter Password"/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="password" name="confirm_password" value={confirm_password} onChange={this.userChange}
                                                    className={"bg-dark text-white"} placeholder="Confirm Password"/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faProjectDiagram}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="role" value={role} onChange={this.userChange}
                                                    className={"bg-dark text-white"} placeholder="Enter Role"/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                </Card.Body>
                                <Card.Footer style={{"text-align":"right"}}>
                                    <Button size="sm" type="submit" variant="success" 
                                        disabled={this.state.username.length === 0 || this.state.password.length === 0 || (this.state.password !== this.state.confirm_password)}>
                                        <FontAwesomeIcon icon={faUserPlus}/> Register
                                    </Button>{' '}
                                    <Button size="sm" type="button" variant="info" onClick={this.resetRegisterForm}>
                                        <FontAwesomeIcon icon={faUndo}/> Reset
                                    </Button>
                                </Card.Footer>
                                
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
        );
    }
}

export default AdminResgisterComponent;