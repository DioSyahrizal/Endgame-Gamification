import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import { scoreReducer } from "./score/reducers";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    score: scoreReducer
    // rest of your reducers
  });

export default createRootReducer;
