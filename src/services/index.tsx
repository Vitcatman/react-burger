import { combineReducers } from "redux";
import { ingredientsReducer } from "./slices/ingredients-slice";
import { authorizationReducer } from "./slices/authorization-slice";
import { websocketReducer } from "./slices/websocket-slice";
import { configureStore } from "@reduxjs/toolkit";
import { websocketMiddleware } from "./middlewares/websocket-middleware";
import { websocketActions } from "./slices/websocket-slice";
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  authorization: authorizationReducer,
  webSocket: websocketReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware(websocketActions)),
  devTools: process.env.NODE_ENV !== "production",
});

export type TRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export default rootReducer;
