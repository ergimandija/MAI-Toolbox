import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './chat-window/chat-window';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
    
    private apiUrl:string =  "http://localhost:11434/api/chat";
    private httpClient:HttpClient = inject(HttpClient);
    constructor(){} 

    sendMessage( messages: Message[] = [], temperature:number = 0.8): Observable<any> {
        return this.httpClient.post<any>(this.apiUrl, {
          "model": "Liskov:latest",
          "messages": messages,
          "stream": false,
          "options": {
            "temperature": temperature
          }
        });

    }

    

    


}
