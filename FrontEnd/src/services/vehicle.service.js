import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/vehicles/";

const getAllVehicles = () => {
    return axios.get(API_URL);
};

const getVehicleDetails = (id) => {
    return axios.get(API_URL + id);
};

const addVehicle = (photo,type,regNo,range) => {
    return axios.post(API_URL, {photo,type,regNo,range});
};

const updateVehicle = (id,type,regNo,range) => {
    return axios.patch(API_URL + id, {type,regNo,range});
};

const deleteVehicle = (id) => {
    return axios.delete(API_URL + id);
};
export default {
    getAllVehicles,
    getVehicleDetails,
    addVehicle,
    updateVehicle,
    deleteVehicle,
};

