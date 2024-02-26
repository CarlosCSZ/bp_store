import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Product } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import { DeleteEvent } from '../../common/enums/deleteEvent.enum';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  private productsService = inject(ProductsService);

  @Input() selectedProduct: Product | null = null;
  @Output() closeModal = new EventEmitter<[DeleteEvent, string]>();

  close() {
    this.closeModal.emit([DeleteEvent.DEFAULT, '']);
  }

  deleteProduct() {
    if (this.selectedProduct) {
      this.productsService.deleteProduct(this.selectedProduct.id)
      .subscribe({
        next: (data) => {
          console.log('response: ', data);
          this.closeModal.emit([DeleteEvent.SUCCESS, '']);
        },
        error: (err: Error) => {
          console.log(err);
          this.closeModal.emit([DeleteEvent.FAILED, err.message]);
        }
      })
    }
  }
}
