import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ProductForm, ProductValidation } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import {
  idValidation,
  dateReleaseValidation,
} from '../../common/validators/formValidators';
import { formatDateInput, formatDateStr } from '../../utils/datesFormater';
import { ErrorMessageComponent } from '@app/components/error-message/error-message.component';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent],
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
  error: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
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
        dateReleaseValidation()
      ),
      date_revision: this.fb.nonNullable.control('', [Validators.required]),
    });
  }

  checkingValue(event: Event) {
    const keyBoardEvent = event as KeyboardEvent;
    if (keyBoardEvent.key === 'Enter') {
      event.preventDefault();
    }

    const input = event.target as HTMLInputElement;
    const formValue = input.id;
    if (this.productForm.controls[formValue].invalid) {
      this.productInvalid[formValue as keyof ProductValidation] = true;
    } else {
      this.productInvalid[formValue as keyof ProductValidation] = false;
    }
    console.log('Form: ', this.productForm.controls);
    this.error = false;
  }

  formatDateRevision(event: Event) {
    this.checkingValue(event);
    const input = event.target as HTMLInputElement;
    const date = input.value;
    const inputId = input.id;
    if (this.productInvalid[inputId as keyof ProductValidation]) {
      return;
    }
    const parsedDate = formatDateStr(date);
    const dateRevision = new Date(parsedDate + ' 23:59');
    dateRevision.setFullYear(dateRevision.getFullYear() + 1);
    this.productForm.controls['date_revision'].setValue(
      formatDateInput(dateRevision.toISOString())
    );
  }

  homePage() {
    this.router.navigate(['home']);
  }

  onReset() {
    this.productForm.reset();
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productsService
        .createProduct({
          id: this.productForm.controls['id'].value,
          name: this.productForm.controls['name'].value,
          description: this.productForm.controls['description'].value,
          logo: this.productForm.controls['logo'].value,
          date_release: new Date(
            formatDateStr(
              this.productForm.controls['date_release'].value + ' 23:59'
            )
          ).toISOString(),
          date_revision: new Date(
            formatDateStr(
              this.productForm.controls['date_revision'].value + ' 23:59'
            )
          ).toISOString(),
        })
        .subscribe({
          next: () => {
            console.log('Product Created Successfully');
            this.router.navigate(['home']);
          },
          error: (err: Error) => {
            console.error('Request Failed: ', err);
            this.productForm.reset();
            this.error = true;
            this.errorMessage = err.message;
          },
        });
    }
  }
}
