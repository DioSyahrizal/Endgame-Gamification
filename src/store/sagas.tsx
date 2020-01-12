import { all, fork } from "redux-saga/effects";

import scoreSaga from "./score/sagas";

// function* onLocationChange() {
//   const { pathname } = yield select(
//     (state: RootStore) => state.router.location
//   );

//   if (/^(\/dashboard)/.test(pathname)) {
//     yield put(fetchScoreRequest(1));
//   }
// }

// function* watchOpenDashboard() {
//   yield takeLatest(LOCATION_CHANGE, onLocationChange);
// }

export function* rootSaga() {
  yield all([fork(scoreSaga)]);
}
