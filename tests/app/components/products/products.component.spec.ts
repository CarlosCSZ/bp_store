import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { ProductsComponent } from '../../../../src/app/components/products/products.component';
import { ProductsService } from '../../../../src/app/services/products.service';

describe('[ProductsComponent]', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  const products = [
    {
      id: '1',
      name: 'Product A',
      description: 'Description A',
      date_release: '2022-01-01',
      date_revision: '2023-01-01',
      logo: 'logoA.jpg',
    },
    {
      id: '2',
      name: 'Product B',
      description: 'Description B',
      date_release: '2022-02-01',
      date_revision: '2023-02-01',
      logo: 'logoB.jpg',
    },
    {
      id: '3',
      name: 'Product C',
      description: 'Description C',
      date_release: '2022-03-01',
      date_revision: '2023-03-01',
      logo: 'logoC.jpg',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [ProductsService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  // test('should handle product search', fakeAsync(() => {
  //   const productsService = TestBed.inject(ProductsService);
  //   jest
  //     .spyOn(productsService, 'getProducts')
  //     .mockReturnValue(of(products));

  //   component.searchedValue = 'C';
  //   component.ngOnChanges({
  //     searchedValue: {
  //       currentValue: 'C',
  //       previousValue: '',
  //       firstChange: true,
  //       isFirstChange: () => true,
  //     },
  //   });

  //   fixture.whenStable();

  //   fixture.detectChanges();
  //   console.log('products: ', component.products);
  //   console.log('products service: ', productsService.products);

  //   expect(component.products.length).toBe(1);
  //   expect(component.products[0].name).toBe('Product C');
  // }));

  // test('should toggle product menu', () => {
  //   const productsService = TestBed.inject(ProductsService);
  //   jest
  //     .spyOn(productsService, 'getProducts')
  //     .mockReturnValue(
  //       of(products.map((product) => ({ ...product, showMenu: false })))
  //     );

  //   expect(component.products.every((p) => !p.showMenu)).toBeTruthy();

  //   component.toggleMenu('2');

  //   expect(component.products[0].showMenu).toBeFalsy();
  //   expect(component.products[1].showMenu).toBeTruthy();
  //   expect(component.products[2].showMenu).toBeFalsy();
  // });
});
