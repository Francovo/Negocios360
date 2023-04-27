import { Component, Input, OnChanges, Inject } from '@angular/core';
import { PublicationsData } from '../../interfaces/publications.interface';
import { ModalEditarPublicationComponent } from '../modal-editar-publication/modal-editar-publication.component';
import { PublicationsService } from 'src/app/services/publications.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {

  @Input() Data!: PublicationsData[]

  @Input() user?: string


  DataPublications!: PublicationsData[]
  DataUser!: any

  constructor(private publicationsService: PublicationsService, public dialog: MatDialog, private userService: UsersService,
  ) {}


  ngOnChanges() {
    if (this.Data) {
    this.DataPublications = this.Data
    this.userService.getProfile().subscribe((resp: any) => this.DataUser = resp)
    }
  }

  // Funcion que permite saber si el usuario es dueno de una publicacion
  // en el caso de serlo se le permitira editarla
  isOwner(id: string){
    if (localStorage.getItem('token') === id) {
      return true
    } else {
      return false
    }
  }

    //Funcion de apertura de modal para creacion de una publicacion
    openModalEditPublication(data: any) {
      const dialogRef = this.dialog.open(ModalEditarPublicationComponent, {data: data});

      dialogRef.afterClosed().subscribe(result => {
        this.publicationsService.getPublications(this.user)
      .subscribe(
        resp => this.DataPublications = resp
      )
      });
    }


    // En caso de que la url de la publicacion no exista y genere error, se utilizara esta funcion
    setDefaultImage(event:any) {
      event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
    }
}

