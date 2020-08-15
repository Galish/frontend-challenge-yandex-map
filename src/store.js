import reducers from './reducers'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'

export default createStore(
	reducers,
	applyMiddleware(thunk)
)
