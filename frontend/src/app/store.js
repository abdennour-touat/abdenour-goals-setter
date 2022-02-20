import { configureStore } from "@reduxjs/toolkit";
//here we call the reducers and add them to the reducers object
import authReducer from "../features/auth/authSlice";
import goalsReducer from "../features/goals/goalSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
  },
});
