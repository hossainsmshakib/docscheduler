import { combineReducers } from '@reduxjs/toolkit';
import appointmentReducer from './slices/appointmentSlice';

const rootReducer = combineReducers({
  appointments: appointmentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
