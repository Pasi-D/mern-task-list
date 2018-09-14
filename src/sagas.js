import {
    GET_TASKS,
    GET_TASK,
    GET_TASKS_API,
    API_FAIL
} from './actions/types'

import { call, takeLatest, put } from 'redux-saga/effects'
 
import axios from 'axios';

// watcher saga: watches for actions dispatched to the store, starts worker saga
function* watcherSaga() {
    //automatically cancels any previous saga task started previous if it's still running.    
    yield takeLatest(GET_TASKS_API, workerFetchTasks)
}

/* saga debugging */
function* TestSaga(){
    console.log('Redux-Saga is working !');    
}

// Fetch all tasks
function fetchTasks(){
    return (
        axios.get('/api/task')
    )
}

// Worker Saga for making api call when 
function* workerFetchTasks(){
    try{
        const response = yield call(fetchTasks);
        const payload = response.data

        console.log('workerfetchTasks response success');
        
        // dispatch a success: GET_TASKS action to the store with the fetched tasks
        yield put({type: GET_TASKS, payload})
    }catch(err) {
        yield put({type: API_FAIL, err})
    }
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield [
        TestSaga(),
        watcherSaga()
    ]
}