import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersData } from 'src/app/interfaces/users.interface';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-modal-new-message',
  templateUrl: './modal-new-message.component.html',
  styleUrls: ['./modal-new-message.component.scss']
})
export class ModalNewMessageComponent {
//   constructor(public dialogRef: MatDialogRef<ModalNewMessageComponent>, private fb: FormBuilder,private chatService: ChatService, private authService: AuthService
//     ,@Inject(MAT_DIALOG_DATA) public dataReceiver: UsersData, ) {
//   }


//   MessageForm = this.fb.group({
//     topic: ['', [Validators.required] ],
//     content: ['', [Validators.required] ],
//   })

//   PostPublication(){
//     if (this.MessageForm.invalid) {
//       return console.log('algo no esta como debe');
//     } else {
//     // Creacion y formateo de la fecha para el post
//     const datePipe = new DatePipe('en-US');
//     const currentDate = new Date();
//     const formattedDate = datePipe.transform(currentDate, 'dd/MM/yyyy');

// // Se ejecuta el servicio que hace la peticion de la imagen del usuario, y aparte se ejecuta
// // la funcion que postea la publicacion, ya con la imagen del user o empresa en ella

// this.authService.getUserImg().subscribe(img => {
//   console.log(img);

//     const formData = {...this.MessageForm.value, idSender: localStorage.getItem('token'), sender:localStorage.getItem('company'), idReceiver: this.dataReceiver.id, receiver: this.dataReceiver.company, sentAt: formattedDate, imgSender:img }

//     this.dialogRef.close();

//     })}
//   }

//   closeModal(): void {
//     this.dialogRef.close();
//   }

}
