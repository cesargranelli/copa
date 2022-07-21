import { Game } from "./game";
import { User } from "./user";

export interface Bet {
  user: User;
  game: Game;
}
