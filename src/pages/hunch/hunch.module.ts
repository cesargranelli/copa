import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HunchPage } from './hunch';

@NgModule({
  declarations: [
    HunchPage,
  ],
  imports: [
    IonicPageModule.forChild(HunchPage),
  ],
  exports: [
    HunchPageModule
  ]
})
export class HunchPageModule {}
