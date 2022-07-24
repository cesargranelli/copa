import { Score } from "./score";
import { Team } from "./team";

export class Game {
  id: number;
  utcDate: string;
  lastUpdated: string;
  matchDay: number;
  homeTeam: Team;
  awayTeam: Team;
  score: Score = new Score();
}
