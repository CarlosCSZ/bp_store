import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ProductForm, ProductValidation } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import { idValidation, dateReleaseValidation } from './formValidators';

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
  productInvalid: ProductValidation = {
    id: false,
    name: false,
    description: false,
    logo: false,
    date_release: false,
    date_revision: false,
  };

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm() {
    this.productForm = this.fb.nonNullable.group<ProductForm>({
      id: this.fb.nonNullable.control(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
        idValidation(this.productsService)
      ),
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
        Validators.pattern(/^(http|https):\/\/[^ "]+$/),
      ]),
      date_release: this.fb.nonNullable.control(
        '',
        [Validators.required],
        dateReleaseValidation
      ),
      date_revision: this.fb.nonNullable.control('', [Validators.required]),
    });
  }

  chechingValue(event: Event) {
    const input = event.target as HTMLInputElement;
    const formValue = input.id;
    if (this.productForm.controls[formValue].invalid) {
      console.log('invalido')
      this.productInvalid[formValue as keyof ProductValidation] = true;
    } else {
      this.productInvalid[formValue as keyof ProductValidation] = false;
    }
    // console.log('target: ', input.id);
    // console.log('date: ', input.value);
    console.log(
      'Form: ',
      this.productForm.controls[formValue as keyof ProductValidation]
    );
  }
}
