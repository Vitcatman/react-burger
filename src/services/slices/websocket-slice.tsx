import { createSlice } from "@reduxjs/toolkit";
import { TFeed } from "../../utils/types";
import { TRootState } from "../index"

type TInitialState = {
  webSocket: null | WebSocket,
  isConnected: boolean,
  hasError: boolean,
  feed: TFeed[],
  total: null | number,
  totalToday: null | number,
}

const initialState: TInitialState = {
  webSocket: null,
  isConnected: false,
  hasError: false,
  feed: [],
  total: null,
  totalToday: null,
};

export const websocketSlice = createSlice({
  name: "webSocket",
  initialState,
  reducers: {
    wsStart: (state, { payload }) => {},

    wsSuccess: (state) => {
      state.isConnected = true;
      state.hasError = false;
    },
    wsError: (state) => {
      state.isConnected = false;
      state.hasError = true;
    },
    wsClose: (state) => {
      state.isConnected = false;
      state.hasError = false;
    },
    saveData: (state, { payload }) => {
      state.feed = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
    },
  },
});

export const { wsStart, wsSuccess, wsError, wsClose, saveData } =
  websocketSlice.actions;
export const websocketActions = websocketSlice.actions;

export const websocketSelector = (state: TRootState) => state.webSocket;
export const websocketReducer = websocketSlice.reducer;
