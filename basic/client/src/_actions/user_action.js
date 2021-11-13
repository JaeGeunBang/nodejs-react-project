import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post('http://localhost:8000/api/v1/user/login', dataToSubmit,
        {
            withCredentials: true
        })
        .then(response => response.data)
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function RegisterUser(dataToSubmit) {
    const request = axios.post('http://localhost:8000/api/v1/user', dataToSubmit)
        .then(response => response.data)
    return {
        type: REGISTER_USER,
        payload: request
    }
}