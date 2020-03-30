import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducers from '../reducers';
import rootSaga from '../sagas';
import { composeWithDevTools } from 'redux-devtools-extension'; 
// 리덕스 개발자 도구

// composeWithDevTools 를 사용하여 리덕스 개발자 도구 활성화
const sagaMiddleware = createSagaMiddleware();



// store를 만들고 saga륾 미들웨어로 사용한다.
const store = createStore(
    rootReducers, composeWithDevTools(
    applyMiddleware(sagaMiddleware),)
);
sagaMiddleware.run(rootSaga);


export default store;