import {    
    GET_TASKS,
    GET_TASK
} from '../actions/types'

const initialState = {
    tasks: null, //for all tasks in calling 
    task: null   //for an individual task
}

export default function(state=initialState, action){
    switch (action.type) { 
        // GET all Tasks       
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload
            };
        // GET a Task            
        case GET_TASK:
            return {
                ...state,
                task: action.payload
            };
        default:
            return state;
    }
}