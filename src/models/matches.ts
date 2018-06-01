import { MatchesProvider } from "../providers/matches/matches";

export class Matches {

  private match = [];

  constructor(
    public matchesService: MatchesProvider
  ) { }

  forDate(): any {
    return this.matchesService.roundMatches(1).subscribe(matches => {
      matches = this.events(matches.roundMatches.tournaments);
    });
  }

  private events(tournaments): any {
    for (let tournament of tournaments) {
      for (let event of tournament.events) {
        this.match.push([{
          'round': event.roundInfo.round,
          'status': event.status.type,
          //'homeTeam': event.homeTeam.name,
          //'homeScore': event.homeScore.current,
          //'awayTeam': event.awayTeam.name,
          //'awayScore': event.awayScore.current,
          //'startTime': event.startTime,
          //'formatedStartDate': event.formatedStartDate,
          //'startTimestamp': event.startTimestamp
        }]);
      }
    }

    return this.match;

  }

}
