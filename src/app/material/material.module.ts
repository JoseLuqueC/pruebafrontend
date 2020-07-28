import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatPaginator,
    MatTableDataSource,
    MatTableModule
  ],
  exports:[
    MatPaginator,
    MatTableDataSource,
    MatTableModule
  ]
})
export class MaterialModule { }
