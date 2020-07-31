import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserI } from '../shared/models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private usersCollection: AngularFirestoreCollection<UserI>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<UserI>('users');
   }

  public getAllUsers():Observable<UserI[]>{
    return this.usersCollection
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

  public deletePostById(user: UserI){
    return this.usersCollection.doc(user.id).delete();
  }

  public editUserById(user:UserI){
    return this.usersCollection.doc(user.id).update(user);
  }

  public saveUser(user: UserI){
    const userObj ={
      name: user.name,
      lastName: user.lastName,
      cc: user.cc,
      rol: user.rol,
      state: user.state,
      phone: user.phone,
      password: user.password,
      email: user.email
    };

    //todo editUser
    this.usersCollection.add(userObj);
  }
}
