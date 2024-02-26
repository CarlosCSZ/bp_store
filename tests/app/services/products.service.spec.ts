import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from '../../../src/app/services/products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  const mockProducts = [
    {
      id: '128-crd',
      name: 'tarjeta master',
      description: 'Tarjeta ilimitada de consumo',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: '2024-02-23T05:00:00.000+00:00',
      date_revision: '2025-02-23T05:00:00.000+00:00',
    },
    {
      id: 'lt-crd',
      name: 'tarjeta junior',
      description: 'Tarjeta de consumo limitado',
      logo: 'https://c0.klipartz.com/pngpicture/242/982/gratis-png-visa-logo-tarjeta-de-credito-e-commerce-visa-mastercard-visa-thumbnail.png',
      date_release: '2023-12-24T00:00:00.000+00:00',
      date_revision: '2024-12-24T00:00:00.000+00:00',
    },
    {
      id: 'bol-cre',
      name: 'bolsa de credito',
      description: 'Consorcio de creditos',
      logo: 'https://w7.pngwing.com/pngs/711/297/png-transparent-logo-american-express-payment-computer-icons-brand-american-express-blue-text-rectangle-thumbnail.png',
      date_release: '2024-02-26T05:00:00.000+00:00',
      date_revision: '2025-02-26T05:00:00.000+00:00',
    },
  ];
  const mockProduct = {
    id: 'bolsa2-cred',
    name: 'Fondos de creditos',
    description: 'Consorcio de creditos y fondos de reservas',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: '2024-02-27T05:00:00.000+00:00',
    date_revision: '2025-02-27T05:00:00.000+00:00',
  };
  const mockUpdate = {
    ...mockProduct,
    name: 'Fondos de inversiones',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('[getProducts]', () => {
    test('should include authorId in headers', waitForAsync(() => {
      service.getProducts().subscribe(() => {});

      const req = httpMock.expectOne(service['baseUrl']);
      expect(req.request.headers.get('authorId')).toEqual('0930517255');
      req.flush([]);
    }));

    test('should return products on success', waitForAsync(() => {
      service.getProducts().subscribe((products) => {
        expect(products).toEqual(mockProducts);
      });

      const req = httpMock.expectOne(service['baseUrl']);
      expect(req.request.method).toBe('GET');
      req.flush(mockProducts);
    }));
  });

  describe('[createProduct]', () => {
    test('should include authorId in headers', waitForAsync(() => {
      service.createProduct(mockProduct).subscribe(() => {});

      const req = httpMock.expectOne(service['baseUrl']);
      expect(req.request.headers.get('authorId')).toEqual('0930517255');
      req.flush(mockProduct);
    }));

    test('should create product and return products array', waitForAsync(() => {
      service.createProduct(mockProduct).subscribe((products) => {
        expect(products).toEqual([mockProduct]);
      });

      const req = httpMock.expectOne(service['baseUrl']);
      expect(req.request.method).toBe('POST');
      req.flush(mockProduct);
    }));

    // Can't test on 206 status code response. API is not working
  });

  describe('[updateProduct]', () => {
    test('should include authorId in headers', waitForAsync(() => {
      service.updateProduct(mockUpdate).subscribe(() => {});

      const req = httpMock.expectOne(service['baseUrl']);
      expect(req.request.headers.get('authorId')).toEqual('0930517255');
      req.flush([]);
    }));

    // Can't test on 206 status code response. API is not working
  });

  describe('[deleteProduct]', () => {
    test('should handle 400 Bad Request', waitForAsync(() => {
      service.deleteProduct('123').subscribe(
        () => fail('should have failed with 400 error'),
        (error) => {
          expect(error.message).toContain(
            'Ha surgido un problema borrando el producto, inténtalo más tarde.'
          );
        }
      );

      const req = httpMock.expectOne((req) => req.method === 'DELETE');
      expect(req.request.headers.get('authorId')).toEqual('0930517255');
      req.flush('Bad Request', { status: 400, statusText: 'Bad Request' });
    }));

    test('should handle 404 Not Found', waitForAsync(() => {
      service.deleteProduct('123').subscribe(
        () => fail('should have failed with 404 error'),
        (error) => {
          expect(error.message).toContain(
            'Ha surgido un problema, Por favor recargue la página.'
          );
        }
      );

      const req = httpMock.expectOne((req) => req.method === 'DELETE');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    }));

    test('should handle 200 OK and fetch products after delete', waitForAsync(() => {
      service.deleteProduct('123').subscribe(
        (response) => {
          expect(response).toEqual('Successfully Deleted');
        },
        () => fail('should not have failed')
      );

      const deleteReq = httpMock.expectOne((req) => req.method === 'DELETE');
      deleteReq.flush('Successfully Deleted', {
        status: 200,
        statusText: 'OK',
      });

      const getReq = httpMock.expectOne(service['baseUrl']);
      expect(getReq.request.headers.get('authorId')).toEqual('0930517255');
      getReq.flush([]);
    }));
  });
});
