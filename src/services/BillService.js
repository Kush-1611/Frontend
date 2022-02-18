import axios from 'axios';

const customer_base_url = "http://localhost:8080/api/v1/customers";

class BillService{

    createBill(bill) {
        return axios.post(customer_base_url + '/addBill', bill);
    }

    getBillByCustId(id) {
        return axios.get(customer_base_url + '/getBills/' + id);
    }

    getTotalAmountByCustId(id) {
        return axios.get(customer_base_url + '/getAmount/' + id);
    }
}

export default new BillService();