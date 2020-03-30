import { all, fork } from 'redux-saga/effects';

import select from './select';  // index.js 파일이 있어야 옮겨진다.
import radio from './radio';

export default function* rootSaga(){
    yield all([
        fork(select),
        fork(radio),
    ]);
}