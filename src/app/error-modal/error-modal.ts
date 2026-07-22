import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  imports: [],
  templateUrl: './error-modal.html',
  styleUrl: './error-modal.css',
})
export class ErrorModal {
  /** Replace this input with the message returned by your API or error handler. */
  readonly errorMessage = input('An unexpected error occurred. Please try again.');
  readonly closed = output<void>();
}
