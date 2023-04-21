import { NgModule } from '@angular/core';

//ANGULAR MATERIAL
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list'

@NgModule({
  declarations: [],
  exports: [
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatListModule
  ]
})
export class MaterialModule { }
