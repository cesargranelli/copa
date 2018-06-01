import { HunchPage } from './../pages/hunch/hunch';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';

//import { HomePage } from './../pages/home/home';
import { MyApp } from './app.component';
//import { SigninPage } from './../pages/signin/signin';
//import { SignupPage } from './../pages/signup/signup';

//import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFireDatabaseModule } from 'angularfire2/database';

//import { ProfilePage } from '../pages/profile/profile';
//import { PalpitePage } from '../pages/palpite/palpite';

//import { AuthService } from './../providers/auth.service';
//import { HunchesProvider } from '../providers/hunches/hunches';
//import { MatchesProvider } from '../providers/matches/matches';
//import { UserService } from './../providers/user.service';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

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
    //HomePage,
    MyApp,
    HunchPage
    //PalpitePage,
    //ProfilePage,
    //SigninPage,
    //SignupPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    //HomePage,
    MyApp,
    HunchPage
    //PalpitePage,
    //ProfilePage,
    //SigninPage,
    //SignupPage
  ],
  providers: [
    //AngularFireAuth,
    //AngularFirestore,
    //AuthService,
    //HunchesProvider,
    StatusBar,
    SplashScreen,
    //UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //MatchesProvider
  ]
})
export class AppModule {}
