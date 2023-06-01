import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/appStore.reducer';
import { ModalNewMessageComponent } from 'src/app/components/modal-new-message/modal-new-message.component';
import { UsersData } from 'src/app/interfaces/users.interface';
import { ChatService } from 'src/app/services/chat.service';
import { UsersService } from 'src/app/services/users.service';
import { getAllUsers } from '../NGRX/pages.actions';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit{

  constructor(private usersService : UsersService, public dialog: MatDialog, private chatService: ChatService,
    private store: Store<appState>,
    ){}

  dataUsers!: UsersData[]


  ngOnInit(): void {
    this.store.select('communityData').subscribe((data: any) => {
      //Este if es en caso de que se recargue la pagina y se vacie el store, en caso de que no se recargue nos ahorramos una peticion
      // ya que la data estara en el store
      if (data.length === 0) {
        console.log('Se realizo la peticion de nuevo');
        this.getUsers()
      } else {
        this.dataUsers = data.data
        console.log('data del store Community');
      }
    });

  }

  getUsers(query?: string) {
    this.store.dispatch(getAllUsers({ texto: query }));
  }

}
