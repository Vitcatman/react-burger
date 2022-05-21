import { AnyAction, MiddlewareAPI } from "redux";
import { websocketActions } from "../slices/websocket-slice";

export const websocketMiddleware = (wsActions: typeof websocketActions) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, wsSuccess, wsError, wsClose, saveData } = wsActions;

      if (type === wsStart.type) {
        const wsUrl = payload.token
          ? `${payload.url}?token=${payload.token}`
          : `${payload.url}`;
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = () => {
          console.log("Connection established");
          dispatch(wsSuccess());
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const { success, ...parsedData } = JSON.parse(data);
          if (success) {
            dispatch(saveData(parsedData));
          }
        };

        socket.onerror = () => {
          dispatch(wsError());
        };

        socket.onclose = () => {
          dispatch(wsClose());
        };
      }

      next(action);
    };
  };
};
