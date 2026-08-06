import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BaseHeader } from '../base-header/base-header';
import { ApiService } from '../api-service';
import { Observable } from 'rxjs';
import { ErrorModal } from '../error-modal/error-modal';

@Component({
  selector: 'app-knowledge-base',
  imports: [BaseHeader, ErrorModal],
  templateUrl: './knowledge-base.html',
  styleUrl: './knowledge-base.css',
})
export class KnowledgeBase {
  readonly selectedFiles = signal<File[]>([]);
  readonly notice = signal('Your base is empty — add the first source when you are ready.');
  loading = signal(false);
  uploadSuccess = signal(false);
  uploadFailed = signal(false);
  constructor(private apiService: ApiService) {

  }
  addFile(event: Event): void {
    this.uploadFailed.set(false);
    this.uploadSuccess.set(false);
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (!files.length) return;
    this.trackRequest(this.apiService.sendFile(files[0]));
  }

  trackRequest(request: Observable<any>): void {
    this.loading.set(true);
    request.subscribe({
      next: (response) => {
        this.uploadSuccess.set(true);
      },
      error: (error) => {
        this.uploadFailed.set(true);
      },
      complete: () => {
        this.loading.set(false)
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }

  clearBase(): void {
    this.apiService.deleteKnowledgeBase().subscribe({
      next: (response) => {
        alert('Knowledge base cleared successfully.');
        this.selectedFiles.set([]);
      },
      error: (error) => {
        alert('Failed to clear knowledge base. Please try again.');
      }
    });
  }
}
