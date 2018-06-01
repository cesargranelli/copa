import { HttpClient } from "@angular/common/http";
import { Component, Injectable } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";

import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs";

@Injectable()
@IonicPage()
@Component({
  selector: "page-hunch",
  templateUrl: "hunch.html"
})
export class HunchPage {
  public dateStart: String = "2018-06-14"; // Data início da copa
  public dateEnd: String = "2018-07-15"; // Data fim da copa
  public dateFrom: String = "2018-06-14";
  public dateTo: String = "2018-06-15";

  public basepath = "/api"; // Para teste em desenvolvimento

  public selectDefault: string = "2018-06-14";
  public dates$: Observable<any>;
  public matches$: Observable<any>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private platform: Platform,
    private db: AngularFirestore,
    private http: HttpClient
  ) {
    db.firestore.settings({ timestampsInSnapshots: true });
    if (this.platform.is("cordova")) {
      this.basepath = "https://www.sofascore.com";
    }
    if (new Date().getTime() >= new Date(this.dateEnd.toString()).getTime()) {
      this.dateFrom = this.dateEnd;
      this.dateTo = new Date(new Date(this.dateEnd.toString()).setHours(24)).toString();
    } else if (new Date().getTime() >= new Date(this.dateStart.toString()).getTime()) {
      this.dateFrom = new Date().toString();
      this.dateTo = new Date(new Date().setHours(24)).toString();
    }
  }

  ionViewDidLoad() {
    this.matchesDate(this.dateFrom);
    this.dates$ = this.db.collection("dates").valueChanges();
  }

  matchesDate(date) {
    let dateMathes = date.substr(8, 2) + date.substr(5, 2) + date.substr(0, 4);
    this.db
      .collection("hunches")
      .doc("rockman-dx")
      .collection(dateMathes)
      .valueChanges()
      .subscribe(matches => {
        if (!matches.length) {
          this.matchesForDate(date);
        } else {
          this.matches$ = this.matches(date);
        }
      });
  }

  matchesForDate(date) {
    //let dateIni = new Date(date).getTime().toLocaleString().substring(0, 10);
    //let dateFim = new Date(new Date(date).setHours(24)).getTime().toString().substring(0, 10);
    console.log(new Date(date)./*.getTime().*/toLocaleString({locales: 'pt-BR', timeZone: 'UTC'}));
    this.matches$ = this.http.get(`${this.basepath}/u-tournament/16/season/7528/matches/week/${dateIni}/${dateFim}`);
    this.matches$.subscribe(matches => {
      for (let tournament in matches.weekMatches.tournaments) {
        for (let event in matches.weekMatches.tournaments[tournament].events) {
          console.log(matches.weekMatches.tournaments[tournament].events[event]);
          let match = matches.weekMatches.tournaments[tournament].events[event];
          this.db
            .collection("hunches")
            .doc("rockman-dx")
            .collection(match.formatedStartDate.replace(/\./g, ""))
            .doc(String(match.id))
            .set({
              round: match.roundInfo.round,
              startTimestamp: match.startTimestamp,
              formatedStartDate: match.formatedStartDate,
              startTime: match.startTime,
              homeTeam: match.homeTeam.name,
              homeLogo: `https://www.sofascore.com/images/team-logo/football_${match.homeTeam.id}.png`,
              homeScore: null,
              awayTeam: match.awayTeam.name,
              awayLogo: `https://www.sofascore.com/images/team-logo/football_${match.awayTeam.id}.png`,
              awayScore: null
            })
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        }
      }
    });

    this.matches$ = this.matches(date);

  }

  matches(date): Observable<any> {
    let dateMathes = date.toString().substr(8, 2) + date.toString().substr(5, 2) + date.toString().substr(0, 4);
    return this.db
             .collection("hunches")
             .doc("rockman-dx")
             .collection(dateMathes)
             .valueChanges();
  }

}
