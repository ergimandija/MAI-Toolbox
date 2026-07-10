import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
    
    private apiUrl:string =  "http://localhost:11434/api/chat";
    private httpClient:HttpClient = inject(HttpClient);
    constructor(){} 

    sendMessage(message:string){
        return this.httpClient.post<any>(this.apiUrl, {
          "model": "llama2:7b",
          "messages": [
            {
              "role": "user",
              "content": message
            }
            
          ],
          "stream": false
        });

    }



}
