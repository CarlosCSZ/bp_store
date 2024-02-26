import { Component, OnInit, signal } from '@angular/core';
import { ProductsComponent } from '../../components/products/products.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.css',
})
export class PresentationComponent implements OnInit {
  searchedValue = signal<string>('');
  isExapndButton: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    sessionStorage.setItem(
      'selectedProduct',
      JSON.stringify({
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: '',
      })
    );
  }

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
