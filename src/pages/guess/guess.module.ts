import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuessPage } from './guess';

@NgModule({
  declarations: [
    GuessPage,
  ],
  imports: [
    IonicPageModule.forChild(GuessPage),
  ],
  exports: [
    GuessPageModule
  ]
})
export class GuessPageModule {}
