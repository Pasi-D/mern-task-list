import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import rootReducers from './reducers';

import createSagaMiddleware from 'redux-saga';

//create saga middleware
const sagaMiddleware = createSagaMiddleware();

const middleware = [thunk, sagaMiddleware]

const initialState = {}

// for debugging using the browser extension
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
    rootReducers, 
    initialState, 
    compose(
        applyMiddleware(...middleware),
        reduxDevTools
    ));
    
export default store