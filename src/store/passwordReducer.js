import { SAVE_PASSWORD_SUCCESS,
    SAVE_PASSWORD_FAILED,
    FETCH_PASSWORDS_SUCCESS,
    FETCH_PASSWORDS_FAILED,
    DELETE_PASSWORD_SUCCESS,
    DELETE_PASSWORD_FAILED,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILED } from './constants';

const initialState = {
    savedPasswords: [],
    savePasswordMessage: '',
    fetchPasswordsMessage: '',
    deletePasswordMessage: '',
    updatePasswordMessage: ''
};

const passwordReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_PASSWORD_SUCCESS:
            return {
                ...state,
                savedPasswords: [...state.savedPasswords, action.payload],
                savePasswordMessage: ''
            }
        case SAVE_PASSWORD_FAILED:
            return {
                ...state,
                savePasswordMessage: 'Error occured when saving the password to database, please check your database connection'
            }
        case DELETE_PASSWORD_SUCCESS:
            return {
                ...state, 
                savedPasswords: [...state.savedPasswords.slice(0, action.payload), ...state.savedPasswords.slice(action.payload + 1)],
                deletePasswordsMessage: ''
            }
        case DELETE_PASSWORD_FAILED:
            return {
                ...state,
                deletePasswordMessage: 'Error occured when deleting the password from database, please check your database connection'
            }
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                savedPasswords: [...state.savedPasswords.slice(0, action.payload.index), action.payload.data, ...state.savedPasswords.slice(action.payload.index + 1)],
                updatePasswordMessage: ''
            }
        case UPDATE_PASSWORD_FAILED:
            return {
                ...state,
                updatePasswordMessage: 'Error occured when updating the password in the database, please check your database connection'
            }
        case FETCH_PASSWORDS_SUCCESS:
            return {
                ...state, 
                savedPasswords: action.payload,
                fetchPasswordsMessage: ''
            }
        case FETCH_PASSWORDS_FAILED:
            return {
                ...state,
                fetchPasswordsMessage: 'Error occured when fetching the password from database, please check your database connection'
            }
        default: 
            return state
    }
}

export default passwordReducer;