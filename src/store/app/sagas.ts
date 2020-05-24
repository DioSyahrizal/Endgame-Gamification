import { all, fork, select, takeLatest } from "redux-saga/effects";
import * as Cookies from "js-cookie";
import { LOCATION_CHANGE } from "connected-react-router";

import { RootStore } from "interfaces/stores";

export const CK_LAST_PATH = "gama.last_path";

function* onLocationChange() {
  const { pathname } = yield select(
    (state: RootStore) => state.router.location
  );

  if (!/^(\/user)(\/fisika|\/kimia)(\/easy|\/medium|\/hard)/.test(pathname)) {
    Cookies.set(CK_LAST_PATH, pathname);
  }
}

function* watchLocation() {
  yield takeLatest(LOCATION_CHANGE, onLocationChange);
}

function* appFlow() {
  yield all([fork(watchLocation)]);
}

export default appFlow;
