import {configureStore} from '@reduxjs/toolkit';
import stockReducer from './reducers/stockSlice';

// redux store config
export const store = configureStore({
  reducer: {
    stock: stockReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
