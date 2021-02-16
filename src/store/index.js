import {createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import data from './products'
import cart from './cart.js'

let reducers = combineReducers({data, cart});

const store = () => {
    console.log('inside stroe');
    return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
}

export default store();
