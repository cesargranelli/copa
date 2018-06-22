import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
//import { first } from 'rxjs/operator/first';
//import { map } from 'rxjs/operator/map';

import { Rodada } from '../../models/rodada';

@Injectable()
export class RodadaProvider {

  constructor(
    private _afs: AngularFirestore
  ) { }

  get rodadas(): Observable<Rodada[]> {

    return this._afs.collection<Rodada>('rounds').valueChanges();

  }

}
