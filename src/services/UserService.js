import axios from 'axios';

const user_base_url = "http://localhost:8080/users";

class UserService{

    createUser(user) {
        return axios.post(user_base_url + '/register', user);
    }

    authenticateUser(user) {
        return axios.post(user_base_url + '/login', user);
    }

    logoutUser(user) {
        sessionStorage.removeItem("isUserLogged");
    }

    getCurrentUser() {
        return sessionStorage.getItem("isUserLogged");
    }
}

export default new UserService();