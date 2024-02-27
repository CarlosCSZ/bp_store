import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { Product } from '../../../../domain/models/products.model';
import { DeleteEvent } from '../../common/enums/deleteEvent.enum';
import { DataModule } from 'src/data/data.module';
import { DeleteProductUseCase } from 'src/domain/usecases/delete-product.usecase';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [DataModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  private deleteProductUC = inject(DeleteProductUseCase);

  @Input() selectedProduct: Product | null = null;
  @Output() closeModal = new EventEmitter<[DeleteEvent, string]>();

  close() {
    this.closeModal.emit([DeleteEvent.DEFAULT, '']);
  }

  deleteProduct() {
    if (this.selectedProduct) {
      this.deleteProductUC.execute(this.selectedProduct.id)
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
