import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';

import { Product, UpdateProduct } from '../../../domain/models/products.model';
import { environment } from '../../../environments/environment.dev';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { ProductsRepository } from 'src/domain/repositories/products.repository';

@Injectable({
  providedIn: 'root',
})
export class ProductsImplementationRepository extends ProductsRepository {
  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = environment.API_URL + '/bp/products';
  private header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    authorId: environment.authorId,
  });

  private $products = signal<Product[]>([]);
  private $selectedProduct = signal<Product>(
    JSON.parse(
      sessionStorage.getItem('selectedProduct') ??
        JSON.stringify({
          id: '',
          name: '',
          description: '',
          logo: '',
          date_release: '',
          date_revision: '',
        })
    )
  );

  constructor() {
    super();
  }


  get products(): Product[] {
    return this.$products();
  }

  get selectedProduct(): Product {
    return this.$selectedProduct();
  }

  updateSelectedProduct(product: Product): void {
    this.$selectedProduct.update(() => {
      sessionStorage.setItem('selectedProduct', JSON.stringify(product));
      return product;
    });
  }

  requestProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.baseUrl, { headers: this.header })
      .pipe(
        map((data) => {
          this.$products.update(() => data);
          return data;
        }),
        catchError((err: HttpErrorResponse) => {
          console.error('getProduct service: ', err);
          if (err.status === HttpStatusCode.BadRequest) {
            return throwError(() => new Error('[GET] authorId is missing or unavailable'))
          }
          return throwError( () => new Error('[GET] Fallo el servidor'));
        })
      );
  }

  productValidation(id: string): Observable<boolean> {
    return this.requestProducts().pipe(
      map((products) => {
        const productFound = products.find((prod) => prod.id === id);
        if (productFound) {
          return false;
        }

        return true;
      }),
      catchError((err) => {
        console.error('productValidation service: ', err);
        return of(false);
      })
    );
  }

  createProduct(product: Product): Observable<Product[]> {
    return this.http
      .post<Product>(this.baseUrl, product, { headers: this.header })
      .pipe(
        map((data) => {
          this.$products.update((actProducts) => actProducts.concat(data));
          return this.products;
        }),
        catchError((err: HttpErrorResponse) => {
          console.error('createProduct service: ', err);
          if (err.status === HttpStatusCode.BadRequest || 206) {
            return throwError(() => new Error('Campo/s del formulario erroneo. Por favor asegurese de ingresar correctamente los datos.'))
          }
          return of(this.products);
        })
      );
  }

  updateProduct(updates: UpdateProduct): Observable<string> {
    const productIndex = this.$products().findIndex(
      (product) => product.id === updates.id
    );

    return this.http
      .put<Product>(this.baseUrl, updates, { headers: this.header })
      .pipe(
        map((data) => {
          if (productIndex !== -1) {
            this.$products.update((actProducts) => {
              const updatedProducts = [...actProducts];
              updatedProducts[productIndex] = data;
              return updatedProducts;
            });
          }

          return 'Succesfully Updated';
        }),
        catchError((err: HttpErrorResponse) => {
          console.error('UpdateProduct service: ', err);
          if (err.status === HttpStatusCode.BadRequest || HttpStatusCode.Unauthorized) {
            return throwError(() => new Error('Ha surgido un problema, inténtalo más tarde.'));
          }
          if (err.status === 206) {
            return throwError(() => new Error('Campo/s del formulario erroneo. Por favor asegurese de ingresar correctamente los datos.'));
          }
          return throwError(() => new Error('Ha surgido un problema, inténtalo más tarde.'));
        })
      );
  }

  deleteProduct(id: string): Observable<string> {
    this.header.set('responseType', 'text');
    return this.http
      .delete<string>(this.baseUrl, {
        headers: this.header,
        params: { id },
      })
      .pipe(
        switchMap((data) => {
          console.log('delete response: ', data);
          return this.requestProducts();
        }),
        map((data) => {
          console.log('GET response: ', data);
          this.$products.update(() => data);
          return 'Successfully Deleted';
        }),
        catchError((err) => {
          console.error('deleteProduct service: ', err);
          if (err.status === HttpStatusCode.BadRequest) {
            return throwError(() => new Error('Ha surgido un problema borrando el producto, inténtalo más tarde.'));
          }
          if (err.status === HttpStatusCode.NotFound) {
            return throwError(() => new Error('Ha surgido un problema, Por favor recargue la página.'));
          }
          if (err.status === 200) {
            return this.requestProducts().pipe(
              map((data) => {
                this.$products.update(() => data);
                return 'Successfully Deleted';
              }),
              catchError((getProductsErr) => {
                console.error(
                  'Error fetching products after delete: ',
                  getProductsErr
                );
                return throwError(() => new Error('Deleting Failed'));
              })
            );
          } else {
            return throwError(() => new Error('Deleting Failed'));
          }
        })
      );
  }
}
