import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignonPage } from './signon';

@NgModule({
  declarations: [
    SignonPage,
  ],
  imports: [
    IonicPageModule.forChild(SignonPage),
  ],
  exports: [
    SignonPageModule
  ]
})
export class SignonPageModule {}
