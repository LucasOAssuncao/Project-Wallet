import { combineReducers } from 'redux';
import formUserReducer from './user';
import formWalletReducer from './wallet';

const rootReducer = combineReducers({ formUserReducer, formWalletReducer });
export default rootReducer;
