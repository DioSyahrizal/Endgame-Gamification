import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";

import rootReducer from "./reducer";
import { rootSaga } from "./sagas";
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

const composeEnhancers = composeWithDevTools({});

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer(history),
    composeEnhancers(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(routerMiddleware(history))
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
