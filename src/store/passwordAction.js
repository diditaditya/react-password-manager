import axios from 'axios';
import store from './configureStore';

import { SAVE_PASSWORD_SUCCESS,
    SAVE_PASSWORD_FAILED,
    FETCH_PASSWORDS_SUCCESS,
    FETCH_PASSWORDS_FAILED,
    DELETE_PASSWORD_SUCCESS,
    DELETE_PASSWORD_FAILED,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILED } from './constants';

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

export const deletePasswordSuccess = (index) => {
    return {
        type: DELETE_PASSWORD_SUCCESS,
        payload: index
    }
}

export const deletePasswordFailed = () => {
    return {
        type: DELETE_PASSWORD_FAILED
    }
}

export const updatePasswordSuccess = (index, data) => {
    return {
        type: UPDATE_PASSWORD_SUCCESS,
        payload: {index, data}
    }
}

export const updatePasswordFailed = () => {
    return {
        type: UPDATE_PASSWORD_FAILED
    }
}

export const fetchPasswordsSuccess = (passwords) => {
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
    return dispatch => {
        let port = 4000;
        let url = `http://localhost:${port}/passwords`;
        return axios.post(url, data)
            .then((response) => {
                if(response.status === 200) {
                    console.log('successfully saved to database!');
                }
                dispatch(savePasswordSuccess(data));
            })
            .catch((err) => {
                dispatch(savePasswordFailed());
            });
    }
}

export const fetchPasswords = () => {
    return dispatch => {
        let port = 4000;
        let url = `http://localhost:${port}/passwords`;
        return axios.get(url)
            .then((response) => {
                if(response.status === 200) {
                    dispatch(fetchPasswordsSuccess(response.data));
                } else {
                    dispatch(fetchPasswordsFailed());    
                }
            })
            .catch((err) => {
                dispatch(fetchPasswordsFailed());
            });
    }
}

export const deletePassword = (data) => {
    return dispatch => {
        let port = 4000;
        let url = `http://localhost:${port}/passwords/${data.id}`;
        return axios.delete(url)
            .then((response) => {
                console.log(response);
                if(response.status === 200) {
                    dispatch(deletePasswordSuccess(data.index));
                } else {
                    dispatch(deletePasswordFailed());
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(deletePasswordFailed());
            });
    }
}

export const updatePassword = (index, data) => {
    return dispatch => {
        let port = 4000;
        let url = `http://localhost:${port}/passwords/${data.id}`;
        return axios.put(url, data)
            .then((response) => {
                if(response.status === 200) {
                    dispatch(updatePasswordSuccess(index, data));
                } else {
                    dispatch(updatePasswordFailed());
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(updatePasswordFailed());
            });
    }
}