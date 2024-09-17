import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice"; // Import your API slices
import storage from "redux-persist/lib/storage"; // Use localStorage for persistence
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Define the persist configuration
const persistConfig = {
  key: "root",
  storage, // Using localStorage
};

// Combine all reducers (if you have more than one slice)
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer, // Add your slices here
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with persistedReducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: true, // Enable Redux DevTools
});

// Create the persistor
export const persistor = persistStore(store);

export default store;
