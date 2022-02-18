import React, { Component } from 'react';
import BillService from '../services/BillService';
import CustomerService from '../services/CustomerService';
import HeaderComponent from './HeaderComponent';
import { Line } from 'react-chartjs-2';  

class ViewCustomerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            customer: {},
            bill: [],
            AmtData: {},
            KWHData: {}
        }
    }

    cancel() {
        this.props.history.push('/customers');
    }
    
    componentDidMount() {
        
        CustomerService.getCustomerById(this.state.id).then( res => {
            this.setState({customer: res.data});
        })

        BillService.getBillByCustId(this.state.id).then( res => {
            
            var BillDate = [];
            var TotalAmt = [];
            var KWH = [];
            
            this.setState({bill: res.data});

            //console.log(res.data);
            
            res.data.forEach(function(data) {
                
                BillDate.push(data.billDate);
                TotalAmt.push(data.totalBilledAmount);
                KWH.push(data.currentKWH);
            })
            
            this.setState({
                AmtData: {
                    labels: BillDate,
                    datasets: [
                        {
                            label: 'Total Billed Amount vs. Bill Date',
                            data: TotalAmt,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)',
                                'rgba(255, 99, 132, 0.6)'
                            ]
                        }
                    ]
                },
                KWHData: {
                    labels: BillDate,
                    datasets: [
                        {
                            label: 'KWH vs. Bill Date',
                            data: KWH,
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)',
                                'rgba(255, 99, 132, 0.6)'
                            ]
                        }
                    ]
                }
            });
            
        })
    }

    render() {
        return (
            <div>
                <HeaderComponent/>
                <br></br>
                <div className = "card col-md-8 offset-md-2 pl-0 pr-0">
                    <h2 className="card-header offset-md">Customer Details</h2>
                    {/* <h2 className = "text-center"> Customer Details</h2> */}
                    <div className = "card-body pl-5 pr-5">
                    <div className = "row">
                            <label> <strong>Customer ID:&nbsp; </strong></label>
                            <div> { this.state.customer.customerId } </div>
                        </div>

                        <div className = "row">
                            <label> <strong> Customer Name:&nbsp; </strong></label>
                            <div>  { this.state.customer.name } </div>
                        </div>

                        <div className = "row">
                            <label> <strong> Customer E-mail:&nbsp; </strong></label>
                            <div> { this.state.customer.email } </div>
                        </div>

                        <div className = "row">
                            <label><strong> Customer Mobile Number:&nbsp; </strong></label>
                            <div> { this.state.customer.mobileNo } </div>
                        </div>

                        <div className = "row">
                            <label> <strong>Customer Mobile IMEI:&nbsp; </strong></label>
                            <div> { this.state.customer.mobileImei } </div>
                        </div>

                        <div className = "row">
                            <label><strong> Customer SDO Code:&nbsp; </strong></label>
                            <div> { this.state.customer.sdoCode } </div>
                        </div>

                        <div className = "row">
                            <label> <strong>Customer Agency:&nbsp; </strong></label>
                            <div> { this.state.customer.agency } </div>
                        </div>

                        <div className = "row">
                            <label><strong> Creation Date:&nbsp; </strong></label>
                            <div> { this.state.customer.dateCreated } </div>
                        </div>

                        <div className = "row">
                            <label> <strong>Update Date:&nbsp; </strong></label>
                            <div> { this.state.customer.dateUpdated } </div>
                        </div>
                    </div>
                </div>
                    <br></br>
                    <button className = "btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "185px"}}> Go back </button>
                    <div className = "container" >
                        <div className = "mb-4" style = {{width: "50%", float:"left"}}>
                            <Line
                                data = {this.state.AmtData}
                                options = {{ maintainAspectRatio: true}}/>
                        </div>

                        <div style={{width: "50%", float:"right"}}>
                            <Line
                                data = {this.state.KWHData}
                                options = {{ maintainAspectRatio: true}}/>
                        </div>
                    </div>
                    
                    
                    
                    <div className = "mt-3 pt-3">
                    {
                                this.state.bill.map(
                                bill =>
                                <div className = "card offset-md-2 col-md-8 mt-3 mb-3 pl-0 pr-0">
                                    <h5 className="card-header offset-md">Bill ID: { bill.billId }  </h5>
                                    <div className = "card-body pl-5 pr-5">
                                        <div className = "row">
                                            <label><strong> Bill Date:&nbsp; </strong></label>
                                            <div>  { bill.billDate } </div>
                                        </div>
                                        <div className = "row">
                                            <label><strong> Bill Due Date:&nbsp; </strong></label>
                                            <div>  { bill.billDueDate } </div>
                                        </div>
                                        <div className = "row">
                                            <label><strong> Current KW:&nbsp; </strong></label>
                                            <div>  { bill.currentKW } </div>
                                        </div>
                                        <div className = "row">
                                            <label><strong> Current KWH:&nbsp; </strong></label>
                                            <div>  { bill.currentKWH } </div>
                                        </div>
                                        <div className = "row">
                                            <label><strong> Total Billed Amount:&nbsp; </strong></label>
                                            <div>  { bill.totalBilledAmount } </div>
                                        </div>
                                        <div className = "row">
                                            <label><strong> Total Payable Amount:&nbsp; </strong></label>
                                            <div>  { bill.totalPayableAmt } </div>
                                        </div>
                                    </div>

                                </div>
                                )
                            }
                        </div>
            </div>
           
        );
    }
}

export default ViewCustomerComponent;