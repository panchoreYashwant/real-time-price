import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "../slices/stockSlice";

const saveToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.warn(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    stocks: stockReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
