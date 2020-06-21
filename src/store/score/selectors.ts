import { ScoreState } from "interfaces/score";

export const getScoreData = (store: ScoreState) => store.data.point;

export const getCoinData = (store: ScoreState) => store.data.coin;
