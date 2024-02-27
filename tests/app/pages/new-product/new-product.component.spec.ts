import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { NewProductComponent } from '../../../../src/app/pages/new-product/new-product.component';
import { ProductsService } from '../../../../src/app/services/products.service';

describe('[NewProductComponent]', () => {
  let component: NewProductComponent;
  let fixture: ComponentFixture<NewProductComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [ProductsService, HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(NewProductComponent);
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
    component.productForm.controls['id'].setValue('bol-cre');
    expect(component.productForm.controls['id'].valid).toBeFalsy();
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

  // test('date_revision should be a year after from date_release', fakeAsync(() => {
  //   const inputElement: HTMLInputElement =
  //     fixture.nativeElement.querySelector('#date_release');
  //   const changeEvent = new Event('change');
  //   (changeEvent as any).target = { value: '2024-03-11', id: 'date_release' };
  //   inputElement.value = '2024-03-11';
  //   component.formatDateRevision(changeEvent);
  //   inputElement.dispatchEvent(changeEvent);
  //   fixture.detectChanges();
  //   tick();

  //   const formatDateRevisionSpy = jest.spyOn(component, 'formatDateRevision');
  //   expect(formatDateRevisionSpy).toHaveBeenCalledWith(expect.any(Event));

  //   const revisionValue = component.productForm.controls['date_revision'].value;
  //   console.log('revision value: ', revisionValue);

  //   expect(revisionValue).toBe('2025-03-11');
  // }));

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
