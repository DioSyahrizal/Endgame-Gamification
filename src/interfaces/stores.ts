import { RouterState } from "connected-react-router";
import { ScoreState } from "./score";
import { AuthState } from "./auth";

export interface RootStore {
  router: RouterState;
  score: ScoreState;
  auth: AuthState;
}
