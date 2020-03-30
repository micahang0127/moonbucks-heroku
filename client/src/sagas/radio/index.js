import { all, fork } from 'redux-saga/effects';
import { watchRadio } from './radioSaga';

export default function* radioSaga(){
    yield all ([
        fork(watchRadio)
    ])
}