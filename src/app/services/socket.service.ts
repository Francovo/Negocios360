import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  io = io("https://back-negocios-360.onrender.com", {
    autoConnect: false
  })

  constructor() {}



}
