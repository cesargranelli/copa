import { HttpClient } from "@angular/common/http";
import { Component, Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, Loading, LoadingController, IonicPage, NavController, NavParams, Platform } from "ionic-angular";

import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs";

@Injectable()
@IonicPage()
@Component({
  selector: "page-hunch",
  templateUrl: "hunch.html"
})
export class HunchPage {

  public userid;
  public slug;

  public dateStart: String = "2018-06-14"; // Data início da copa
  public dateEnd: String = "2018-07-15"; // Data fim da copa
  public dateFrom: String = "2018-06-14";
  public dateTo: String = "2018-06-15";

  public basepath = "/api"; // Para teste em desenvolvimento

  public selectDefault: string = "2018-06-14";
  public dates$: Observable<any>;
  public matches$: Observable<any>;

  hunchForm: FormGroup;

  // Teste
  dateHoje: number = new Date().getTime();
  dateFech: number;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private platform: Platform,
    private db: AngularFirestore,
    private http: HttpClient,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {

    this.userid = this.navParams.get('userid');
    this.slug   = this.navParams.get('slug');

    db.firestore.settings({ timestampsInSnapshots: true });
    //if (this.platform.is("cordova")) {
    //  this.basepath = "https://www.sofascore.com";
    //}
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
    this.dateFech = new Date(Date.UTC(date.substr(0, 4), date.substr(5, 2), date.substr(8, 2))).getTime();

    let dateMathes = date.substr(8, 2) + date.substr(5, 2) + date.substr(0, 4);

    this.db
      .collection("hunches")
      .doc(this.slug)
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
    let dateIni = Date.UTC(Number(date.substr(0, 4)), Number(date.substr(5, 2))-1, Number(date.substr(8, 2))).toString().substring(0, 10);
    let dateFim = Date.UTC(Number(date.substr(0, 4)), Number(date.substr(5, 2))-1, Number(date.substr(8, 2))+1).toString().substring(0, 10);

    this.matches$ = this.http.get(`${this.basepath}/u-tournament/16/season/7528/matches/week/${dateIni}/${dateFim}`);
    //this.matches$ = this.http.get(`api_week.php?dateIni=${dateIni}&dateFim=${dateFim}`);
    this.matches$.subscribe(matches => {
      for (let tournament in matches.weekMatches.tournaments) {
        for (let event in matches.weekMatches.tournaments[tournament].events) {
          let match = matches.weekMatches.tournaments[tournament].events[event];
          this.db
            .collection("hunches")
            .doc(this.slug)
            .collection(match.formatedStartDate.replace(/\./g, ""))
            .doc(String(match.id))
            .set({
              id: match.id,
              round: match.roundInfo.round,
              startTimestamp: match.startTimestamp,
              formatedStartDate: match.formatedStartDate,
              startTime: match.startTime,
              homeTeam: match.homeTeam.name,
              homeSlug: match.homeTeam.slug,
              homeLogo: `https://www.sofascore.com/images/team-logo/football_${match.homeTeam.id}.png`,
              homeScore: null,
              awayTeam: match.awayTeam.name,
              awaySlug: match.awayTeam.slug,
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
             .doc(this.slug)
             .collection(dateMathes, ref => ref.orderBy("startTime"))
             .valueChanges();
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();

    for (let i = 0; i < event.srcElement.children.length -1; i++) {
      let docId     = event.srcElement.children.item(i).getElementsByTagName("ion-grid").item(0).id;
      let startDate = event.srcElement.children.item(i).getElementsByTagName("ion-col").item(0).id;
      let homeScore = event.srcElement.children.item(i).getElementsByTagName("input").item(0).value;
      let awayScore = event.srcElement.children.item(i).getElementsByTagName("input").item(1).value;
      let update    = String(new Date().getTime());

      this.db
        .collection("hunches")
        .doc(this.slug)
        .collection(startDate.replace(/\./g, ""))
        .doc(docId)
        .update({
          homeScore: homeScore,
          awayScore: awayScore,
          update: update
        })
        .catch(error => {
          this.showAlert(error);
          loading.dismiss();
        });
    }

    loading.dismiss();

  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
