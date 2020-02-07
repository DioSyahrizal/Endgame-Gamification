import { ReduxAction } from "interfaces";
import { put, all, takeLatest, fork } from "redux-saga/effects";
import { fetchScoreSuccess } from "./actions";
import { ScoreActionTypes } from "./types";

const dummyScore = 200;

function* handleFetchScore({ payload }: ReduxAction) {
  try {
    yield console.dir(payload);
    yield put(fetchScoreSuccess(dummyScore));
  } catch (error) {}
}

function* watchFetchRequest() {
  yield takeLatest(ScoreActionTypes.FETCH_SCORE_REQUEST, handleFetchScore);
}

export default function* scoreSaga() {
  yield all([fork(watchFetchRequest)]);
}
