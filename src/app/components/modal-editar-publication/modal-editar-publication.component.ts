import { DatePipe } from '@angular/common';
import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PublicationsData } from 'src/app/interfaces/publications.interface';
import { PublicationsService } from 'src/app/services/publications.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';

@Component({
  selector: 'app-modal-editar-publication',
  templateUrl: './modal-editar-publication.component.html',
  styleUrls: ['./modal-editar-publication.component.scss'],
})
export class ModalEditarPublicationComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalEditarPublicationComponent>,
    private fb: FormBuilder,
    private publicationsService: PublicationsService,
    @Inject(MAT_DIALOG_DATA) public dataEdit: PublicationsData
  ) {}

  PublicationForm = this.fb.group({
    titulo: [this.dataEdit.titulo, [Validators.required]],
    descripcion: [this.dataEdit.descripcion, [Validators.required]],
    img: [this.dataEdit.img, [Validators.required]],
  });

  editarPost() {
    if (this.PublicationForm.invalid) {
      return console.log('algo no esta como debe');
    } else {
      const datePipe = new DatePipe('en-US');
      const currentDate = new Date();
      const formattedDate = datePipe.transform(currentDate, 'yyyy-MM-dd');

      // Se envia la informacion del form y aparte se adjunta la informacion que no se edita para que en el back
      // no se borre
      const formData = {
        ...this.PublicationForm.value,
        fecha: formattedDate,
        idUser: this.dataEdit.idUser,
        createdBy: this.dataEdit.createdBy,
        userImg: this.dataEdit.userImg,
      };
      console.log(formData);
      this.publicationsService
        .putPublications(formData, this.dataEdit.id)
        .pipe(delay(500))
        .subscribe(() => {
          Swal.fire('Success', 'Edit updated', 'success');
          this.dialogRef.close();
        });
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
