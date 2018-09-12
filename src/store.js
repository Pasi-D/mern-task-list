import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import rootReducers from './reducers';

const middleware = [thunk]

const initialState = {}

const store = createStore(
    rootReducers, 
    initialState, 
    compose(
        applyMiddleware(...middleware),
        // for debugging using the browser extension
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
    
export default store