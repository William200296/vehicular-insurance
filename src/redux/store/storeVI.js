import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducerVehicularInsurance from '../reducers/UserReducer.reducer';

const reducers = combineReducers({
    storedData: reducerVehicularInsurance
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
    return store;
}