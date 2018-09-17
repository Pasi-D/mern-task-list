import {
    GET_TASKS,
    GET_TASK,
    API_FAIL
} from '../src/actions/types'

import taskReducer from "../src/reducers/taskReducer";

describe('>>> R E D U C E R --- Test taskReducer', () => {
    it('+++  Reducer for GET_TASKS', () => {
        let state = {}
        let newState = {
                            "_id": "5b963c959cf78a22a43c0ff2",
                            "title": "Task two",
                            "description": "Second Task",
                            "end_date": "2018-09-21T00:00:00.000Z",
                            "__v": 0,
                            "status": true,
                            "start_date": "2018-09-13T00:00:00.000Z"
                      }
        
        state = taskReducer(state, {type: GET_TASKS, payload: newState})            
        expect(state).toEqual({tasks: newState})
    });

    it('+++ Reducer for GET_TASK', () => {
        let state = {}
        let newState = {
                            "_id": "5b963c959cf78a22a43c0ff2",
                            "title": "Task two",
                            "description": "Second Task",
                            "end_date": "2018-09-21T00:00:00.000Z",
                            "__v": 0,
                            "status": true,
                            "start_date": "2018-09-13T00:00:00.000Z"
                      }
        state = taskReducer(state, {type: GET_TASK, payload: newState})
        expect(state).toEqual({task: newState})

    });

    it('+++ Reducer for API_FAIL', () => {
        let error = {
            respons: {
                data: 'Error on api call'
            }
        }

        let state = {}
        state = taskReducer(state, {type: API_FAIL, err: error})
        expect(state).toEqual({errors: error})
    })
})