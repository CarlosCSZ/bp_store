import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { format, getMonth, parseISO } from 'date-fns';

import { ProductForm, ProductValidation } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import { idValidation, dateReleaseValidation } from './formValidators';
import { Router } from '@angular/router';

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
  dateRevisionValue: string = '';
  productInvalid: ProductValidation = {
    id: false,
    name: false,
    description: false,
    logo: false,
    date_release: false,
    date_revision: false,
  };

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
        dateReleaseValidation
      ),
      date_revision: this.fb.nonNullable.control('', [Validators.required]),
    });
  }

  chechingValue(event: Event) {
    const input = event.target as HTMLInputElement;
    const formValue = input.id;
    if (this.productForm.controls[formValue].invalid) {
      console.log('invalido');
      this.productInvalid[formValue as keyof ProductValidation] = true;
    } else {
      this.productInvalid[formValue as keyof ProductValidation] = false;
    }
    console.log(
      'Form: ',
      this.productForm.controls
    );
    console.log('check invalidation: ', this.productForm.valid)
  }

  formatDateRevision(event: Event) {
    this.chechingValue(event);
    const input = event.target as HTMLInputElement;
    const date = input.value;
    const inputId = input.id;
    if (this.productInvalid[inputId as keyof ProductValidation]) {
      return;
    }
    const parsedDate = this.formatDateStr(date);
    const dateRevision = new Date(parsedDate + ' 23:59');
    dateRevision.setFullYear(dateRevision.getFullYear() + 1);
    console.log('date: ', parsedDate);
    console.log('dateRevision: ', dateRevision.toISOString());
    this.dateRevisionValue = this.formatDateInput(dateRevision.toISOString());
    this.productForm.controls['date_revision'].setValue(this.dateRevisionValue);
  }

  formatDateStr(date: string): string {
    const parsedDate = parseISO(date);
    return format(parsedDate, 'yyyy/MM/dd');
  }

  formatDateInput(date: string): string {
    const parsedDate = parseISO(date);
    return format(parsedDate, 'yyyy-MM-dd');
  }

  homePage() {
    this.router.navigate(['home'])
  }

  onReset() {
    this.productForm.reset();
  }

  onSubmit() {
    console.log('date-release: ', this.productForm.controls['date_release'].value)
    console.log('date_revision: ', this.productForm.controls['date_revision'].value)
    if (this.productForm.valid) {
      this.productsService.createProduct({
        id: this.productForm.controls['id'].value,
        name: this.productForm.controls['name'].value,
        description: this.productForm.controls['description'].value,
        logo: this.productForm.controls['logo'].value,
        date_release: new Date(this.formatDateStr(this.productForm.controls['date_release'].value + ' 23:59')).toISOString(),
        date_revision: new Date(this.formatDateStr(this.productForm.controls['date_revision'].value + ' 23:59')).toISOString(),
      })
      .subscribe({
        next: () => {
          console.log('Product Created Successfully');
          this.router.navigate(['home'])
        },
        error: (err) => {
          console.error('Request Failed: ', err);
          this.productForm.reset();
        }
      })
    }
  }
}
