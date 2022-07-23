import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import { GuessPage } from '../pages/guess/guess';
import { MatchPage } from '../pages/match/match';
import { ProfilePage } from '../pages/profile/profile';
import { RankingPage } from '../pages/ranking/ranking';
import { SignonPage } from '../pages/signon/signon';
import { AuthProvider } from '../providers/auth.service';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class CopaApp {

  rootPage: any = SignonPage;

  @ViewChild(Nav) public nav: Nav;

  public paginas = [
    { titulo: 'Perfil', componente: ProfilePage, icone: 'person' },
    { titulo: 'Palpite', componente: GuessPage, icone: 'clipboard' },
    { titulo: 'Resultado', componente: MatchPage, icone: 'paper' },
    { titulo: 'Ranking', componente: RankingPage, icone: 'flag' },
    { titulo: 'Sair', componente: null, icone: 'log-out' }
  ];

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private authService: AuthProvider,
  ) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onPage(componente: Page, titulo: string) {
    if (titulo == "Sair") {
      this.authService.signout();
      this.nav.push(SignonPage);
    } else {
      this.nav.push(componente, {
        user: this.nav._views[0].data.user
      });
    }
  }

}

