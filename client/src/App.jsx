import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'

import { logout, checkAuth } from './store/actions/authActions' 
import UserService from './services/UserService'

function App() {
	const dispatch = useDispatch()
  	const { user, isAuth, loading } = useSelector(state => state.auth)
  	const [users, setUsers] = useState([])

	useEffect(() => {
		if(localStorage.getItem('token')) {
			dispatch(checkAuth())
		}
	}, [])

	const fetchUsers = async () => {
		try {
			const { data } = await UserService.fetchUsers()
			console.log(data)
			setUsers(data)
		} catch (e) {
			// if(e.response)
			console.log(e)
			console.log(e.response)
		}
	}

  	return (
    	<div className="App">
			{	
				loading ? <h3>loading...</h3> : (
					isAuth ? (
						<>
							<h3>user { user.email } login!</h3>
							<button onClick={() => dispatch(logout())}>logout</button>
							<h4>{ user.isActivated ? 'account activated' : 'we sent activation link to your email!' }</h4>

							<button onClick={() => fetchUsers()} >get users</button>
							<ul>
								{
									users.length !== 0 
										&& users.map(u => <div key={u.email}>{u.email}</div>)  
								}
							</ul>
						</>
					) : <LoginForm />
				)
			}
		</div>
	);
}

export default App;
