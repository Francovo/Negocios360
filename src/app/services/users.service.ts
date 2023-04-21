import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { catchError, map, of, tap } from 'rxjs';

const base_url = environment.base_url


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  getUsersCommunity(busqueda?: string){
  return busqueda? this.http.get<any[]>(`${base_url}/usuarios?q=${busqueda}`)
    :  this.http.get<any[]>(`${base_url}/usuarios`)
    .pipe(
      catchError(error => {
        console.error(error);
        return of([] as any[]); // devuelve un arreglo vacío en caso de error
      }))
  }

  getProfile(){
    return this.http.get(`${base_url}/usuarios/${localStorage.getItem('token')}`)
    .pipe(
      tap(
        resp => console.log(resp)
      ),
    catchError(error => {
      console.error(error);
      return of([] as any[]); // devuelve un arreglo vacío en caso de error
    }))
  }

  putUserProfile(formData: any, id: string){
    console.log(id);
    return this.http.put(`${base_url}/usuarios/${id}`, formData)
    .pipe(
      tap(
        resp => console.log(resp)
      ),
      catchError((error:any) =>
       of(console.error(error))
      )
    );
  }
}
