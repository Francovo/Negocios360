import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewMessageComponent } from 'src/app/components/modal-new-message/modal-new-message.component';
import { UsersData } from 'src/app/interfaces/users.interface';
import { ChatService } from 'src/app/services/chat.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit{

  constructor(private usersService : UsersService, public dialog: MatDialog, private chatService: ChatService){}

  dataUsers!: UsersData[]


  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(query?: string){
    this.usersService.getUsersCommunity(query).subscribe((resp: UsersData[]) => this.dataUsers = resp)
  }


}
