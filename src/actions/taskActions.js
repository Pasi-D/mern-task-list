import axios from 'axios';

import {
    GET_TASK,
    GET_TASKS
} from './types'

// GET all tasks
export const getTasks = () => dispatchEvent => {
    axios.get('/api/task')
      .then(res => {
        console.log('dispatching with axios get tasks call'),        
        dispatchEvent({
            type: GET_TASKS,
            payload: res.data
        })
      }).catch(err => console.log(err))
}

// GET a Task for a given id
export const getTask = (id) => dispatchEvent => {
    axios.get('/api/task/'+id)
      .then(res => {
        console.log('dispatching with axios get task call');
        dispatchEvent({
            type: GET_TASK,
            payload: res.data
        })
      }).catch(err => console.log(err))
}