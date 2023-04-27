import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';
import { catchError, map, of, tap } from 'rxjs';
import Swal from 'sweetalert2';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userID!: string
  public company!: string

  constructor(private http: HttpClient, private router: Router) { }


  // Se hace peticion de la data y se compara si contiene los datos ingresador por el user
  login(formData: any){
    return this.http.get(`${base_url}/usuarios?email=${formData.email}`)
    .pipe(
      map(
          (resp: any) => {
           if (resp.length === 0) {
             Swal.fire('Error', 'Email no encontrado', 'error');
            } else {
              if (resp[0].password === formData.password) {
                this.userID = resp[0].id;
                this.company = resp[0].company;
                localStorage.setItem('token', this.userID)
                localStorage.setItem('company', this.company)
                this.router.navigateByUrl('negocios360/dashboard');
              }
              else {
                Swal.fire('Error', 'Password errada', 'error');
              }

            }
          }
      ),
      catchError((error: any) => {
       return Swal.fire('Error', error , 'error');
      })
    )
  }

  // Se realiza el post de los datos ingresados por el usuario
  register(formData: any){
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      map(
        (resp: any) =>{
        this.userID = formData.id,
        localStorage.setItem('token', this.userID)
        localStorage.setItem('company', formData.company)
        this.router.navigateByUrl('login')}
        ),
        catchError((error: any) => {
          return Swal.fire('Error', error , 'error');
         })    )
  }

  isAuth(){
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login')
    }
  }

  //Funcion para solicitar la imagen de perfil o la data del usuario especifico
  getUserImg(){
    return this.http.get(`${base_url}/usuarios?id=${localStorage.getItem('token')}`)
    .pipe(
      map(
        (user: any) => {
          return user[0].userImg
        }
      ),
      catchError(error => of(console.log(error)))
    )
  }

}
