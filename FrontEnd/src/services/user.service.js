import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/users/";

const updatePassword = async (passwordCurrent,password,passwordConfirm) => {
    return axios.patch(API_URL + "updateMyPassword", {passwordCurrent,password,passwordConfirm}, {headers: authHeader()});
}

const forgotPassword = async (email) => {
    return axios.post(API_URL + "forgotPassword", {email});
}

const resetPassword = async (token,password,passwordConfirm) => {
    return axios.patch(API_URL + `resetPassword/${token}`, {password,passwordConfirm});
}

const setEmployeeStatus = async (id,status) => {
    return axios.patch(API_URL + `setEmployeeStatus/${id}`, {status});
}

const getAllUsers = () => {
    return axios.get(API_URL);
};

const addUser = (name,email,role,telNo,nic,salary,password,passwordConfirm) => {
    return axios.post(API_URL, {
            name,
            email,
            role,
            telNo,
            nic,
            salary,
            password,
            passwordConfirm,
    });
};

const getUser = (id) => {
    return axios.get(API_URL + id, {headers: authHeader()});
};

const updateUser = (id,name,email,role,telNo,nic,salary) => {
    return axios.patch(API_URL + id, {name,email,role,telNo,nic,salary});
};

const deleteUser = (id) => {
    return axios.delete(API_URL + id);
};

const updateMe = (name,email,telNo,nic) => {
    return axios.patch(API_URL + "updateMe", {name,email,telNo,nic}, {headers: authHeader()});
};

const deleteMe = () => {
    return axios.delete(API_URL + "deleteMe", {headers: authHeader()});
};

const getDrivers = () => {
    return axios.get(API_URL + 'getDrivers');
};

const selectedDriver = (id) => {
    return axios.get(API_URL + `selectedDriver/${id}`);
};

const canceldriver = (id) => {
    return axios.get(API_URL + `cancelledDriver/${id}`);
};

export default {
    getAllUsers,
    addUser,
    getUser,
    updateUser,
    deleteUser,
    updateMe,
    deleteMe,
    updatePassword,
    forgotPassword,
    resetPassword,
    setEmployeeStatus,
    getDrivers,
    selectedDriver,
    canceldriver
};

