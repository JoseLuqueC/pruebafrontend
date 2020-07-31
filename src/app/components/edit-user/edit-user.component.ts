import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserI } from '../../shared/models/user.interface';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  hide=true;
  
  @Input() user: UserI;

  constructor(private dataSvc: DataService,private authSvc: AuthService, public dialog: MatDialog) { }

  email = new FormControl('', [Validators.required, Validators.email]);

  public editUserForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    cc: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.minLength(6)),
    email: this.email,
  })

  ngOnInit(): void {
    this.initValuesForm();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un email';
    }
    return this.email.hasError('email') ? 'No es un email valido' : '';
  }

  editUser(data: FormGroup){

    if(data.valid){
      this.dataSvc.editUserById(data.value);
      // this.authSvc.editUserLogin(data.value);
      Swal.fire({
        icon: 'success',
        title: 'Modificado con exito!',
        showConfirmButton: false,
        timer: 1500
      })
      this.closeDialog();
    }
  }

  private initValuesForm():void{
    this.editUserForm.patchValue({
      id: this.user.id,
      name: this.user.name,
      lastName: this.user.lastName,
      cc: this.user.cc,
      rol: this.user.rol,
      state: this.user.state,
      phone: this.user.phone,
      password: this.user.password,
      email: this.user.email
    });
  }

  closeDialog(){
    this.dialog.closeAll();
  }
}
