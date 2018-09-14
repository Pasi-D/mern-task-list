import axios from 'axios';

import {
    GET_TASK,    
    GET_TASKS_API
} from './types'

// GET all tasks
export const getTasks = () => dispatchEvent => {
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