import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    // @ts-ignore
    wsStart: (state, { payload }) => {},

    wsSuccess: (state) => {
      state.isConnected = true;
      state.hasError = false;
    },
    wsError: (state) => {
      state.isConnected = false;
      state.hasError = true;
    },
    wsStop: (state) => {
      state.isConnected = false;
      state.hasError = false;
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

export const { wsStart, wsStop, wsSuccess, wsError, wsClose, saveData } =
  websocketSlice.actions;
export const websocketActions = websocketSlice.actions;

export const websocketSelector = (state) => state.webSocket;
export const websocketReducer = websocketSlice.reducer;
