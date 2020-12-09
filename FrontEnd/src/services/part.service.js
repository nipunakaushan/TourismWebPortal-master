import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/parts/";

const getAllParts = () => {
    return axios.get(API_URL);
};

const getPartDetails = (id) => {
    return axios.get(API_URL + id);
};

const addPart = (mechanicId,mechanicName,type,name,cost,image) => {
    return axios.post(API_URL, {mechanicId,mechanicName,type,name,cost,image});
};

const updatePart = (id,type,name,cost) => {
    return axios.patch(API_URL + id, {type,name,cost});
};

const deletePart = (id) => {
    return axios.delete(API_URL + id);
};

export default {
    getAllParts,
    getPartDetails,
    addPart,
    updatePart,
    deletePart,
};

