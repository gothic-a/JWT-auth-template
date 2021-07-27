import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'

import { logout, checkAuth } from './store/actions/authActions' 

function App() {
  const dispatch = useDispatch()
  const { user, isAuth } = useSelector(state => state.auth)

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [])

  return (
    <div className="App">
      {
        isAuth ? (
          <>
            <h3>user { user.email } login!</h3>
            <button
              onClick={() => dispatch(logout())}
            >
              logout
            </button>

            <h4>{ user.isActivated ? 'account activated' : 'we sent activation link to your email!' }</h4>
          </>
        ) : <LoginForm />
      }
    </div>
  );
}

export default App;
