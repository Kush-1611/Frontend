import React, { Component } from 'react';
import CustomerService from '../services/CustomerService';
import HeaderComponent from './HeaderComponent';

class ListCustomerComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            search: '',
            customers: []
        }

        this.addCustomer = this.addCustomer.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.viewCustomer = this.viewCustomer.bind(this);
    }

    editCustomer(id) {
        this.props.history.push(`/add-customer/${id}`);
    }

    deleteCustomer(id) {
        CustomerService.deleteCustomer(id).then( res => {
            this.setState({customers: this.state.customers.filter(customer => customer.customerId !== id)});
        });
    }

    viewCustomer(id) {
        this.props.history.push(`/view-customer/${id}`);
    }
    

    componentDidMount() {
        CustomerService.getCustomers().then((res) => {
            this.setState({ customers: res.data });
        });
    }

    //HERE
    addCustomer(){
        this.props.history.push('/add-customer/_add');
    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0,20)});
    }

    addBill(id) {
        this.props.history.push(`/addBill/${id}`);
    }


    render() {
        
        let filteredCustomers = this.state.customers.filter(
            (customer) => {
                return customer.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        return (
            <div>
                <HeaderComponent/>
                <div className = "container">
                    <br/>
                    <h2 className="text-center">Customer List</h2>
                    

                    <div className="d-flex mr-0 pr-0 pl-0">
                        <div className="mr-auto pl-0 pr-0">
                        <button className = "btn btn-primary" onClick = {this.addCustomer}> Add Customer </button>
                        </div>
                        <div className="p-0">
                        <input type = "text" align = "left" placeholder = "Search by Name" class="form-control" 
                            value = {this.state.search}
                            onChange = {this.updateSearch.bind(this)}
                        />
                        </div>
                        
                    </div>

                    <br/>
                    <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th className = "text-center">Customer Name</th>
                                    <th className = "text-center">Customer Email</th>
                                    <th className = "text-center"> Customer Mobile Number</th>
                                    <th className = "text-center"> Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredCustomers.map(
                                        customers => 
                                        <tr className = "text-center" key  = { customers.customerId }>
                                            <td className = "text-center"> { customers.name } </td>
                                            <td className = "text-center"> { customers.email } </td>
                                            <td className = "text-center"> { customers.mobileNo} </td>
                                            <td className = "text-center">
                                                <button onClick = { () => this.editCustomer(customers.customerId)} className = "btn btn-info"> Update </button>
                                                <button style = {{ marginLeft: "10px"}} onClick = { () => this.viewCustomer(customers.customerId)} className = "btn btn-info"> View Customer Reports </button>
                                                <button style = {{ marginLeft: "10px"}} onClick = { () => this.addBill(customers.customerId)} className = "btn btn-info"> Add Bill </button>
                                                <button style = {{ marginLeft: "10px"}} onClick = { () => this.deleteCustomer(customers.customerId)} className = "btn btn-danger"> Delete </button>
                                            </td>
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

export default ListCustomerComponent;