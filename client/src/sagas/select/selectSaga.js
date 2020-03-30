import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../../actions/select.action';


const TwoMonthSalesStore =( name ) =>{     // action에서 json key값을 name이라고 줌, 여기는 상관없음(쿼리문 ?인자에서 res.data.name을 찾도록 돼있음)
     return axios.post('/api/salesTwoMonthStore', name)
}

const totalSalesStore = ( name ) => {     
     return axios.post('/api/totalSalesStore', name)
}

const DrinkRankStore = (name) => {     
     return axios.post('/api/drinkRankStore', name)
}
const FoodRankStore = (name) => {     
     return axios.post('/api/foodRankStore', name)
}
const GoodsRankStore = (name) => {     
     return axios.post('/api/goodsRankStore', name)
}

function selectAdminApi(name){
    return axios.all([TwoMonthSalesStore(name), totalSalesStore(name),
                       DrinkRankStore(name), FoodRankStore(name), GoodsRankStore(name)
                    ])
                    // .then(axios.spread((...req) => {
                    //     const  twoMonthSales = req[0];
                    //     const  totalSales = req[1];

                    //     console.log('333'+JSON.stringify(twoMonthSales)+ JSON.stringify(totalSales));

                    // })).catch((err) => {
                    //     console.error(err)
                    // })
}

function* selectAdmin( payload ){
     console.log('사가 진입'+ JSON.stringify(payload))
    try{
        const selected = payload;

        // const  { data }  = yield call(selectApi, selected);  // {data}로 감싸면 , status:200 등의 데이터없이 딱 원하는 데이터만 얻을수 있다.
        const  data   = yield call(selectAdminApi, selected);        // 하지만, axios.all에서 받아오니, {data}로 하면 데이터 안받아옴
         //  console.log('select saga yield call'+JSON.stringify(data[0].data))    

        yield put(actions.selectSuccessActionAdmin(
                    data[0].data, data[1].data, data[2].data, data[3].data, data[4].data 
                ));

    }catch(error){
        console.error('select saga error'+ error.response);
        yield put(actions.selectFailureActionAdmin(error));       // axios에서 에러
    }
}



// [owner]
const totalSalesMonthStore = (month) => {       
     return axios.post('/api/totalSalesMonthStroe', month)
}

const drinkRankMonthStore = (month) => {      
     return axios.post('/api/drinkRankMonthStore', month)
}

const foodRankMonthStore = (month) => {     
     return axios.post('/api/foodRankMonthStore', month)
}

const goodsRankMonthStore = (month) => {     
     return axios.post('/api/goodsRankMonthStore', month)
}

// axio all
function selectOwnerApi(month){
     return axios.all([totalSalesMonthStore(month), 
                       drinkRankMonthStore(month), foodRankMonthStore(month), goodsRankMonthStore(month)
                     ])
 }



function* selectOwner( payload ){
    try{
        const selected = payload;

        const data  = yield call(selectOwnerApi, selected);        

        yield put(actions.selectSuccessActionOwner(
                    data[0].data, data[1].data, data[2].data, data[3].data
                ));

    }catch(error){
        console.error('select saga error'+ error.response);
        yield put(actions.selectFailureActionOwner(error));       // axios에서 에러
    }
}

export function* watchSelect(){
    yield takeEvery(actions.ADMIN_SELECT_REQUEST, selectAdmin);
    yield takeEvery(actions.OWNER_SELECT_REQUEST, selectOwner);
}