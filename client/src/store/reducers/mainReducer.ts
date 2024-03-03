import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";

export const mainReducer = combineReducers({
    users: usersReducer,
    auth: authReducer
})