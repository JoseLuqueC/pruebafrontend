import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
hide=true;
  constructor(private dataSvc: DataService) { }

  public newUserForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    cc: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    contraseña: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un email';
    }

    return this.email.hasError('email') ? 'No es un email valido' : '';
  }

  addNewUser(form: FormGroup){
    console.log("good");
  }

}
