import { DatePipe } from '@angular/common';
import { Component, Inject  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { PublicationsService } from 'src/app/services/publications.service';

@Component({
  selector: 'app-modal-create-publication',
  templateUrl: './modal-create-publication.component.html',
  styleUrls: ['./modal-create-publication.component.scss']
})
export class ModalCreatePublicationComponent {

  constructor(public dialogRef: MatDialogRef<ModalCreatePublicationComponent>, private fb: FormBuilder, private publicationsService: PublicationsService, private authService: AuthService ) {
  }


  PublicationForm = this.fb.group({
    titulo: ['', [Validators.required] ],
    descripcion: ['', [Validators.required] ],
    img: ['', [Validators.required] ],

  })


  PostPublication(){
    if (this.PublicationForm.invalid) {
      return console.log('algo no esta como debe');
    } else {
    // Creacion y formateo de la fecha para el post
    const datePipe = new DatePipe('en-US');
    const currentDate = new Date();
    const formattedDate = datePipe.transform(currentDate, 'yyyy-MM-dd');

// Se ejecuta el servicio que hace la peticion de la imagen del usuario, y aparte se ejecuta
// la funcion que postea la publicacion, ya con la imagen del user o empresa en ella
    this.authService.getUserImg().subscribe(img => {
      console.log(img);
      const formData = {...this.PublicationForm.value, idUser: localStorage.getItem('token'), fecha: formattedDate, createdBy: localStorage.getItem('company'), userImg: img};
      this.publicationsService.postPublications(formData).subscribe();
      this.closeModal()
    });
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
