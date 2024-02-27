import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  Product,
  ProductForm,
  ProductValidation,
} from '../../../../domain/models/products.model';
import { dateReleaseValidation } from '../../common/validators/formValidators';
import { formatDateInput, formatDateStr } from '../../utils/datesFormater';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { UpdateProductUseCase } from 'src/domain/usecases/update-product.usecase';
import { GetSelectedProductUseCase } from 'src/domain/usecases/get-selectedProduct.usecase';
import { DataModule } from 'src/data/data.module';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    DataModule,
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  private updateProductUC = inject(UpdateProductUseCase);
  private selectedProductUC = inject(GetSelectedProductUseCase);

  productForm!: FormGroup;
  productInvalid: ProductValidation = {
    id: false,
    name: false,
    description: false,
    logo: false,
    date_release: false,
    date_revision: false,
  };
  selectedProduct: Product = this.selectedProductUC.execute();
  error: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.productForm.controls['id'].setValue(this.selectedProduct.id);
    this.productForm.controls['name'].setValue(this.selectedProduct.name);
    this.productForm.controls['description'].setValue(
      this.selectedProduct.description
    );
    this.productForm.controls['logo'].setValue(this.selectedProduct.logo);
    this.productForm.controls['date_release'].setValue(
      formatDateInput(this.selectedProduct.date_release)
    );
    this.productForm.controls['date_revision'].setValue(
      formatDateInput(this.selectedProduct.date_revision)
    );

    console.log(
      'formulario: ',
      this.productForm.controls['date_release'].statusChanges
    );
  }

  initializeForm() {
    this.productForm = this.fb.nonNullable.group<ProductForm>({
      id: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
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
    console.log('date: ', parsedDate);
    console.log('dateRevision: ', dateRevision.toISOString());
    this.productForm.controls['date_revision'].setValue(
      formatDateInput(dateRevision.toISOString())
    );
  }

  homePage() {
    this.router.navigate(['home']);
  }

  onReset() {
    this.productForm.reset();
    this.productForm.controls['id'].setValue(this.selectedProduct.id);
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.updateProductUC
        .execute({
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
            console.log('Product Updated Successfully');
            this.router.navigate(['home']);
          },
          error: (err: Error) => {
            console.error('Request Failed: ', err);
            this.productForm.reset();
            this.productForm.controls['id'].setValue(this.selectedProduct.id);
            this.error = true;
            this.errorMessage = err.message;
          },
        });
    }
  }
}
