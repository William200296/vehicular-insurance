const initialState = {
    BASE_URL: 'https://jsonplaceholder.typicode.com/',
    userDataRequest: {
        typeDocument: 'DNI',
        documentNumber: '',
        phoneNumber: '',
        licensePlate: '',
        privacyPolicies: null
    },
    userData: {},
    carDataRequest: {
        year: '',
        brand: '',
        carGas: null,
        insuredAmount: 14300
    },
    vehicularInsuranceRequest: {
        amount: 35
    },
    currentStep: 1,
    storedUser: false,
    navStyles: false
}

const GET_USER_DATA = 'GET_USER_DATA';
const SAVE_USER_DATA = 'SAVE_USER_DATA';
const SAVE_CAR_DATA = 'SAVE_CAR_DATA';
const SAVE_AMOUNT = 'SAVE_AMOUNT';
const SAVE_STEP = 'SAVE_STEP';
const SET_NAV_STYLES = 'SET_NAV_STYLES';


export default function reducerVehicularInsurance(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                userDataRequest: action.payload.userDataRequest
            }
        case SAVE_USER_DATA:
            return {
                ...state,
                userData: action.payload.userData, storedUser: action.payload.storedUser
            }
        case SAVE_CAR_DATA:
            return {
                ...state,
                carDataRequest: action.payload.carDataRequest
            }
        case SAVE_AMOUNT:
            return {
                ...state,
                vehicularInsuranceRequest: action.payload.vehicularInsuranceRequest
            }
        case SAVE_STEP:
            return {
                ...state,
                currentStep: action.payload.currentStep
            }
        case SET_NAV_STYLES:
            return {
                ...state,
                navStyles: action.payload.navStyles
            }
        default:
            return state;
    }
}

export const getUserDataReq = (userDataRequest) => async (dispatch, getState) => {
    try {

        dispatch({
            type: GET_USER_DATA,
            payload: {
                userDataRequest: userDataRequest
            }
        });

    } catch (error) {
        console.log(error);
    }
}

export const saveUserData = (userData) => async (dispatch, getState) => {
    try {

        dispatch({
            type: SAVE_USER_DATA,
            payload: {
                userData: userData,
                storedUser: true
            }
        });

    } catch (error) {
        console.log(error);
    }
}

export const saveCarData = (carDataRequest) => async (dispatch, getState) => {
    try {

        dispatch({
            type: SAVE_CAR_DATA,
            payload: {
                carDataRequest: carDataRequest
            }
        });

    } catch (error) {
        console.log(error);
    }
}

export const saveAmountData = (vehicularInsuranceRequest) => async (dispatch, getState) => {
    try {

        dispatch({
            type: SAVE_AMOUNT,
            payload: {
                vehicularInsuranceRequest: vehicularInsuranceRequest
            }
        });

    } catch (error) {
        console.log(error);
    }
}

export const saveCurrentStep = (currentStep) => async (dispatch, getState) => {
    try {

        dispatch({
            type: SAVE_STEP,
            payload: {
                currentStep: currentStep
            }
        });

    } catch (error) {
        console.log(error);
    }
}



export const updateNavStyles = (navStyles) => async (dispatch, getState) => {
    try {

        dispatch({
            type: SET_NAV_STYLES,
            payload: {
                navStyles: navStyles
            }
        });

    } catch (error) {
        console.log(error);
    }
}