import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/packages/";

const getAllPackages = () => {
    return axios.get(API_URL);
};

const getPackageDetails = (id) => {
    return axios.get(API_URL + id);
};

const addPackage = (name,description,price,includes) => {
    return axios.post(API_URL, {name,description,price,includes});
};

const updatePackage = (id,name,description,price,includes) => {
    return axios.patch(API_URL + id, {name,description,price,includes});
};

const deletePackage = (id) => {
    return axios.delete(API_URL + id);
};

export default {
    getAllPackages,
    getPackageDetails,
    addPackage,
    updatePackage,
    deletePackage,
};

