import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/configureStore';    // redux-saga 사용
// import { BrowserRouter } from 'react-router-dom';



console.log(store.getState());  // reducers값 반환



ReactDOM.render(
  <App/>
    // <Provider store= {store}>
    //      {/* <BrowserRouter> */}
    //          <App />
    //      {/* </BrowserRouter> */}
    // </Provider>
, document.getElementById('root'));

