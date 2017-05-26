import { SAVE_PASSWORD_SUCCESS, SAVE_PASSWORD_FAILED, FETCH_PASSWORDS_SUCCESS, FETCH_PASSWORDS_FAILED } from './constants';

const initialState = {
    savedPasswords: [],
    savePasswordMessage: '',
    fetchPasswordsMessage: ''
};

const passwordReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_PASSWORD_SUCCESS:
            return {
                ...state,
                savedPasswords: [...state.savedPasswords, action.payload]
            }
        case SAVE_PASSWORD_FAILED:
            return {
                ...state,
                savePasswordMessage: 'Error occured when saving the password to database, please check your database connection'
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