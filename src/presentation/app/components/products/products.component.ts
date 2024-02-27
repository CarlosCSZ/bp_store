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
import { Router } from '@angular/router';

import {
  Product,
  ProductPresentation,
} from '../../../../domain/models/products.model';
import { PaginationComponent } from '../pagination/pagination.component';
import { formatDateStr } from '../../utils/datesFormater';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { DeleteEvent } from '../../common/enums/deleteEvent.enum';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { GhostProductsComponent } from '../ghost-products/ghost-products.component';
import { DataModule } from 'src/data/data.module';
import { RequestProductsUseCase } from 'src/domain/usecases/request-products.usecase';
import { GetProductsUseCase } from 'src/domain/usecases/get-products.usecase';
import { UpdateSelectedProductUseCase } from 'src/domain/usecases/update-selectedProduct.usecase';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    HttpClientModule,
    PaginationComponent,
    DeleteModalComponent,
    ErrorMessageComponent,
    GhostProductsComponent,
    DataModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnChanges {
  private reqProductsUC = inject(RequestProductsUseCase);
  private getProductsUC = inject(GetProductsUseCase);
  private updateSelectedProductUC = inject(UpdateSelectedProductUseCase);

  showDropdown: boolean = false;
  selectedQty: number = 5;
  resultQty: number = this.selectedQty;
  products: ProductPresentation[] = [];
  selectedProduct!: Product;
  totalProducts: number = this.getProductsUC.execute().length;
  @Input() searchedValue: string = '';
  openDeleteModal: boolean = false;
  error: boolean = false;
  errorMessage: string = '';
  loading: boolean = true;

  constructor(private router: Router) {
    effect(() => {
      console.log('hubo un cambio - product component');
      this.resultsToShow();
    });
  }

  ngOnInit(): void {
    this.reqProductsUC.execute().subscribe({
      next: () => {
        console.log('[Product Component] Productos recuperados');
        this.resultsToShow();
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.error = true;
        this.errorMessage = 'Ha surgido un problema, inténtalo más tarde.';
      },
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

  formatApiDate(dateApi: string): string {
    return formatDateStr(dateApi);
  }

  resultsToShow() {
    if (this.totalProducts > this.selectedQty) {
      this.products = this.getProductsUC.execute()
        .map((product) => {
          return {
            ...product,
            showMenu: false,
          };
        })
        .slice(0, this.selectedQty);
      this.resultQty = this.selectedQty;
    } else {
      this.products = this.getProductsUC.execute().map((product) => {
        return {
          ...product,
          showMenu: false,
        };
      });
      this.totalProducts = this.getProductsUC.execute().length;
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
    this.products = this.getProductsUC.execute()
      .map((product) => {
        return {
          ...product,
          showMenu: false,
        };
      })
      .slice(offset, endSlice);
    this.resultQty = this.products.length;
  }

  toggleMenu(productId: string) {
    const productIndex = this.products.findIndex(
      (data) => data.id === productId
    );
    if (productIndex !== -1) {
      this.products.forEach((data) => {
        if (data.id === productId) {
          data.showMenu = !data.showMenu;
        } else {
          data.showMenu = false;
        }
      });
    }
  }

  redirectPage(productPre: ProductPresentation, page: string) {
    const { showMenu, ...product } = productPre;
    this.updateSelectedProductUC.execute(product);
    if (page === 'delete') {
      this.selectedProduct = product;
      this.openDeleteModal = true;
    } else {
      this.router.navigate([page]);
    }
  }

  onCloseModal(event: [DeleteEvent, string]) {
    this.openDeleteModal = false;

    if (event[0] === DeleteEvent.FAILED) {
      this.error = true;
      this.errorMessage = event[1];

      setTimeout(() => {
        this.error = false;
      }, 3000);
    }
  }
}
