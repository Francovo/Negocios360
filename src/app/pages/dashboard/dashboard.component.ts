import { Component, OnInit } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreatePublicationComponent } from 'src/app/components/modal-create-publication/modal-create-publication.component';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(private publicationsService: PublicationsService, public dialog: MatDialog) {}

  dataPublications!: any
  news: any

  ngOnInit(): void {
    this.getPublications();
    this.getNews()
  }

  getPublications(query?: string) {
    this.publicationsService.getPublications(query)
      .subscribe(resp => this.dataPublications = resp)
  }

  //Funcion de apertura de modal para creacion de una publicacion
  openModalCreatePublication() {
    const dialogRef = this.dialog.open(ModalCreatePublicationComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getPublications();
    });
  }

  getNews(){
    this.publicationsService.getNews()
    .subscribe(resp => this.news = resp)
  }
}

