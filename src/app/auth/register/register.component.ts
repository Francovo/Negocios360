import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private authService: AuthService, private fb: FormBuilder){}

  city: string = ""

  registerForm = this.fb.group({
    userImg: ['', [Validators.required] ],
    company: ['', [Validators.required] ],
    email: ['', [Validators.required, Validators.email] ],
    password: ['', [Validators.required] ],
    companyDescription: ['', [Validators.required] ],
    ubication: ['']

  })


  // Generacion de un id aleatorio UNICO que se asigna al usuario a la hora de ser registrado
  generarId(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for ( let i = 0; i < 30; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }


  // Se llama al servicio y se envian los datos del formulario + el id generado
  register(){
    if (this.registerForm.invalid) {
      Swal.fire('Error', 'Datos ingresados de forma incorrecta', 'error');
    } else {
      const formData = {...this.registerForm.value, id: this.generarId()}
      this.authService.register(formData).subscribe(
        (err) => {
          //Si sucede un error
          console.log(err);
        }
      )
    }
  }

}
