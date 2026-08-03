import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './chat-window/chat-window';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
    
    private apiUrl:string =  "http://localhost:8000/";
    private httpClient:HttpClient = inject(HttpClient);
    constructor(){} 

    sendMessage( messages: Message[] = [], temperature:number = 0.8, useKnowledgeBase:boolean = false, model:string ): Observable<any> {
        const endpoint:string = (useKnowledgeBase) ? this.apiUrl+"api/chat_rag" : this.apiUrl+ "api/chat" ;
        return this.httpClient.post<any>(endpoint, {
          "model": model+":latest",
          "messages": messages,
          "stream": false,
          "think": false,
          "options": {
            "temperature": temperature
          }
        });

    }

    sendFile(file: File): Observable<any> {
      
        const formData = new FormData();
        formData.append('file', file, file.name);
        const endpoint:string = this.apiUrl+"api/fileupload";
        return this.httpClient.post<any>(endpoint, formData);
      
    }

    

    


}
