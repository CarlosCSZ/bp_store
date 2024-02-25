import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  effect,
  inject,
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { format, parseISO } from 'date-fns';

import { Product } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule, PaginationComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnChanges {
  private productsService = inject(ProductsService);

  showDropdown: boolean = false;
  selectedQty: number = 5;
  resultQty: number = this.selectedQty;
  products: Product[] = [];
  totalProducts: number = this.productsService.products.length;
  @Input() searchedValue: string = '';

  constructor() {
    effect(() => {
      console.log('hubo un cambio - product component');
      this.resultsToShow();
    });
  }

  ngOnInit(): void {
    this.productsService.getProducts()
    .subscribe({
      next: () => console.log('Productos recuperados'),
      error: (err) => console.log(err)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const searchedValueChanged = changes['searchedValue'];
    if (searchedValueChanged && this.searchedValue.length > 0) {
      this.resultsToShow();
      this.products = this.products.filter((product) =>
        product.name.includes(this.searchedValue)
      );
      this.resultQty = this.products.length;
      return;
    }
    this.resultsToShow();
  }

  formatDateStr(dateApi: string): string {
    const parsedDate = parseISO(dateApi);
    return format(parsedDate, 'dd/MM/yyyy');
  }

  resultsToShow() {
    if (this.totalProducts > this.selectedQty) {
      this.products = [...this.productsService.products].slice(
        0,
        this.selectedQty
      );
      this.resultQty = this.selectedQty;
    } else {
      this.products = this.productsService.products;
      this.totalProducts = this.productsService.products.length;
      this.resultQty = this.products.length;
    }
  }

  onQtyChanged(quantity: number) {
    this.selectedQty = quantity;
    this.resultsToShow();
  }

  onPageChanged(page: number) {
    const offset = this.selectedQty * (page - 1);
    const endSlice = this.selectedQty * page;
    this.products = this.productsService.products.slice(
      offset,
      endSlice
    );
    this.resultQty = this.products.length;
  }

  deleteProduct(id: string) {
    console.log(id);
  }
}
