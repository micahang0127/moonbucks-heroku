// reducer들을 한 곳에 모은다.
import { combineReducers } from 'redux';
import { default as selectReducer} from './select.reducer';
import { default as radioReducer} from './radio.reducers';

// combineReduers은 여러개의 reducer들을 하나로 합쳐준다.
const rootReducer = combineReducers({
    selected : selectReducer,   // component의 (mapStateToProps에서 여기서 정한 객체명 사용)해 데이터를 가져간다.        
    adminRadio :radioReducer,
});

export default rootReducer;
