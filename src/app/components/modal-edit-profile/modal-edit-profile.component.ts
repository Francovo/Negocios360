import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersData } from 'src/app/interfaces/users.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.scss']
})
export class ModalEditProfileComponent {
  constructor(public dialogRef: MatDialogRef<ModalEditProfileComponent>, private fb: FormBuilder
    ,@Inject(MAT_DIALOG_DATA) public dataUser: UsersData, private usersService: UsersService ) {
  }


  PublicationForm = this.fb.group({
    company: [this.dataUser.company, [Validators.required] ],
    companyDescription: [this.dataUser.companyDescription, [Validators.required] ],
    userImg: [this.dataUser.userImg, [Validators.required] ],
    ubication: ['' ]
  })


  editarPost(){
    if (this.PublicationForm.invalid) {
      return console.log('algo no esta como debe');
    } else {
      // Se envia la informacion del form y aparte se adjunta la informacion que no se edita para que en el back
      // no se borre
      const formData = {...this.PublicationForm.value, id: this.dataUser.id, email: this.dataUser.email, password: this.dataUser.password, }
      console.log(formData);
      this.usersService.putUserProfile(formData, this.dataUser.id).subscribe()
      this.dialogRef.close();
    }
  }

  cLoseModal(): void {
    this.dialogRef.close();
  }
}
