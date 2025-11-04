import { configureStore } from '@reduxjs/toolkit';
import {
  propertiesReducer,
  PropertiesState
} from '../slices/getPropertiesSlice';

const store = configureStore({
  reducer: {
    properties: propertiesReducer
  }
});

export type AppState = {
  properties: PropertiesState;
};

export type AppDispatch = typeof store.dispatch;

export default store;
