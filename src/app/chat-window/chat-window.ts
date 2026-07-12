import { Component, viewChild, signal, ViewContainerRef, ComponentRef } from '@angular/core';
import { ApiService } from '../api-service';
import { FormsModule } from '@angular/forms';
import { ChatBubble } from '../chat-bubble/chat-bubble';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-chat-window',
  imports: [FormsModule, ChatBubble],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.css',
})
export class ChatWindow {
    currentMessage = '';
    loadingResponse = signal<boolean>(false);
    private request: Subscription | undefined = undefined;
    private currentResponseBubble: ComponentRef<ChatBubble> | undefined = undefined;
    private messageContainer = viewChild.required('container', { read: ViewContainerRef });
    
    constructor(private apiService: ApiService){
    }

   
    sendMessage(){
      if(this.currentMessage != ''){
      this.createRequestMessage(this.currentMessage,true);
      const request = this.apiService.sendMessage(this.currentMessage);
      this.currentMessage = '';
      this.loadingResponse.set(true);
      this.recieveMessage(request);
      }
    }

    recieveMessage(request: Observable<any>){
      this.currentResponseBubble = this.createResponseBubble();
      
      this.request = request.subscribe((response) => {
        this.loadingResponse.set(false);
        this.currentResponseBubble?.setInput('loading', this.loadingResponse());
        this.currentResponseBubble?.setInput('message', response.message.content);
      
      });
    }

    cancelGeneration(){
      this.request?.unsubscribe();
      this.currentResponseBubble?.destroy();
      this.loadingResponse.set(false);
    }
    
    createRequestMessage(message:string, isUser: boolean){
      const element  = this.messageContainer().createComponent(ChatBubble);
      element.setInput('message', message);
      element.setInput('isUser', isUser);
    }

    createResponseBubble(){
        const bubble = this.messageContainer().createComponent(ChatBubble);
        bubble.setInput('loading',this.loadingResponse());
        bubble.setInput('isUser', false);
        return bubble;
    }

}
