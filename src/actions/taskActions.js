import axios from 'axios';

import {
    GET_TASK,
    GET_TASKS,
    GET_TASKS_API
} from './types'

// GET all tasks
export const getTasks = () => dispatchEvent => {
    /* Moved to workerSaga in sagas.js
    
    axios.get('/api/task')
      .then(res => {
        console.log('dispatching with axios get tasks call'),        
        dispatchEvent({
            type: GET_TASKS,
            payload: res.data
        })
      }).catch(err => console.log(err)) */
      

      dispatchEvent(
         {
             type: GET_TASKS_API
         } 
      )
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