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
}
