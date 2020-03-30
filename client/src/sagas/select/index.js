import { all, fork } from 'redux-saga/effects';
import { watchSelect } from './selectSaga';

export default function* selectSaga(){
    yield all ([
        fork(watchSelect)
    ])
}