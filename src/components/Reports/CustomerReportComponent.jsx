import React, { Component } from 'react';
import HeaderComponent from '../HeaderComponent';
import CustomerService from '../../services/CustomerService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'


class CustomerReportComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            date: new Date(),
            custCount: '',
            customers: []
        }  
        
        this.ChangeDate = this.ChangeDate.bind(this);
    }

    componentDidMount() {
        CustomerService.getCustomerCreatedByDate(this.convert(this.state.date)).then((res) => {
            this.setState({ customers: res.data });
        });
    }

    componentDidUpdate() {
        CustomerService.getCustomerCreatedByDate(this.convert(this.state.date)).then((res) => {
            this.setState({ customers: res.data });    
        });        
    }

    ChangeDate = (e) => {  
        this.setState({  date: e  });  
    };

    convert(dateIn) {
        var yyyy = dateIn.getFullYear();
        var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
        var dd = dateIn.getDate();
        return String(yyyy + '-' + mm + '-' + dd); 
    }

  
    render() {

        return (
            <div>
            <HeaderComponent/>
            <div className = "container">
                <br/>
                <h2 className="text-center">Date Wise Customers Registered</h2>
                <div className = "row">
                    <DatePicker  
                        dateFormat = 'dd/MM/yyyy'
                        selected = {this.state.date} placeholderText="Select Date"   
                        onChange = {this.ChangeDate} 
                        maxDate = {new Date()}
                        // filterDate = {date => date.getDay() !== 6 && date.getDay() !== 0}
                        showYearDropdown
                        scrollableMonthYearDropdown
                    /> 
                </div>
                <br></br>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th className = "text-center">Customer Name</th>
                                <th className = "text-center">Customer Email</th>
                                <th className = "text-center"> Customer Mobile Number</th>
                                <th className = "text-center"> Date Created </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.customers.map(
                                    customers => 
                                    <tr className = "text-center" key  = { customers.customerId }>
                                        <td className = "text-center"> { customers.name } </td>
                                        <td className = "text-center"> { customers.email } </td>
                                        <td className = "text-center"> { customers.mobileNo} </td>
                                        <td className = "text-center"> { this.convert(this.state.date) } </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        );
    }
}

export default CustomerReportComponent;