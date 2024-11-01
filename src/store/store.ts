import { configureStore, Middleware } from '@reduxjs/toolkit';
import api from './middleware/api';
import jobSlice from './jobs';

const store = configureStore({
  reducer: {
    jobs: jobSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api as Middleware),
});
export default store;
