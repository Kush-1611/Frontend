import * as AT from './authTypes';
import axios from 'axios';

// export const authenticateUser = (email, password) => {
    
//     return dispatch => {
//         dispatch(loginRequest());
//         if(email === "test" && password === "test") {
//             dispatch(success());
//         } else {
//             dispatch(failure())
//         }
//     };
// };

// const user_base_url = "http://localhost:8080/users";

// export const authenticatePortalUser = (user) => {
//     return axios.post(user_base_url + '/login', user);
// };

export const logoutUser = () => {
    return dispatch => {
        dispatch({
            type: AT.LOGOUT_REQUEST
        });
        localStorage.removeItem('jwtToken');
        dispatch(success(false));
    };
};

const loginRequest = () => {
    return {
        type: AT.LOGIN_REQUEST
    };
};

const success = isLoggedIn => {
    return {
        type: AT.SUCCESS,
        payload: isLoggedIn
    };
};

const failure = () => {
    return {
        type: AT.FAILURE,
        payload: false
    };
    
};