import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import { CampeonatoPage } from '../pages/campeonato/campeonato';
import { PalpitePage } from '../pages/palpite/palpite';
import { ProfilePage } from '../pages/profile/profile';
import { ResultadoPage } from '../pages/resultado/resultado';
import { SigninPage } from '../pages/signin/signin';
import { UserProvider } from '../providers/user.service';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class CopaApp {

  rootPage: any = SigninPage;

  @ViewChild(Nav) public nav: Nav;

  public paginas = [
    { titulo: 'Perfil', componente: ProfilePage, icone: 'person' },
    { titulo: 'Palpite', componente: PalpitePage, icone: 'clipboard' },
    { titulo: 'Resultado', componente: ResultadoPage, icone: 'paper' },
    { titulo: 'Ranking', componente: CampeonatoPage, icone: 'flag' },
    { titulo: 'Sair', componente: SigninPage, icone: 'log-out' }
  ];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public userService: UserProvider
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onPage(componente: Page, titulo: string) {
    let signout = false;
    (titulo == "Sair") ? signout = true : null;
    this.nav.push(componente, {
      userid: this.nav._views[0].data.userid,
      slug: this.nav._views[0].data.slug,
      out: signout
    });
  }

}

