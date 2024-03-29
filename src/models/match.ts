import { Score } from "./score";
import { Team } from "./team";

export interface Match {
  id: number;
  utcDate: string;
  matchDay: number;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
}
