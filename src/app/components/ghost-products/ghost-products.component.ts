import { Component } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-ghost-products',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './ghost-products.component.html',
  styleUrls: ['./ghost-products.component.css', '../products/products.component.css']
})
export class GhostProductsComponent {
  products: string[] = Array.from({ length: 5 }, (v) => 'product')
}
