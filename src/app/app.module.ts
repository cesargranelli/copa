import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BetPage } from '../pages/bet/bet';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { GuessPage } from '../pages/guess/guess';
import { MatchPage } from '../pages/match/match';
import { ProfilePage } from '../pages/profile/profile';
import { RankingPage } from '../pages/ranking/ranking';
import { SigninPage } from '../pages/signin/signin';
import { SignonPage } from '../pages/signon/signon';
import { SignupPage } from '../pages/signup/signup';
import { AuthProvider } from '../providers/auth.service';
import { BetProvider } from '../providers/bet.service';
import { GuessProvider } from '../providers/guess.service';
import { MatchProvider } from '../providers/match.service';
import { RankingProvider } from '../providers/ranking.service';
import { RoundProvider } from '../providers/round.service';
import { UserProvider } from '../providers/user.service';
import { CopaApp } from './app.component';

@NgModule({
  declarations: [
    CopaApp,
    BetPage,
    RankingPage,
    DashboardPage,
    GuessPage,
    ProfilePage,
    MatchPage,
    SigninPage,
    SignonPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(CopaApp),
    HttpClientModule,
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    CopaApp,
    BetPage,
    RankingPage,
    DashboardPage,
    GuessPage,
    ProfilePage,
    MatchPage,
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
    MatchProvider,
    BetProvider,
    RankingProvider,
    GuessProvider,
    RoundProvider
  ]
})
export class AppModule { }
