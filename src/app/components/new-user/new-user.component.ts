import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserI } from '../../shared/models/user.interface';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  @Input() user: UserI;

hide=true;
  constructor(private dataSvc: DataService,
    private authSvc: AuthService,
     public dialog: MatDialog) { }
  email = new FormControl('', [Validators.required, Validators.email]);

  public newUserForm = new FormGroup({
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
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un email';
    }

    return this.email.hasError('email') ? 'No es un email valido' : '';
  }

  addNewUser(data:FormGroup){
    if(data.valid){
      this.dataSvc.saveUser(data.value);
      this.authSvc.addNewUserLogin(data.value);
      Swal.fire({
        icon: 'success',
        title: 'Guardado con exito!',
        showConfirmButton: false,
        timer: 1500
      })
      this.closeDialog();
    }
  }

  closeDialog(){
    this.dialog.closeAll();
  }

}
