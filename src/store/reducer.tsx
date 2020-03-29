import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import { scoreReducer } from "./score/reducers";
import { authReducer } from "./auth/reducers";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    score: scoreReducer,
    auth: authReducer
    // rest of your reducers
  });

export default createRootReducer;
