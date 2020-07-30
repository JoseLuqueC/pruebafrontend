import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { UserI } from '../../shared/models/user.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

   // ELEMENT_DATA: UserI[] = [];
   displayedColumns: string[] = ['Nombre', 'Apellido', 'Identificación (C.C)', 'Rol asociado','Estado', 'Teléfono','Correo electrónico'];
   public userts$: Observable<UserI[]>;
 
   constructor(private dataSvc: DataService) { }
 
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   
 
   ngOnInit() {
     // this.dataSvc.getAllUsers().subscribe(
     //   res => this.ELEMENT_DATA = res
     // );
     
     this.userts$ = this.dataSvc.getAllUsers();
 
   }
 
}
