import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../../material.module';
import { TableComponent } from '../../shared/components/table/table.component';
import { MainNavComponent } from '../../shared/components/main-nav/main-nav.component';


@NgModule({
  declarations: [AdminComponent,TableComponent, MainNavComponent ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
