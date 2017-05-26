import axios from 'axios';
import store from './configureStore';

import { SAVE_PASSWORD_SUCCESS, SAVE_PASSWORD_FAILED, FETCH_PASSWORDS_SUCCESS, FETCH_PASSWORDS_FAILED } from './constants';

export const savePasswordSuccess = (data) => {

    return {
        type: SAVE_PASSWORD_SUCCESS,
        payload: data
    }
}

export const savePasswordFailed = () => {
    return {
        type: SAVE_PASSWORD_FAILED
    }
}

export const fetchPasswordsSuccess = (passwords) => {
    console.log('in action fetchPasswordsSuccess');
    return {
        type: FETCH_PASSWORDS_SUCCESS,
        payload: passwords
    }
}

export const fetchPasswordsFailed = () => {
    return {
        type: FETCH_PASSWORDS_FAILED
    }
}


export const savePassword = (data) => {
    console.log('in action save password');
    return dispatch => {
        let port = 4000;
        let url = `http://localhost:${port}/passwords`;
        return axios.post(url, data)
            .then((response) => {
                console.log('got response from axios')
                dispatch(savePasswordSuccess(data));
            })
            .catch((err) => {
                dispatch(savePasswordFailed());
            });
    }
}

export const fetchPasswords = () => {
    console.log('in action fetchPassword')
    return dispatch => {
        console.log('in action fetchPassword line 56')
        let port = 4000;
        let url = `http://localhost:${port}/passwords`;
        return axios.get(url)
            .then((response) => {
                console.log(response.data)
                dispatch(fetchPasswordsSuccess(response.data));
            })
            .catch((err) => {
                dispatch(fetchPasswordsFailed());
            });
    }
}