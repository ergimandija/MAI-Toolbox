import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BaseHeader } from '../base-header/base-header';

@Component({
  selector: 'app-knowledge-base',
  imports: [BaseHeader, DecimalPipe],
  templateUrl: './knowledge-base.html',
  styleUrl: './knowledge-base.css',
})
export class KnowledgeBase {
  readonly selectedFiles = signal<File[]>([]);
  readonly notice = signal('Your base is empty — add the first source when you are ready.');

  addFiles(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (!files.length) return;
    this.selectedFiles.update((current) => [...current, ...files]);
    this.notice.set(`${files.length} file${files.length === 1 ? '' : 's'} added. Ready to index locally.`);
    input.value = '';
  }

  clearBase(): void {
    this.selectedFiles.set([]);
    this.notice.set('Your base is empty — add the first source when you are ready.');
  }
}
