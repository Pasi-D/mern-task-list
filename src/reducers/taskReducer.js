import {
    ADD_TASK,
    GET_TASKS,
    GET_TASK
} from '../actions/types'

const initialState = {
    tasks: {}, //for all tasks in calling 
    task: null   //for an individual task
}

export default function(state=initialState, action){
    switch (action.type) { 
        // GET all tasks       
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload
            }
        default:
            return state;
    }
}