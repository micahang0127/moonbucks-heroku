export const RADIO_REQUEST = 'RADIO_REQUEST';
export const RADIO_SUCCESS = 'RADIO_SUCCESS';
export const RADIO_FAILURE = 'RADIO_FAILURE';

export const radioRequestAction = selected => ({
    type : RADIO_REQUEST,
    category : selected // payload : selected
});

export const radioSuccessAction = payload => ({
    type : RADIO_SUCCESS, 
    payload                     // (주의)  // (주의)reducer(case문 seccess)에서 담는 변수명과 같아야한다!!! 
})

export const radioFailureAction = error => ({
    type : RADIO_FAILURE,
    error
})