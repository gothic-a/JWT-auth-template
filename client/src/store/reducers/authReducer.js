import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAIL,
    USER_LOGOUT
} from '../constants/authConstants'

const initialState = {
    user: {},
    token: null,
    isAuth: false,
    error: null,
    loading: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...initialState,
                loading: true,
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.accessToken,
                isAuth: true,
                loading: false,
            }
        case USER_LOGIN_FAIL:
            return {
                ...initialState,
                loading: false,
                error: action.payload
            }

        case USER_REGISTRATION_REQUEST:
            return {
                ...initialState,
                loading: true,
            }
        case USER_REGISTRATION_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.accessToken,
                isAuth: true,
                loading: true,
            }
        case USER_REGISTRATION_FAIL:
            return {
                ...initialState,
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT: 
            return initialState
            
        default:
            return initialState
    }
}

export default authReducer