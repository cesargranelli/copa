import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HunchPage } from '../pages/hunch/hunch';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { PalpitePage } from '../pages/palpite/palpite';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';

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
    MyApp,
    HomePage,
    HunchPage,
    //PalpitePage,
    ProfilePage,
    SigninPage,
    SignupPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
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
    HomePage,
    HunchPage,
    //PalpitePage,
    ProfilePage,
    SigninPage,
    SignupPage
  ],
  providers: [
    AngularFireAuth,
    AuthProvider,
    StatusBar,
    SplashScreen,
    UserProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
