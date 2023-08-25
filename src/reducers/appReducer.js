import { combineReducers } from "redux";
import { DESTROY_SESSION } from "../actionTypes/actionTypes";
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";

const appReducer = combineReducers({
  userReducer,
  tokenReducer,
});

const rootReducer = (state, action) => {
  if (action.type === DESTROY_SESSION) state = undefined;

  return appReducer(state, action);
};
export default rootReducer;
