import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/locations/";

const getAllLocations = () => {
    return axios.get(API_URL);
};

const getLocationDetails = (id) => {
    return axios.get(API_URL + id);
};

const addLocation = (name,description,latitudes,longitudes) => {
    return axios.post(API_URL, {name,description,latitudes,longitudes});
};

const updateLocation = (id,name,description,latitudes,longitudes) => {
    return axios.patch(API_URL + id, {name,description,latitudes,longitudes});
};

const deleteLocation = (id) => {
    return axios.delete(API_URL + id);
};

export default {
    getAllLocations,
    getLocationDetails,
    addLocation,
    updateLocation,
    deleteLocation,
};

