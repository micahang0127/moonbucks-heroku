import { call, put, takeEvery } from 'redux-saga/effects';
// import { call, put, takeEvery, delay } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../../actions/radio.action';


function radioApi( category ){     // action에서 json key값을 name이라고 줌, 여기는 상관없음(쿼리문 ?인자에서 res.data.name을 찾도록 돼있음)
    if(category === 'Drink'){
         return axios.post('/api/ProductRankDrink');

    }else{
        return axios.post('/api/ProductRank', category  );
    }
}


function* radio( payload ){
    try{
        const category = payload;
        const { data } = yield call(radioApi, category);
        yield put(actions.radioSuccessAction(data));

    }catch(error){
        console.error('radio saga error'+ error.response);
        yield put(actions.radioFailureAction(error));       // axios에서 에러
    }
}

export function* watchRadio(){
    yield takeEvery(actions.RADIO_REQUEST, radio);
}