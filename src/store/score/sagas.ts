import { put, all, takeLatest, fork, call, select } from "redux-saga/effects";
import {
  fetchScoreSuccess,
  fetchBuyItemSuccess,
  buyLevelMedSuccess,
  buyLevelHardSuccess,
} from "./actions";
import { ScoreActionTypes } from "./types";
import { callApi } from "utils/api/callApi";
import { RootStore } from "interfaces/stores";
import { getAuthSelected } from "store/auth/selectors";
import { ReduxAction } from "interfaces";

function* handleFetchScore() {
  try {
    const selectedClient = yield select(({ auth }: RootStore) =>
      getAuthSelected(auth)
    );
    const res = yield call(
      callApi,
      "get",
      `/score?id_user=${selectedClient.id}`
    );
    yield put(fetchScoreSuccess(res));
  } catch (error) {
    yield console.dir("error");
  }
}

function* handleBuyAction() {
  yield put(fetchBuyItemSuccess());
}

function* handlebuyLevelMed({ payload }: ReduxAction) {
  yield put(buyLevelMedSuccess(payload));
}

function* handlebuyLevelHard({ payload }: ReduxAction) {
  yield put(buyLevelHardSuccess(payload));
}

function* watchFetchRequest() {
  yield takeLatest(ScoreActionTypes.FETCH_SCORE_REQUEST, handleFetchScore);
}

function* watchBuyAction() {
  yield takeLatest(ScoreActionTypes.FETCH_BUYITEM_REQUEST, handleBuyAction);
}

function* watchBuyLevelMed() {
  yield takeLatest(
    ScoreActionTypes.FETCH_BUYLEVELMED_REQUEST,
    handlebuyLevelMed
  );
}

function* watchBuyLevelHard() {
  yield takeLatest(
    ScoreActionTypes.FETCH_BUYLEVELHARD_REQUEST,
    handlebuyLevelHard
  );
}

export default function* scoreSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchBuyAction),
    fork(watchBuyLevelMed),
    fork(watchBuyLevelHard),
  ]);
}
