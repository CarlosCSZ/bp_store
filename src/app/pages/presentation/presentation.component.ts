import { Component, signal } from '@angular/core';
import { ProductsComponent } from '../../components/products/products.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.css'
})
export class PresentationComponent {
  searchedValue = signal<string>('');
  isExapndButton: boolean = false;

  constructor(private router:Router) {}

  onSearching(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchedValue.update(() => input.value.trim());
  }

  onAddProduct() {
    this.isExapndButton = true;
    setTimeout(() => {
      this.router.navigate(['new-product']);
      this.isExapndButton = false;
    }, 650);
  }
}
