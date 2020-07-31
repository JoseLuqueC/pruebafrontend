import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserI } from '../../shared/models/user.interface';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
hide=true;
  constructor(private dataSvc: DataService) { }
  email = new FormControl('', [Validators.required, Validators.email]);

  public newUserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    cc: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
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
    console.log("Data", data);
    if(data.valid){
      this.dataSvc.saveUser(data.value);
      Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: 'Guardado con exito!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

}
