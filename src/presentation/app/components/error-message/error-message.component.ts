import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {
  @Input() message: string = 'Ha surgido un problema, inténtalo más tarde.'
  @Input() activate: boolean = false;
}
