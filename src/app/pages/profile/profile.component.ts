import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditProfileComponent } from 'src/app/components/modal-edit-profile/modal-edit-profile.component';
import { PublicationsData } from 'src/app/interfaces/publications.interface';
import { UsersData } from 'src/app/interfaces/users.interface';
import { PublicationsService } from 'src/app/services/publications.service';
import { UsersService } from 'src/app/services/users.service';
import { delay } from 'rxjs';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/appStore.reducer';
import { getUser } from '../NGRX/pages.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  constructor(private userService: UsersService, private publicationsService: PublicationsService, public dialog: MatDialog,
    private store: Store<appState>,
    ){}

  DataPublications!: PublicationsData[]
  DataUser!: UsersData

  usertoken!: string

  ngOnInit(): void {
      this.usertoken = localStorage.getItem('token')!

      this.store.select('userData').subscribe((data: any) => {
        //Este if es en caso de que se recargue la pagina y se vacie el store, en caso de que no se recargue nos ahorramos una peticion
        // ya que la data estara en el store
        if (data.length === 0) {
          console.log('Se realizo la peticion de nuevo');
          this.getUser()
        } else {
          this.DataUser = data.data
          console.log('data del store Profile');
        }
      });
  }

  getUser(){
    this.store.dispatch(getUser());
  }

  openModalEditProfile(data: any) {
    const dialogRef = this.dialog.open(ModalEditProfileComponent, {data: data});

    dialogRef.afterClosed().subscribe(result => {
      this.userService.getProfile().subscribe((resp: any) => this.DataUser = resp)
      this.publicationsService.getPublications(localStorage.getItem('token') || '').subscribe(
        resp => this.DataPublications = resp
      )
    });
  }


    // En caso de que la url de la publicacion no exista y genere error, se utilizara esta funcion
    setDefaultImage(event:any) {
    event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
    }

}
