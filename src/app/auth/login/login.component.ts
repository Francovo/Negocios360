import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private fb: FormBuilder){}

  seePassword:boolean = false

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email] ],
    password: ['', [Validators.required] ],

  })

  login(){
    if (this.loginForm.invalid) {
      Swal.fire('Error', 'Datos ingresados de forma incorrecta', 'error');
    } else {
    this.authService.login(this.loginForm.value).subscribe(
      (err) => {
        //Si sucede un error
        console.log(err);
      }
    )
  }}

}
