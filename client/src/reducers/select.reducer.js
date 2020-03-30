import * as actions from '../actions/select.action';

const InitialState = {
    selected : ''
}

const selectReducer = (state = InitialState, { type, payload, twoSales, totalSales, drinkRank, foodRank, GoodsRank , error}) => {
    switch(type){
        // [admin]
        case actions.ADMIN_SELECT_REQUEST:
            return {
                ...state, 
                selected : payload
            }
        case actions.ADMIN_SELECT_SUCCESS:
            // (주의)action(selectSuccessAction)에서 담는 변수명과 같아야한다!!! 
            return {
                ...state, 
                result : {
                    twoSales, totalSales, drinkRank, foodRank, GoodsRank 
                }
                // result : payload
            }
        case actions.ADMIN_SELECT_FAILURE:
            return {
                ...state, 
                error
            }
        // [owner]
        case actions.OWNER_SELECT_REQUEST:
            return {
                ...state, 
                selected : payload
            }
        case actions.OWNER_SELECT_SUCCESS:
            // (주의)action(selectSuccessAction)에서 담는 변수명과 같아야한다!!! 
            return {
                ...state, 
                result : {
                    totalSales, drinkRank, foodRank, GoodsRank
                }
            }
        case actions.OWNER_SELECT_FAILURE:
            return {
                ...state, 
                error
            }
        default:
            return state;
    }
}

export default selectReducer;
