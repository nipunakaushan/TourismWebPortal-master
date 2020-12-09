import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/users/";

const register = (name, email, telNo, nic, password, passwordConfirm) => {
    return axios.post(API_URL + "signup", {
        name,
        email,
        telNo,
        nic,
        password,
        passwordConfirm,
    });
};

const login =  async (email, password) => {
     await  axios.post(API_URL + "login", {
        email,
        password,
    }).then((response) => {
        if(response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};