import { Game } from "./game";

export interface Guess {
  slug: string;
  matchDay: number;
  games: Game[];
}