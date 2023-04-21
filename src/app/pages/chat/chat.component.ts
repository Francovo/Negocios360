import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';
import { MessageData } from 'src/app/interfaces/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

  constructor(public chatService: ChatService){}

  ngOnInit(): void {

  }

  text: string = ''

  sendMessage(){
    let messageInfo = {
      text: this.text,
      messageType: 2
    }
    this.chatService.sendMessage(messageInfo)
    this.text = ""
  }

}
