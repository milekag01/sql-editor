import {combineReducers} from 'redux';
import requests from './requests';
import entities from './entities';

const appReducers = combineReducers({
  entities,
  requests,
});

const rootReducer = (state, action) => {

  return appReducers(state, action);
};

export default rootReducer;
