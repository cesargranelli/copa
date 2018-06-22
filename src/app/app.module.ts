import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { ApostaPage } from '../pages/aposta/aposta';
import { CampeonatoPage } from '../pages/campeonato/campeonato';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { PalpitePage } from '../pages/palpite/palpite';
import { ProfilePage } from '../pages/profile/profile';
import { ResultadoPage } from '../pages/resultado/resultado';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';

import { AngularFireAuth } from 'angularfire2/auth';

import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ResultadoProvider } from '../providers/resultado/resultado';
import { ApostaProvider } from '../providers/aposta/aposta';
import { CampeonatoProvider } from '../providers/campeonato/campeonato';
import { PalpiteProvider } from './../providers/palpite/palpite';
import { RodadaProvider } from '../providers/rodada/rodada';

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
    MyApp,
    ApostaPage,
    CampeonatoPage,
    DashboardPage,
    PalpitePage,
    ProfilePage,
    ResultadoPage,
    SigninPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    HttpClientModule,
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    ApostaPage,
    CampeonatoPage,
    DashboardPage,
    PalpitePage,
    ProfilePage,
    ResultadoPage,
    SigninPage,
    SignupPage
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    AngularFireAuth,
    AuthProvider,
    StatusBar,
    SplashScreen,
    UserProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ResultadoProvider,
    ApostaProvider,
    CampeonatoProvider,
    PalpiteProvider,
    RodadaProvider
  ]
})
export class AppModule {}
