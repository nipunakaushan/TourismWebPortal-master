import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/complaints/";

const getAllComplaints = () => {
    return axios.get(API_URL);
};

const getComplaintDetails = (id) => {
    return axios.get(API_URL + id);
};

const addComplaint = (customerId,customerName,complaint) => {
    return axios.post(API_URL, {customerId,customerName,complaint});
};

const updateComplaint = (id,complaint) => {
    return axios.patch(API_URL + id, {complaint});
};

const updateResponse = (id,response) => {
    return axios.patch(API_URL + id, {response, status: 'responded'});
};

const deleteComplaint = (id) => {
    return axios.delete(API_URL + id);
};

export default {
    getAllComplaints,
    getComplaintDetails,
    addComplaint,
    updateComplaint,
    deleteComplaint,
    updateResponse
};

