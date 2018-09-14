import test from 'tape';

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

    assert.deepEqual(
        gen.next(),
        { done: true, value: undefined },
        'workerFetchTasks Saga must be done'
    )

    assert.end();
    
});