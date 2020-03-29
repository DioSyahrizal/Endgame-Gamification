import { all, fork } from "redux-saga/effects";

import scoreSaga from "./score/sagas";
import authSaga from "./auth/sagas";
import appSaga from "./app/sagas";

export function* rootSaga() {
  yield all([fork(appSaga), fork(scoreSaga), fork(authSaga)]);
}
