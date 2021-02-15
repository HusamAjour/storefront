import {createStore, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import data from './data.js'
import cart from './cart.js'

let reducers = combineReducers({data, cart});

const store = () => {
    console.log('inside stroe');
    return createStore(reducers, composeWithDevTools())
}

export default store();
