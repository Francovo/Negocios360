import { Component, Input, OnChanges, Inject, OnInit } from '@angular/core';
import { PublicationsData } from '../../interfaces/publications.interface';
import { ModalEditarPublicationComponent } from '../modal-editar-publication/modal-editar-publication.component';
import { PublicationsService } from 'src/app/services/publications.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/appStore.reducer';
import { getPublications } from 'src/app/pages/NGRX/pages.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements  OnInit {

  // @Input() Data!: PublicationsData[]

  @Input() user?: string


  DataPublications!: PublicationsData[]
  DataUser!: any

  constructor(private publicationsService: PublicationsService, public dialog: MatDialog, private userService: UsersService,
    private store: Store<appState>,

  ) {}


  ngOnChanges() {
    if (this.user) {
      this.getPublications()
    }
  }

  ngOnInit(): void {
    this.store.select('dataPublications').subscribe((data: any) => {
      //Este if es en caso de que se recargue la pagina y se vacie el store, en caso de que no se recargue nos ahorramos una peticion
      // ya que la data estara en el store
      if (data.length === 0) {
        console.log('Se realizo la peticion de nuevo');
        this.getPublications()
      } else {
        this.DataPublications = data.data
        console.log('data del store', this.DataPublications);
      }
    });
  }



  getPublications(){
    this.store.dispatch(getPublications({'texto': this.user}));
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
        this.getPublications()
      });
    }


    // En caso de que la url de la publicacion no exista y genere error, se utilizara esta funcion
    setDefaultImage(event:any) {
      event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
    }
}

