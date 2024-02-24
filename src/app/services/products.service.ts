import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product, UpdateProduct } from '../models/products';
import { environment } from '../../environments/environment.dev';

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

  private $products = signal<Product[]>([
    {
      id: '128-crd',
      name: 'tarjeta master',
      description: 'Tarjeta ilimitada de consumo',
      logo: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fes%2Ffree-png-trszf&psig=AOvVaw0mywyWuQ8SRy9tte-IezdO&ust=1708868770622000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiJm7KOxIQDFQAAAAAdAAAAABAE',
      date_release: '2024-02-24T00:00:00.000+00:00',
      date_revision: '2025-02-24T00:00:00.000+00:00',
    },
    {
      id: 'lt-crd',
      name: 'tarjeta junior',
      description: 'Tarjeta de consumo limitado',
      logo: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fes%2Fsearch%3Fq%3DAmerican%2BExpress&psig=AOvVaw1o47p2nlrfHUZJLRWl90g4&ust=1708868921743000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJjfq_qOxIQDFQAAAAAdAAAAABAE',
      date_release: '2023-12-24T00:00:00.000+00:00',
      date_revision: '2024-12-24T00:00:00.000+00:00',
    },
  ]);


  get products(): Product[] {
    return this.$products();
  }

  getProducts() {
    return this.http
      .get<Product[]>(this.baseUrl, { headers: this.header })
      .subscribe({
        next: (data) => this.$products.update(() => data),
        error: (err) => console.error('getProduct service: ', err),
      });
  }

  createProduct(product: Product): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http
        .post<Product>(this.baseUrl, product, { headers: this.header })
        .subscribe({
          next: (data) => {
            this.$products.update((actProducts) => {
              return actProducts.concat(data);
            });

            resolve('Created Successfully!');
          },
          error: (err) => {
            console.error('createProduct service: ', err);
            reject('Creation Failed');
          },
        });
    });
  }

  UpdateProduct(updates: UpdateProduct): Promise<string> {
    const productIndex = this.$products().findIndex(
      (product) => product.id === updates.id
    );

    return new Promise((resolve, reject) => {
      this.http
        .put<Product>(this.baseUrl, updates, { headers: this.header })
        .subscribe({
          next: (data) => {
            if (productIndex !== -1) {
              this.$products.update((actProducts) => {
                const updatedProducts = [...actProducts];
                updatedProducts[productIndex] = data;
                return updatedProducts;
              });

              resolve('Updated Successfully!');
            }
          },
          error: (err) => {
            console.error('UpdateProduct service: ', err);
            reject('Updated Failed');
          },
        });
    });
  }

  deleteProduct(id: string): Promise<string> {
    const productIndex = this.$products().findIndex(
      (product) => product.id === id
    );

    return new Promise((resolve, reject) => {
      this.http
        .delete<string>(this.baseUrl, {
          headers: this.header,
          params: { id },
        })
        .subscribe({
          next: (data) => resolve(data),
          error: (err) => {
            console.error('deleteProduct service: ', err);
            reject('Deleting Failed');
          },
        });
    });
  }
}
