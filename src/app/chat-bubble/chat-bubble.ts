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
      
  message = message.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      (_, language = "plaintext", code) => {
        return `<pre><code class="language-${language}">${this.escapeHtml(code)}</code></pre>`;
      }
    );

    if(message.startsWith('\"') && message.endsWith('\"')){
      message = message.slice(1, -1);
    }
    
    return message.replaceAll('\\n', '<br>')
                  .trim()
                  .replaceAll('\\', '')
                  .replaceAll('\"', '');
  }

  escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}
