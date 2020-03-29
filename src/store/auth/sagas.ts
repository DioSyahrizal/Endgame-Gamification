import { call, put, take, race, select, takeLatest } from "redux-saga/effects";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { push } from "connected-react-router";

import { AuthActionTypes } from "./types";
import {
  fetchLoginSuccess,
  fetchLoginError,
  detailUserSuccess,
  clearAuth
} from "./actions";
import {
  authorize,
  callLogin,
  setToken,
  getToken,
  clearToken
} from "utils/api/token";
import { Token } from "interfaces/auth";
import { CK_LAST_PATH } from "store/app/sagas";
import { RootStore } from "interfaces/stores";
import { getIsAuthenticated } from "./selectors";

function* login(email: string, password: string) {
  try {
    const auth: Token = yield call(authorize, email, password);
    if (auth.token) {
      const detail: Record<string, any> = jwt_decode(auth.token);
      const userDetail = yield call(
        callLogin,
        auth.token,
        "get",
        `/user/${detail.id}`
      );
      auth.detail = userDetail.data;
      console.dir(auth);
      setToken(auth, { expires: 2 });
      yield put(fetchLoginSuccess(auth.token));
      yield put(detailUserSuccess(userDetail));
      yield put(push("/dashboard"));
      yield console.dir("Success Login");
    } else {
      yield put(fetchLoginError("Invalid email or password"));
    }
  } catch (error) {
    yield put(fetchLoginError(error));
  }
}

/**
 *  API authentication request/response handler. Used to validate the access token
 *  and/or get the user object. If an `invalid_token` error is returned, tries to
 *  refresh the access token before throwing.
 *  @param   {string}     tokenId
 *  @return  {Generator}
 */
function* authenticate(tokenId: string) {
  try {
    const detail: Record<string, any> = jwt_decode(tokenId);
    const userDetail = yield call(
      callLogin,
      tokenId,
      "get",
      `/user/${detail.id}`
    );
    return userDetail.data;
  } catch (error) {
    yield call(logout);
  }
}

/**
 * validate stored token in cookies
 * @param {boolean}    initial
 * @return  {Generator}
 */
export function* validate() {
  const tokens = getToken();
  if (tokens) {
    yield call(authenticate, tokens.id);
  }
}

function* authFlowSaga(): any {
  const tokens = getToken();
  console.dir(tokens);
  const hasUser = yield select((state: RootStore) =>
    getIsAuthenticated(state.auth)
  );

  while (!hasUser) {
    yield call(loggedOutFlowSaga);
  }

  if (hasUser) {
    yield call(createAuthenticateToken, tokens);
    yield takeLatest(AuthActionTypes.CLEAR_REQUEST, logout);
  }
}

/**
 * create user token
 * @param  {string} id  userId
 */
function* createAuthenticateToken(payload: any) {
  try {
    const detail = yield call(authenticate, payload.token);
    payload.detail = detail;

    if (payload) {
      localStorage.setItem("auth_selected", JSON.stringify(payload));
      yield put(fetchLoginSuccess(payload.token));
    }
  } catch (error) {
    yield call(logout);
  }
}

/**
 *  User logout, deletes all tokens from local storage and update the store.
 *  @return  {Generator}
 */
function* logout() {
  clearToken();
  Cookies.set(CK_LAST_PATH, "/");
  sessionStorage.clear();
  localStorage.clear();
  yield put(clearAuth());
  window.location.assign("/");
}
function* loggedOutFlowSaga() {
  const { credentials, validation } = yield race({
    credentials: take(AuthActionTypes.FETCH_AUTH_REQUEST),
    validation: take(AuthActionTypes.VALIDATION)
  });

  if (credentials) {
    const { email, password } = credentials.payload;
    yield call(login, email, password);
  }

  if (validation) {
    yield call(validate);
  }

  yield call(authFlowSaga);
}

export default authFlowSaga;
