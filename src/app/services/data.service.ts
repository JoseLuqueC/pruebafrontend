import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserI } from '../shared/models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  public getAllUsers():Observable<UserI[]>{
    return this.afs.collection('users')
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a=>{
          const data = a.payload.doc.data() as UserI;
          const id = a.payload.doc.id;
          return {id, ...data};
        }))
    )
  }
}
