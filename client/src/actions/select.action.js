export const ADMIN_SELECT_REQUEST = 'ADMIN_SELECT_REQUEST';
export const ADMIN_SELECT_SUCCESS = 'ADMIN_SELECT_SUCCESS';
export const ADMIN_SELECT_FAILURE = 'ADMIN_SELECT_FAILURE';

export const OWNER_SELECT_REQUEST = 'OWNER_SELECT_REQUEST';
export const OWNER_SELECT_SUCCESS = 'OWNER_SELECT_SUCCESS';
export const OWNER_SELECT_FAILURE = 'OWNER_SELECT_FAILURE';


export const selectRequestActionAdmin = selected => ({
    type : ADMIN_SELECT_REQUEST,
    name : selected // payload : selected
});

export const selectSuccessActionAdmin = ( twoSales, totalSales, drinkRank, foodRank, GoodsRank ) => ({
    type : ADMIN_SELECT_SUCCESS, 
    twoSales, totalSales, drinkRank, foodRank, GoodsRank 
    // payload = {
    //     twoSales
    // }                    
})  // (주의)reducer(case문 seccess)에서 담는 변수명과 같아야한다!!! 

export const selectFailureActionAdmin = error => ({
    type : ADMIN_SELECT_FAILURE,
    error
})


// [Owner]
export const selectRequestActionOwner = selected => ({
    type : OWNER_SELECT_REQUEST,
    month : selected // payload : selected
});

export const selectSuccessActionOwner = ( totalSales, drinkRank, foodRank, GoodsRank ) => ({
    type : OWNER_SELECT_SUCCESS, 
    totalSales, drinkRank, foodRank, GoodsRank 
})  // (주의)reducer(case문 seccess)에서 담는 변수명과 같아야한다!!! 

export const selectFailureActionOwner = error => ({
    type : OWNER_SELECT_FAILURE,
    error
})