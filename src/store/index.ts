import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice';
import searchReducer from './searchSlice';

const store = configureStore({
  reducer: {
    registrations: registrationReducer,
    search: searchReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;