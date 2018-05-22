import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SigninPage } from '../pages/signin/signin';
import { ProfilePage } from '../pages/profile/profile';
import { PalpitePage } from '../pages/palpite/palpite';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = SigninPage;

  @ViewChild(Nav) public nav: Nav;

  public paginas = [
    { titulo: 'Perfil', componente: ProfilePage, icone: 'person' },
    { titulo: 'Palpite', componente: PalpitePage, icone: 'clipboard' }
  ];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onPage(componente) {
    this.nav.push(componente, {
      userid: this.nav._views[0].data.userid
    });
  }

}

