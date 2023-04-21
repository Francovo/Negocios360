import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private fb: FormBuilder){}

  loginForm = this.fb.group({
    email: ['juan.perez@example.com', [Validators.required, Validators.email] ],
    password: ['G4h&k2f$', [Validators.required] ],

  })

  login(){
    if (this.loginForm.invalid) {
      return console.log('algo no esta como debe');
    } else {
    this.authService.login(this.loginForm.value).subscribe()
  }}

}
