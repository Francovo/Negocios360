import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { PublicationsData } from '../interfaces/publications.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

const base_url = environment.base_url


@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  // hacemos la peticion y en caso de error retornamos un void del log del error
  // If en caso de que el parametro(busqueda) exista
  getPublications(busqueda?: string){

    return busqueda? this.http.get<PublicationsData[]>(`${base_url}/publicaciones?q=${busqueda}`)
    :  this.http.get<PublicationsData[]>(`${base_url}/publicaciones`)
    .pipe(
      map(
        resp => resp.sort((a,b) => {
          const fechaA = new Date(a.fecha).getTime();
          const fechaB = new Date(b.fecha).getTime();
          return fechaB - fechaA;
        })
      ),
      catchError(error => {
        console.error(error);
        return of([] as PublicationsData[]); // devuelve un arreglo vacío en caso de error
      })
    );
  }

  postPublications(formData: any){
    console.log(formData);
    return this.http.post(`${base_url}/publicaciones`, formData)
    .pipe(
      tap(
        resp => console.log(resp)
      ),
      catchError((error:any) =>
       of(console.error(error))
      )
    );
  }

  putPublications(formData: any, id: string){
    console.log(id);
    return this.http.put(`${base_url}/publicaciones/${id}`, formData)
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
