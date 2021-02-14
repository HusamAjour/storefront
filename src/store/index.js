import {createStore, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import data from './data.js'

let reducers = combineReducers({data});

const store = () => {
    console.log('inside stroe');
    return createStore(reducers, composeWithDevTools())
}

export default store();
