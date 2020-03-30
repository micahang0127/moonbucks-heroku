import * as actions from '../actions/radio.action';

const InitialState = {
    selected : ''
}

const radioReducer = (state = InitialState, { type, payload, error}) => {
    switch(type){
        case actions.RADIO_REQUEST:
            return {
                ...state, 
                selected : payload
            }
        case actions.RADIO_SUCCESS:
            // console.log('reducer'+payload);     // (주의)action(selectSuccessAction)에서 담는 변수명과 같아야한다!!! 
            return {
                ...state, 
                result : payload
            }
        case actions.RADIO_FAILURE:
            return {
                ...state, 
                error
            }
        default:
            return state;
    }
}

export default radioReducer;
