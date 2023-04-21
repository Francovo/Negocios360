import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';
import { CommunityComponent } from './community/community.component';


const routes: Routes = [
  { path: 'negocios360', component: PagesComponent, canActivate: [AuthGuard], canLoad: [AuthGuard],
  loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
