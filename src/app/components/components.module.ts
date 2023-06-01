import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ModalCreatePublicationComponent } from './modal-create-publication/modal-create-publication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalEditarPublicationComponent } from './modal-editar-publication/modal-editar-publication.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ModalEditProfileComponent } from './modal-edit-profile/modal-edit-profile.component';
import { ModalNewMessageComponent } from './modal-new-message/modal-new-message.component';



@NgModule({
  declarations: [
    CardComponent,
    NavbarComponent,
    ModalCreatePublicationComponent,
    ModalEditarPublicationComponent,
    SearchBarComponent,
    ModalEditProfileComponent,
    ModalNewMessageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    CardComponent,
    NavbarComponent,
    ModalCreatePublicationComponent,
    SearchBarComponent,

  ]
})
export class ComponentsModule { }
