import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product, UpdateProduct } from '../models/products';
import { environment } from '../../environments/environment.dev';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = environment.API_URL + '/bp/products';
  private header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    authorId: environment.authorId,
  });

  private $products = signal<Product[]>([]);
  private $selectedProduct = signal<Product>({
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: ''
  });

  get products(): Product[] {
    return this.$products();
  }

  get selectedProduct(): Product {
    return this.$selectedProduct();
  }

  updateSelectedProduct(product: Product) {
    this.$selectedProduct.update(() => product);
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.baseUrl, { headers: this.header })
      .pipe(
        map((data) => {
          console.log('recibimos la data: ');
          this.$products.update(() => data);
          return data;
        }),
        catchError((err) => {
          console.error('getProduct service: ', err);
          return of([] as Product[]);
        })
      );
  }

  productValidation(id: string): Observable<boolean> {
    return this.getProducts().pipe(
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
        catchError((err) => {
          console.error('createProduct service: ', err);
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
        catchError((err) => {
          console.error('UpdateProduct service: ', err);
          return 'Update Failed';
        })
      );
  }

  deleteProduct(id: string): Observable<string> {
    return this.http
    .delete<string>(this.baseUrl, {
      headers: this.header,
      params: { id },
    })
    .pipe(
      map((data) => data),
      catchError((err) => {
        console.error('deleteProduct service: ', err);
        return 'Deleting Failed';
      })
    );
  }
}
