import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

/*firebase*/
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET} from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AdminModule } from './components/admin/admin.module';
import { NewUserComponent } from './components/new-user/new-user.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { EditUserModule } from './components/edit-user/edit-user.module';
import { EditUserComponent } from './components/edit-user/edit-user.component';




@NgModule({
  declarations: [
    AppComponent,
    NewUserComponent,
    ModalComponent,
    EditUserComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AdminModule,
    EditUserModule
  ],
  entryComponents: [AppComponent,
                    ModalComponent],
  bootstrap: [AppComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide:BUCKET, useValue: 'pruebaolsoftware.appspot.com'}
  ]
})
export class AppModule { }
