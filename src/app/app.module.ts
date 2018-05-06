import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from './../pages/home/home';
import { MyApp } from './app.component';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../providers/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './../providers/user.service';
import { ProfilePage } from '../pages/profile/profile';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyAkaxvKWCyJezIU5-0gyRJyJW0uJY9r-Ws",
  authDomain: "copa-6141d.firebaseapp.com",
  databaseURL: "https://copa-6141d.firebaseio.com",
  storageBucket: "copa-6141d.appspot.com",
  messagingSenderId: "575539116738"
};

@NgModule({
  declarations: [
    HomePage,
    MyApp,
    ProfilePage,
    SigninPage,
    SignupPage
  ],
  imports: [
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseAppConfig),
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage,
    MyApp,
    ProfilePage,
    SigninPage,
    SignupPage
  ],
  providers: [
    AngularFireAuth,
    AuthService,
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
