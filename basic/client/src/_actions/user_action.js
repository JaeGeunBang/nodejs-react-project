import axios from "axios";
import {
    AUTH_USER,
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

export function Auth() {
    const request = axios.get('http://localhost:8000/api/v1/user/auth',
        {
            withCredentials: true
        })
        .then(response => response.data)
    return {
        type: AUTH_USER,
        payload: request
    }
}