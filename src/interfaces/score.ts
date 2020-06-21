export interface ScoreState {
  loading: boolean;
  errors: string | null;
  data: { point: number; coin: number };
}
