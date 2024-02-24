import { Component, inject, signal } from '@angular/core';
import { Product } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private productsService = inject(ProductsService)

  qtyFilter: number[] = [5, 10, 20];
  showDropdown: boolean = false;
  selectedQty = signal<number>(5);
  products: Product[] = this.productsService.products;



  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectQty(quantity: number) {
    this.selectedQty.update(() => quantity);
    this.toggleDropdown();
  }
}
