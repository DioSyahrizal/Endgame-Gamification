import axios, { Method } from "axios";
import { call, select } from "redux-saga/effects";

import { RootStore } from "interfaces/stores";
import * as env from "utils/env";

import { getAuthToken } from "store/auth/selectors";
import { validate } from "store/auth/sagas";

export const API_URL_ENDPOINT = env.getRuntimeEnv(
  "REACT_APP_RUNTIME_GAMA_SERVICE_URL",
  env.defaultEnvs["REACT_APP_RUNTIME_GAMA_SERVICE_URL"]
);

export function callApiSvc(
  token: string,
  type: Method,
  url: string,
  data?: any,
  base?: string
) {
  return axios({
    method: type,
    baseURL: base ? base : API_URL_ENDPOINT,
    url,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`
    },
    data
  }).then(resp => resp.data);
}

export function* callApi(type: Method, url: string, data?: any, base?: string) {
  try {
    const accessToken = yield select((state: RootStore) =>
      getAuthToken(state.auth)
    );

    return yield call(callApiSvc, accessToken, type, url, data, base);
  } catch (err) {
    if (err.response.statusCode === 403) {
      yield call(validate);
    }
    throw err;
  }
}

export function callApiWithoutToken(
  type: Method,
  url: string,
  data?: any,
  base?: string
) {
  return axios({
    url,
    data,
    method: type,
    baseURL: base ? base : API_URL_ENDPOINT,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  }).then(resp => resp.data);
}
