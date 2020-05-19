import { action } from "typesafe-actions";
import { ScoreActionTypes } from "./types";

export const fetchScoreRequest = () =>
  action(ScoreActionTypes.FETCH_SCORE_REQUEST);

export const fetchScoreError = (message: string) =>
  action(ScoreActionTypes.FETCH_SCORE_ERROR, message);

export const fetchScoreSuccess = (score: any) =>
  action(ScoreActionTypes.FETCH_SCORE_SUCCESS, score);

export const fetchBuyItem = () =>
  action(ScoreActionTypes.FETCH_BUYITEM_REQUEST);

export const fetchBuyItemSuccess = () =>
  action(ScoreActionTypes.FETCH_BUYITEM_SUCCESS);
