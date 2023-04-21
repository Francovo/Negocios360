import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, interval, of, startWith, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environments';
import { SocketService } from './socket.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: SocketService) {
    this.onReceiveMessage()
   }

   chats: any=[]

   sendMessage(messageInfo: any){
    this.chats.push(messageInfo)
    this.socket.io.emit("sendMessage", messageInfo)
   }

   onReceiveMessage(){
    this.socket.io.on("receiveMessage",(messageInfo) => {
      messageInfo.messageType = 1
      this.chats.push(messageInfo)
    })
   }


}
