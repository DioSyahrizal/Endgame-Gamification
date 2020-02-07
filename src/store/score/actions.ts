import { action } from "typesafe-actions";
import { ScoreActionTypes } from "./types";

export const fetchScoreRequest = (id: number) =>
  action(ScoreActionTypes.FETCH_SCORE_REQUEST, id);

export const fetchScoreError = (message: string) =>
  action(ScoreActionTypes.FETCH_SCORE_ERROR, message);

export const fetchScoreSuccess = (score: any) =>
  action(ScoreActionTypes.FETCH_SCORE_SUCCESS, score);
