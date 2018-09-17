// tape test script
/* import test from 'tape';

import { put, call } from 'redux-saga/effects'
import { workerFetchTasks, fetchTasks } from './sagas'

import {
    GET_TASKS
} from'./actions/types';

test('testing sagas spec', (assert) => {

    const gen = workerFetchTasks();

    assert.deepEqual(
        gen.next().value,
        call(fetchTasks),
        'workerFetchTasks saga must call fetchTasks'
    )    

     
      

    const response = call(fetchTasks, 1);

    assert.deepEqual(
        gen.next().value,
        put({type: GET_TASKS, value: response.data}),
        'workerFetchTasks must dispatch'
    )

    assert.deepEqual(
        gen.next().value,
        { done: true, value: undefined },
        'workerFetchTasks Saga must be finished'
    ) 
 
    assert.end();
    
}); */

//Writing the whole script to test with jest
import { put, call } from 'redux-saga/effects'
import { workerFetchTasks, fetchTasks } from './sagas'

import {
    GET_TASKS,
    API_FAIL
} from '../../src/actions/types';

var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

describe('>>>Testing Saga workerfetchTasks', () => {
    const mock = new MockAdapter(axios)

    const generator = workerFetchTasks();

    it('+++ must calll fetchTasks', () => {
        const testfetchTask = generator.next().value
        expect(testfetchTask).toEqual(call(fetchTasks))
    })

    it('successfully mocks an actual network request', async () => {
        mock.onGet('/api/task').reply(200, {
            tasks: {
                
                "_id": "5b963c959cf78a22a43c0ff2",
                "title": "Task two",
                "description": "Second Task",
                "end_date": "2018-09-21T00:00:00.000Z",
                "__v": 0,
                "status": true,
                "start_date": "2018-09-13T00:00:00.000Z"
            
            }
        })

        /* Getting errors on calling */
        const tasks = await generator.next().value
        expect(tasks).toMatchObject({
            tasks: 
                {
                
                    "_id": "5b963c959cf78a22a43c0ff2",
                    "title": "Task two",
                    "description": "Second Task",
                    "end_date": "2018-09-21T00:00:00.000Z",
                    "__v": 0,
                    "status": true,
                    "start_date": "2018-09-13T00:00:00.000Z"
                
                }
            
        })
    })
})