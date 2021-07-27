import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAIL,
    USER_LOGOUT
} from '../constants/authConstants'
import AuthService from '../../services/authService'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: USER_LOGIN_REQUEST})
        console.log(AuthService)
        const { data } = await AuthService.login(email, password) 
        localStorage.setItem('token', data.accessToken)
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
    } catch(e) {
        dispatch({type: USER_LOGIN_FAIL, payload: e})
    }
} 

export const registration = (email, password) => async (dispatch) => {
    try {
        dispatch({type: USER_REGISTRATION_REQUEST})
        const { data } = await AuthService.registration(email, password)
        localStorage.setItem('token', data.accessToken) 
        dispatch({type: USER_REGISTRATION_SUCCESS, payload: data})
    } catch(e) {
        dispatch({type: USER_REGISTRATION_FAIL, payload: e})
    }
} 

export const logout = () => async (dispatch) => {
    try {
        await AuthService.logout()
        localStorage.removeItem('token') 
        dispatch({type: USER_LOGOUT})
    } catch(e) {
        console.log(e)
    }
}

export const checkAuth = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:5000/api/users/refresh', {withCredentials: true})
    
        localStorage.setItem('token', data.accessToken) 
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
    } catch(e) {
        dispatch({type: USER_LOGIN_FAIL, payload: e})
    }
}