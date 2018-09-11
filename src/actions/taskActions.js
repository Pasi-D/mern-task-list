import axios from 'axios';

import {
    GET_TASK,
    GET_TASKS
} from './types'

// GET all tasks
export const getTask = () => dispatch => {
    axios.get('/api/task')
      .then(res => {
        console.log('dispatching with axios get tasks call'),        
        dispatch({
            type: GET_TASKS,
            payload: res.data
        })
      });
}