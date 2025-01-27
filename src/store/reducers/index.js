import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "./authReducer/authReducer";
import userReducer from "./userReducer/userReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
})