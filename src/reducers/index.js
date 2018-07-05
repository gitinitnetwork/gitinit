import { combineReducers } from 'redux';

import matchReducer from './matchReducer';

const reducers = combineReducers({
  matches: matchReducer,
});

export default reducers;
