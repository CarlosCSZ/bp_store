import { Component, signal } from '@angular/core';
import { ProductsComponent } from '../../components/products/products.component';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.css'
})
export class PresentationComponent {
  searchedValue = signal<string>('');

  onSearching(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchedValue.update(() => input.value.trim());
  }
}
