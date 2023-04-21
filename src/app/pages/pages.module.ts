import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ComponentsModule } from '../components/components.module';
import { CommunityComponent } from './community/community.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    CommunityComponent,
    ProfileComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ComponentsModule,
    FormsModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
