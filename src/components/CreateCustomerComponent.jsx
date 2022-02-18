import React, { Component } from 'react';
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignInAlt, faUser, faWindowClose, faEnvelopeOpenText, faMobileAlt, faMapMarkerAlt, faLaptopHouse} from "@fortawesome/free-solid-svg-icons";
import CustomerService from '../services/CustomerService';
import HeaderComponent from './HeaderComponent';

class CreateCustomerComponent extends Component {
    
    constructor(props) {
        super(props)

        this.state = {

            id: this.props.match.params.id,
            name: '',
            email: '',
            mobileNo: '',
            mobileImei: '',
            scoCode: '',
            agency: '',
            fields: {},
            errors: {}
        }

        this.saveOrUpdateCustomer = this.saveOrUpdateCustomer.bind(this);
    }

    componentDidMount() {

        if(this.state.id === "_add"){
            return
        }
        else{

            CustomerService.getCustomerById(this.state.id).then((res) => {
                let customer = res.data;
                this.setState({
    
                    name: customer.name,
                    email: customer.email,
                    mobileNo: customer.mobileNo,
                    mobileImei: customer.mobileImei,
                    sdoCode: customer.sdoCode,
                    agency: customer.agency
                });
            });
        }

    }
        
    handleChange(stateName, e) {
        this.setState({ [stateName]: e.target.value });
    }

//     handleValidation(){
//         let fields = this.state.fields;
//         let errors = {};
//         let formIsValid = true;

//         //Name
//         if(!fields["name"]) {
//            formIsValid = false;
//            errors["name"] = "Cannot be empty";
//         }
  
//         if(typeof fields["name"] !== "undefined") {
//            if(!fields["name"].match(/^[a-zA-Z]+$/)){
//               formIsValid = false;
//               errors["name"] = "Only letters";
//            }        
//         }
   
//         //Email
//         if(!fields["email"]){
//            formIsValid = false;
//            errors["email"] = "Cannot be empty";
//         }
  
//         if(typeof fields["email"] !== "undefined"){
//            let lastAtPos = fields["email"].lastIndexOf('@');
//            let lastDotPos = fields["email"].lastIndexOf('.');

//            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && 
//                 lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
//               formIsValid = false;
//               errors["email"] = "Email is not valid";
//             }
//        }  

//        this.setState({errors: errors});
//        return formIsValid;
//    }

    saveOrUpdateCustomer = (e) => {
        
        e.preventDefault();
        let customer = { 

                name: this.state.name, 
                email:this.state.email, 
                mobileNo: this.state.mobileNo,
                mobileImei: this.state.mobileImei,
                sdoCode: this.state.sdoCode,
                agency: this.state.agency
            };

            if(this.state.id === "_add"){
                CustomerService.createCustomer(customer).then(res =>{
                    this.props.history.push('/customers');
                });
            }
            else{
                CustomerService.updateCustomer(customer, this.state.id).then(res =>{
                    this.props.history.push('/customers');
                });
            }        
    }

    
    cancel() {
        this.props.history.push('/customers');
    }

    getTitle() {
        if(this.state.id === "_add") {
            return <p>Update Customer Details</p>
        } else {
            return <h3 className="text-center">Update Customer Details</h3>
        }
    }

    render() {

        const {name, email, mobileNo, mobileImei, sdoCode, agency} = this.state;
        
        return (
            
        <div>
            <HeaderComponent/>
            <Form onSubmit = {this.saveOrUpdateCustomer}>
            <Row className="justify-content-md-center">
                <Col xs={"auto"}>
                    <br></br>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={faSignInAlt}/>&nbsp; Enter Details
                            {/* { this.getTitle() }              */}
                        </Card.Header>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="text" name="custName"
                                            value={name} onChange={this.handleChange.bind(this, 'name')}
                                            className={"bg-dark text-white"} placeholder="Enter Customer Name"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faEnvelopeOpenText}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="text" name="custEmail"
                                            value={email} onChange={this.handleChange.bind(this, 'email')}
                                            className={"bg-dark text-white"} placeholder="Enter Email"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faMobileAlt}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="text" name="custMobileNo"
                                            value={mobileNo} onChange={this.handleChange.bind(this, 'mobileNo')}
                                            className={"bg-dark text-white"} placeholder="Enter Mobile Number"/>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faMobileAlt}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl autoComplete="off" type="text" name="custMobileImei"
                                            value={mobileImei} onChange={this.handleChange.bind(this, 'mobileImei')}
                                            className={"bg-dark text-white"} placeholder="Enter Mobile IMEI"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faMapMarkerAlt}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl autoComplete="off" type="text" name="custSdoCode"
                                            value={sdoCode} onChange={this.handleChange.bind(this, 'sdoCode')}
                                            className={"bg-dark text-white"} placeholder="Enter SDO Code"/>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faLaptopHouse}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl autoComplete="off" type="text" name="custAgency"
                                            value={agency} onChange={this.handleChange.bind(this, 'agency')}
                                            className={"bg-dark text-white"} placeholder="Enter Agency"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"text-align":"right"}}>
                            <Button size="sm" type="submit" variant="success">
                                <FontAwesomeIcon icon={faSignInAlt}/> Save
                            </Button>{' '}
                            
                            <Button size="sm" type="button" variant="danger" onClick={this.cancel.bind(this)}>
                                <FontAwesomeIcon icon={faWindowClose}/> Cancel
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            </Form>
        </div>
        );
    }
}

export default CreateCustomerComponent;