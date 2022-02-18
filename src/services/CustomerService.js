import axios from 'axios';

const customer_base_url = "http://localhost:8080/api/v1/customers";

class CustomerService{

    getCustomers(){
        return axios.get(customer_base_url);
    }

    createCustomer(customer) {
        return axios.post(customer_base_url, customer);
    }

    getCustomerById(customerId){
        return axios.get(customer_base_url + '/' + customerId);
    }

    updateCustomer(customer, customerId) {
        return axios.put(customer_base_url + '/' + customerId, customer);
    }

    deleteCustomer(customerId) {
        return axios.delete(customer_base_url + '/' + customerId);
    }

    getCustomerCreatedByDate(date) {
        return axios.get(customer_base_url + '/dateCreated/'+ date);
    }
}

export default new CustomerService();