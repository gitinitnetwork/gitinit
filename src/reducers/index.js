import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';


import matchReducer from './matchReducer';

const reducers = combineReducers({
  matches: matchReducer,
})


export default reducers;
