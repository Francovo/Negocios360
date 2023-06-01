import { Component, OnInit } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreatePublicationComponent } from 'src/app/components/modal-create-publication/modal-create-publication.component';
import { Store } from '@ngrx/store';
import { getPublications, getUser } from '../NGRX/pages.actions';
import { appState } from 'src/app/appStore.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(
    private store: Store<appState>,
    private publicationsService: PublicationsService,
    public dialog: MatDialog
  ) {}

  dataPublications!: any;
  news: any;

  ngOnInit(): void {
    this.store.select('dataPublications').subscribe((data) => {
      this.dataPublications = data.data;
    });

    this.getPublications();
    this.getNews();
  }

  getPublications(query?: string) {
    this.store.dispatch(getPublications({ texto: query }));
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

