import { 
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from './reducers/authReducer'

const reducer = combineReducers({
    auth: authReducer,
})

const initialState = {}

const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(
        applyMiddleware(thunk),
    )
)

export default store