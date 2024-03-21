import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import postReducer from "./postReducer";
export  const reducers=combineReducers({authReducer,postReducer})
