import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ProductForm } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import { idValidation, urlValidation, dateReleaseValidation } from './formValidators';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent {
  private productsService = inject(ProductsService);

  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm() {
    this.productForm = this.fb.nonNullable.group<ProductForm>({
      id: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        idValidation(this.productsService),
      ]),
      name: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      description: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
      logo: this.fb.nonNullable.control('', [
        Validators.required,
        urlValidation(),
      ]),
      date_release: this.fb.nonNullable.control('', [
        Validators.required,
        dateReleaseValidation(),
      ]),
      date_revision: this.fb.nonNullable.control('', [Validators.required]),
    });
  }
}
