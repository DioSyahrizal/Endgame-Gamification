import { RouterState } from "connected-react-router";
import { ScoreState } from "./score";

export interface RootStore {
  router: RouterState;
  score: ScoreState;
}
