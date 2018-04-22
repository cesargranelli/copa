import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SigninPage } from './../signin/signin';
import { SignupPage } from './../signup/signup';

import { AuthService } from './../../providers/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public authService: AuthService,
    public navCtrl: NavController
  ) {}

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onSignOut(): void {
    this.authService.signout()
      .then(() => {
        this.navCtrl.setRoot(SigninPage);
        console.log(`Usuário deslogado com sucesso`);
      });
  }

}
