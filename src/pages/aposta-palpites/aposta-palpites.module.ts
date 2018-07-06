import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApostaPalpitesPage } from './aposta-palpites';

@NgModule({
  declarations: [
    ApostaPalpitesPage,
  ],
  imports: [
    IonicPageModule.forChild(ApostaPalpitesPage),
  ],
  exports: [
    ApostaPalpitesPageModule
  ]
})
export class ApostaPalpitesPageModule {}
