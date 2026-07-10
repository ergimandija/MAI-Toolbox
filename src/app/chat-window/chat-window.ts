import { Component, inputBinding, createComponent, viewChild, input } from '@angular/core';
import { ApiService } from '../api-service';
import { FormsModule } from '@angular/forms';
import { ChatBubble } from '../chat-bubble/chat-bubble';
import { ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-chat-window',
  imports: [FormsModule, ChatBubble],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.css',
})
export class ChatWindow {
    currentMessage = '';
    private messageContainer = viewChild.required('container', { read: ViewContainerRef });;
    constructor(private apiService: ApiService){
    }

   
    sendMessage(){
      this.createChatEntry(this.currentMessage,true);
      console.log("sending...");
      const request = this.apiService.sendMessage(this.currentMessage);
      this.recieveMessage(request);
    }

    recieveMessage(request: Observable<any>){
      const responseBubble = this.messageContainer().createComponent(ChatBubble);
      responseBubble.setInput('loading',true);
      responseBubble.setInput('isUser', false);
      request.subscribe((response) => {
        responseBubble.setInput('loading',false);
        responseBubble.setInput('message',response.message.content);
      
      });
    }

    private createChatEntry(message:string, isUser: boolean){
      const element  = this.messageContainer().createComponent(ChatBubble);
      element.setInput('message', message);
      element.setInput('isUser', isUser);
    }

}
