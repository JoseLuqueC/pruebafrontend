import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserI } from '../../models/user.interface';
import { Observable } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['Nombre', 'Apellido', 'Identificación (C.C)', 'Rol asociado','Estado', 'Teléfono','Correo electrónico', 'accion'];
  public userts$: Observable<UserI[]>;
  dataSource = new MatTableDataSource();

  constructor(private dataSvc: DataService, public dialog: MatDialog) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.dataSvc.getAllUsers().subscribe(users =>(this.dataSource.data = users));
    // this.userts$ = this.dataSvc.getAllUsers();
  }

  onEditUser(user: UserI){
    console.log('editUser', user);
  }

  onDeleteUser(user: UserI){
    Swal.fire({
      title: 'Está seguro que desea borrar?',
      text: "No es posible revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.dataSvc.deletePostById(user).then(()=>{
          Swal.fire(
          'Eliminado!',
          'El usuario a sido eliminado.',
          'success'
        )
        }).catch((error)=>{
          Swal.fire(
            'Error!',
            'No ha sido posible eliminar el usuario',
            'error'
          )
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No se ha eliminado el usuario',
          'error'
        )
      }
    })
  }

  onNewUser(){
    this.openDialog();
  }

  openDialog():void{
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(result =>{
      console.log()
    })
  }
}
