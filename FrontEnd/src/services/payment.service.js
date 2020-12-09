import axios from 'axios';
import authHeader from './auth-header';

const API_URL_MONTHLY_TYPE_REPORT = "http://localhost:8080/api/v1/payments/monthlyTypeReport";
const API_URL_MONTHLY_PAYMENT_REPORT = "http://localhost:8080/api/v1/payments/monthlyPaymentReport";

const getMonthlyTypeReport = () => {
    return axios.get(API_URL_MONTHLY_TYPE_REPORT);
};

const getMonthlyPaymentReport = () => {
    return axios.get(API_URL_MONTHLY_PAYMENT_REPORT);
};

export default {
    getMonthlyTypeReport,
    getMonthlyPaymentReport,
};

