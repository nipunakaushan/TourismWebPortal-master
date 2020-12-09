import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/tours/";
const API_UPLOAD_URL = "http://localhost:8080/";

const uploadSinglePhoto = (formData) => {
    return axios.post(API_UPLOAD_URL + "uploadfile", formData);
}

const uploadMultiplePhoto = (formData) => {
    return axios.post(API_UPLOAD_URL + "uploadmultifile", formData);
}

const getAllTours = () => {
    return axios.get(API_URL);
};

const getTourDetails = (id) => {
    return axios.get(API_URL + id);
};

const addTour = (name,summary,imageCover,description,price,maxGroupSize,duration,difficulty,{images:[imageUrlPhotos1,imageUrlPhotos2,imageUrlPhotos3]}) => {
    return axios.post(API_URL, {name,summary,imageCover,description,price,maxGroupSize,duration,difficulty,images:[imageUrlPhotos1,imageUrlPhotos2,imageUrlPhotos3]});
};

const updateTour = (id,name,summary,description,price,maxGroupSize,duration) => {
    return axios.patch(API_URL + id, {name,summary,description,price,maxGroupSize,duration});
};

const deleteTour = (id) => {
    return axios.delete(API_URL + id, {headers: authHeader()});
};

export default {
    getAllTours,
    addTour,
    getTourDetails,
    updateTour,
    deleteTour,
    uploadSinglePhoto,
    uploadMultiplePhoto
};

