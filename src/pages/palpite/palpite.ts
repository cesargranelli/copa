import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//import { HunchesProvider } from '../../providers/hunches/hunches';

//import { Matches } from '../../models/matches';
//import { MatchesProvider } from '../../providers/matches/matches';

@IonicPage()
@Component({
  selector: 'page-palpite',
  templateUrl: 'palpite.html',
})
export class PalpitePage {

  //public matches;

  public confrontos: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    //private hunchesService: HunchesProvider
    //public matchesService: MatchesProvider
  ) { }

  ionViewDidLoad() {
    //this.hunchesService.hunches.subscribe(hunches => {
      //console.log('Test hunches');
      //console.log(hunches);
    //});
    //this.hunchesService.add();
    //this.matches = new Matches(this.matchesService);
    //this.confrontos = this.matches.forDate();
  }

}
