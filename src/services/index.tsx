import { combineReducers } from "redux";

import { ingredientsReducer } from "./slices/ingredients-slice";
import { authorizationReducer } from "./slices/authorization-slice";
import { websocketReducer } from "./slices/websocket-slice";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  authorization: authorizationReducer,
  webSocket: websocketReducer,
});

export default rootReducer;
