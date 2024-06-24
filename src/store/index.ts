import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice';

const store = configureStore({
  reducer: {
    registrations: registrationReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;