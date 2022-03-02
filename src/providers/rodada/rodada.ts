import { Injectable } from '@angular/core';

// import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs';

import { Rodada } from '../../models/rodada';

@Injectable()
export class RodadaProvider {

  constructor(
    // private _afs: AngularFirestore
  ) { }

  get rodadas(): Observable<Rodada[]> {

    return null;//this._afs.collection<Rodada>('rounds').valueChanges();

  }

}
