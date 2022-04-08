import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ingredients from './services/slices/ingredients-slice'

const store = configureStore({
  reducer: {ingredients},
  devTools: process.env.NODE_ENV !== 'production',
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
