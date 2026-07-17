import { Component } from '@angular/core';
import { input } from '@angular/core';

@Component({
  selector: 'app-chat-bubble',
  imports: [],
  templateUrl: './chat-bubble.html',
  styleUrl: './chat-bubble.css',
})
export class ChatBubble {

  message = input<string>('');
  isUser = input<boolean>(false);
  loading = input<boolean>(false);
  parse(message: string){
    if(message.includes('```')){
      message = message.replace('```', '<div>');
      message = message.replace('```', '</div>');
    }
    if(message.startsWith('\"') && message.endsWith('\"')){
      message = message.slice(1, -1);
    }
    return message.replaceAll('\\n', '<br>')
                  .trim()
                  .replaceAll('\\', '')
                  .replaceAll('\"', '');
  }
}
