import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from './../pages/home/home';
import { MyApp } from './app.component';
import { SignupPage } from './../pages/signup/signup';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';

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
    SignupPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage,
    MyApp,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
