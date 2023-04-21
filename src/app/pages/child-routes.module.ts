import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommunityComponent } from './community/community.component';
import { NopagefoundComponent } from '../nopagefound/nopagefound.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';


const childRoutes: Routes = [
  { path: 'negocios360', redirectTo: "/dashboard", pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: "/negocios360/dashboard", pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule {}
