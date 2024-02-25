import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  effect,
  inject,
  signal,
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
  @Input() searchedValue: string = '';

  constructor() {
    effect(() => {
      console.log('hubo un cambio');
      this.resultsToShow();
    });
  }

  ngOnInit(): void {
    if (this.products.length === 0) {
      this.productsService.getProducts();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes)
    const searchedValueChanged = changes['searchedValue'];
    if (searchedValueChanged && this.searchedValue.length > 0) {
      this.resultsToShow();
      this.products = this.products.filter((product) => product.name.includes(this.searchedValue))
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
    if (this.productsService.products.length > this.selectedQty) {
      this.products = [...this.productsService.products].slice(
        0,
        this.selectedQty
      );
      this.resultQty = this.selectedQty;
    } else {
      this.products = this.productsService.products;
      this.resultQty = this.products.length;
    }
  }

  onQtyChanged(quantity: number) {
    this.selectedQty = quantity;
    this.resultsToShow();
  }

  deleteProduct(id: string) {
    console.log(id);
  }
}
