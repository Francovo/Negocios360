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

  registerDisabled = false;

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
  register() {
    if (this.registerForm.invalid) {
      let errorMessage = 'Datos ingresados de forma incorrecta';
      if (this.registerForm.controls.userImg.errors) {
        errorMessage = 'Error en el campo de URL de imagen de perfil';
      } else if (this.registerForm.controls.company.errors) {
        errorMessage = 'Error en el campo de compañía';
      } else if (this.registerForm.controls.email.errors) {
        errorMessage = 'Error en el campo de correo electrónico';
      } else if (this.registerForm.controls.password.errors) {
        errorMessage = 'Error en el campo de contraseña';
      } else if (this.registerForm.controls.companyDescription.errors) {
        errorMessage = 'Error en el campo de descripción de la compañía';
      } else if (this.registerForm.controls.ubication.errors) {
        errorMessage = 'Error en el campo de ubicación';
      }
      Swal.fire('Error', errorMessage, 'error');
      console.log(this.registerForm);
    } else {
      this.registerDisabled = true;
      const formData = {...this.registerForm.value, id: this.generarId()}
      this.authService.register(formData).subscribe(
        (err) => {
          //Si sucede un error
          console.log(err);
        },
        () => {
          this.registerDisabled = false;
        }
      )
    }
  }

}
