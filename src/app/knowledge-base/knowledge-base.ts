import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BaseHeader } from '../base-header/base-header';
import { ApiService } from '../api-service';

@Component({
  selector: 'app-knowledge-base',
  imports: [BaseHeader, DecimalPipe],
  templateUrl: './knowledge-base.html',
  styleUrl: './knowledge-base.css',
})
export class KnowledgeBase {
  readonly selectedFiles = signal<File[]>([]);
  readonly notice = signal('Your base is empty — add the first source when you are ready.');

  constructor(private apiService: ApiService) {

  }
  addFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (!files.length) return;
    this.apiService.sendFile(files[0]).subscribe({
      next: (response) => {
        console.log('File uploaded successfully:', response);
      },
      error: (error) => {
        console.log('File upload failed:', error);
      }

    });
  }


  clearBase(): void {
    this.selectedFiles.set([]);
    this.notice.set('Your base is empty — add the first source when you are ready.');
  }
}
