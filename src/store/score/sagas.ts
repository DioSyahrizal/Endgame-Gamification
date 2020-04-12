import { ReduxAction } from "interfaces";
import { put, all, takeLatest, fork, call, select } from "redux-saga/effects";
import { fetchScoreSuccess } from "./actions";
import { ScoreActionTypes } from "./types";
import { callApi } from "utils/api/callApi";
import { RootStore } from "interfaces/stores";
import { getAuthSelected } from "store/auth/selectors";

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
    yield put(fetchScoreSuccess(res.point));
  } catch (error) {
    yield console.dir("error");
  }
}

function* watchFetchRequest() {
  yield takeLatest(ScoreActionTypes.FETCH_SCORE_REQUEST, handleFetchScore);
}

export default function* scoreSaga() {
  yield all([fork(watchFetchRequest)]);
}
