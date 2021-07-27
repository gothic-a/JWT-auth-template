import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    login,
    registration,
    logout
} from '../store/actions/authActions'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const { isAuth } = useSelector(state => state.auth.isAuth)

    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    
    const registrationHandler = (e) => {
        e.preventDefault()
        dispatch(registration(email, password))
    } 

    return (
        <div className="wrapper">
            <form className="login-form">
                <input 
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="text" 
                    placeholder="email"
                />
                <input 
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password" 
                    placeholder="password"
                />
                <button type="submit" onClick={loginHandler}>sing in</button>
                <button type="submit" onClick={registrationHandler}>sing up</button>
            </form>
        </div>
    )
}

export default LoginForm