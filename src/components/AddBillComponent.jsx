import React, { Component } from 'react';
import BillService from '../services/BillService';
import {Row, Col, Card, Form, InputGroup, FormControl, Button, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUndo, faUserPlus, faUser, faProjectDiagram, faFileInvoiceDollar, faBackspace, faCalendarDay, faBook, faChargingStation, faCalendarCheck, faReceipt, faHandHoldingUsd, faLocationArrow, faUserTie, faMapMarkerAlt, faIdBadge} from "@fortawesome/free-solid-svg-icons";
import HeaderComponent from './HeaderComponent';
import 'react-datepicker/dist/react-datepicker.css'

class AddBillComponent extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        custId: this.props.match.params.id,
        billDate: '',
        billCreatedDate: '',
        mtrSerialNo: '',
        currentKW: '',
        currentKWH: '',
        currentKVAH: '',
        billDueDate: '',
        totalBilledAmount: '',
        discom: '',
        division: '',
        ipAddress: '',
        agentName: '',
        totalPayableAmt: '',
        billingAddr: '',
        message: ''
    };

    billSet = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    createBill = (e) => {

        e.preventDefault();
        let bill = {
            custId: this.state.custId,
            billDate: this.state.billDate,
            billCreatedDate: this.state.billCreatedDate,
            mtrSerialNo: this.state.mtrSerialNo,
            currentKW: this.state.currentKW,
            currentKWH: this.state.currentKWH,
            currentKVAH: this.state.currentKVAH,
            billDueDate: this.state.billDueDate,
            totalBilledAmount: this.state.totalBilledAmount,
            discom: this.state.discom,
            division: this.state.division,
            ipAddress: this.state.ipAddress,
            agentName: this.state.agentName,
            totalPayableAmt: this.state.totalPayableAmt,
            billingAddr: this.state.billingAddr
        }

        //console.log(bill);
        BillService.createBill(bill);
        // BillService.createBill(bill).then(response => {
        //     console.log(response);
        // }).catch(e => {
        //     console.log(e);
        // });
        this.resetRegisterForm();
        this.setState({"message":"Bill Added!"});
    }
    
    resetRegisterForm = () => {
        this.setState(() => this.initialState);
    };

    goBack = () => {
        this.props.history.push('/customers');
    }

    render() {

        const {custId, billDate, billCreatedDate, mtrSerialNo, currentKW, currentKWH, currentKVAH,
        billDueDate, totalBilledAmount, discom, division, ipAddress, agentName, totalPayableAmt, billingAddr, message} = this.state;
        
        return (
            <div>
                <HeaderComponent/>
            <div className="container">
                <Form onSubmit = {this.createBill}>
                    <Row className="justify-content-md-center">
                        <Col xs={"auto"}>
                            <br></br>
                            {message && <Alert variant="success">{message}</Alert>}
                            {/* {error && <Alert variant="danger">{error}</Alert>} */}
                            <Card className={"border border-dark bg-dark text-white"}>
                                <Card.Header>
                                    <FontAwesomeIcon icon={faFileInvoiceDollar}/>&nbsp; Enter Bill Details
                                </Card.Header>
                                <Card.Body>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="custId" value={custId} onChange={this.billSet}
                                                    className={"bg-dark text-white"} placeholder="Enter Cust ID" readOnly/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faCalendarDay}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" placeholder="Enter Bill Created Date"
                                                    onFocus={(e) => e.target.type = 'date'} 
                                                    onBlur={(e) => e.target.type = 'text'} 
                                                    name="billCreatedDate" value={billCreatedDate} 
                                                    onChange={this.billSet}
                                                    className={"bg-dark text-white form-control"} 
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faCalendarDay}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" placeholder="Enter Bill Date"
                                                    onFocus={(e) => e.target.type = 'date'} 
                                                    onBlur={(e) => e.target.type = 'text'} 
                                                    name="billDate" value={billDate} 
                                                    onChange={this.billSet}
                                                    className={"bg-dark text-white form-control"} 
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faBook}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="mtrSerialNo" value={mtrSerialNo} onChange={this.billSet}
                                                    className={"bg-dark text-white"} placeholder="Enter Meter Serial Number"/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faChargingStation}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="currentKW" value={currentKW} onChange={this.billSet}
                                                    className={"bg-dark text-white"} placeholder="Enter current KW"/>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faChargingStation}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="currentKWH" value={currentKWH} onChange={this.billSet}
                                                    className={"bg-dark text-white"} placeholder="Enter current KWH"/>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faChargingStation}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="currentKVAH" value={currentKVAH} onChange={this.billSet}
                                                    className={"bg-dark text-white"} placeholder="Enter current KVAH"/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faCalendarCheck}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" placeholder="Enter Bill Due Date"
                                                    onFocus={(e) => e.target.type = 'date'} 
                                                    onBlur={(e) => e.target.type = 'text'} 
                                                    name="billDueDate" value={billDueDate} 
                                                    onChange={this.billSet}
                                                    className={"bg-dark text-white form-control"} 
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faReceipt}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="totalBilledAmount" value={totalBilledAmount} onChange={this.billSet}
                                                    className={"bg-dark text-white"} placeholder="Enter Total Billed Amount"/>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faHandHoldingUsd}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="totalPayableAmt" value={totalPayableAmt} onChange={this.billSet}
                                                    className={"bg-dark text-white"} placeholder="Enter Payable Amount"/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faIdBadge}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="discom" value={discom} onChange={this.billSet}
                                                    className={"bg-dark text-white"} placeholder="Enter Discom"/>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faLocationArrow}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="division" value={division} onChange={this.billSet}
                                                    className={"bg-dark text-white"} placeholder="Enter Division"/>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faUserTie}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="agentName" value={agentName} onChange={this.billSet}
                                                    className={"bg-dark text-white"} placeholder="Enter Agent Name"/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faProjectDiagram}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="ipAddress" value={ipAddress} onChange={this.billSet}
                                                    className={"bg-dark text-white"} placeholder="Enter IP address"/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FontAwesomeIcon icon={faMapMarkerAlt}/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl autoComplete="off" type="text" name="billingAddr" value={billingAddr} onChange={this.billSet}
                                                    className={"bg-dark text-white"} placeholder="Enter Billing Adress"/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                </Card.Body>
                                <Card.Footer>
                                <div className="d-flex">
                                    <div className="mr-auto p-1">
                                        <Button size="sm" type="button" variant="danger" onClick={this.goBack}>
                                            <FontAwesomeIcon icon={faBackspace}/> Back
                                        </Button>{' '}
                                    </div>
                                    <div className="p-1">
                                        <Button size="sm" type="submit" variant="success">
                                            <FontAwesomeIcon icon={faUserPlus}/> Submit
                                        </Button>{' '}
                                    </div>
                                    <div className="p-1">
                                        <Button size="sm" type="button" variant="info" onClick={this.resetRegisterForm}>
                                            <FontAwesomeIcon icon={faUndo}/> Reset
                                        </Button>
                                    </div>
                                </div>  
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

export default AddBillComponent;