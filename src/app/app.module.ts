import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire/firebase.app.module';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ApostaPalpitesPage } from '../pages/aposta-palpites/aposta-palpites';
import { ApostaPage } from '../pages/aposta/aposta';
import { CampeonatoPage } from '../pages/campeonato/campeonato';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { GuessPage } from '../pages/guess/guess';
import { ProfilePage } from '../pages/profile/profile';
import { ResultadoPage } from '../pages/resultado/resultado';
import { SigninPage } from '../pages/signin/signin';
import { SignonPage } from '../pages/signon/signon';
import { SignupPage } from '../pages/signup/signup';
import { ApostaProvider } from '../providers/aposta/aposta';
import { AuthProvider } from '../providers/auth.service';
import { CampeonatoProvider } from '../providers/campeonato/campeonato';
import { GuessProvider } from '../providers/guess.service';
import { ResultadoProvider } from '../providers/resultado/resultado';
import { RoundProvider } from '../providers/round.service';
import { UserProvider } from '../providers/user.service';
import { CopaApp } from './app.component';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyCVQjL7W-pp3xSXeXhcQEjF14zzEM11GO0',
  authDomain: 'copa-app-9057a.firebaseapp.com',
  databaseURL: 'https://copa-app-9057a.firebaseio.com',
  projectId: 'copa-app-9057a',
  storageBucket: 'copa-app-9057a.appspot.com',
  messagingSenderId: '1091130500367'
};

@NgModule({
  declarations: [
    CopaApp,
    ApostaPage,
    CampeonatoPage,
    DashboardPage,
    GuessPage,
    ApostaPalpitesPage,
    ProfilePage,
    ResultadoPage,
    SigninPage,
    SignonPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(CopaApp),
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    HttpClientModule,
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    CopaApp,
    ApostaPage,
    CampeonatoPage,
    DashboardPage,
    GuessPage,
    ApostaPalpitesPage,
    ProfilePage,
    ResultadoPage,
    SigninPage,
    SignonPage,
    SignupPage
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    AuthProvider,
    StatusBar,
    SplashScreen,
    UserProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ResultadoProvider,
    ApostaProvider,
    CampeonatoProvider,
    GuessProvider,
    RoundProvider
  ]
})
export class AppModule { }
