import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EditProductComponent } from '../../../../src/app/pages/edit-product/edit-product.component';
import { ProductsService } from '../../../../src/app/services/products.service';

describe('[EditProductComponent]', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductComponent, HttpClientTestingModule],
      providers: [ProductsService, HttpClient],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductComponent);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should have a form with specified controls', () => {
    expect(component.productForm).toBeDefined();
    expect(component.productForm.controls['id']).toBeDefined();
    expect(component.productForm.controls['name']).toBeDefined();
    expect(component.productForm.controls['description']).toBeDefined();
    expect(component.productForm.controls['logo']).toBeDefined();
    expect(component.productForm.controls['date_release']).toBeDefined();
    expect(component.productForm.controls['date_revision']).toBeDefined();
  });

  test('form should checks the validations set', () => {
    component.productForm.controls['name'].setValue('bols');
    expect(component.productForm.controls['name'].valid).toBeFalsy();
    component.productForm.controls['description'].setValue('descrip');
    expect(component.productForm.controls['description'].valid).toBeFalsy();
    component.productForm.controls['logo'].setValue('logo');
    expect(component.productForm.controls['logo'].valid).toBeFalsy();
    component.productForm.controls['date_release'].setValue('2024-01-11');
    expect(
      component.productForm.controls['date_release'].hasError(
        'invalidDateRelease'
      )
    ).toBeFalsy();

    component.productForm.controls['id'].setValue('147-newId');
    expect(component.productForm.controls['id'].errors === null).toBeTruthy();
    component.productForm.controls['name'].setValue('bolsa-credito');
    expect(component.productForm.controls['name'].valid).toBeTruthy();
    component.productForm.controls['description'].setValue(
      'descipcion del producto bancario'
    );
    expect(component.productForm.controls['description'].valid).toBeTruthy();
    component.productForm.controls['logo'].setValue(
      'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg'
    );
    expect(component.productForm.controls['logo'].valid).toBeTruthy();
    component.productForm.controls['date_release'].setValue('2024-01-11');
    expect(component.productForm.controls['date_release'].valid).toBeTruthy();

    expect(component.error).toBeFalsy();
  });

  test('should reset the form when click on -Reiniciar- button', () => {
    component.productForm.controls['id'].setValue('369-cred');
    component.productForm.controls['name'].setValue('Credito 365');
    component.productForm.controls['description'].setValue(
      'Este el producto crediticio completo'
    );
    component.productForm.controls['logo'].setValue(
      'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg'
    );
    component.productForm.controls['date_release'].setValue('2024-04-10');
    component.productForm.controls['date_revision'].setValue('2025-04-10');

    component.onReset();

    expect(component.productForm.get('id')?.value).toBe('');
    expect(component.productForm.get('name')?.value).toBe('');
    expect(component.productForm.get('description')?.value).toBe('');
    expect(component.productForm.get('logo')?.value).toBe('');
    expect(component.productForm.get('date_release')?.value).toBe('');
    expect(component.productForm.get('date_revision')?.value).toBe('');
  });
});
