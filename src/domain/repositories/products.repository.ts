import { Observable } from "rxjs";
import { Product, UpdateProduct } from "../models/products.model";


export abstract class ProductsRepository {
  abstract get products(): Product[];
  abstract get selectedProduct(): Product;
  abstract updateSelectedProduct(product: Product): void;
  abstract requestProducts(): Observable<Product[]>;
  abstract productValidation(id: string): Observable<boolean>;
  abstract createProduct(product: Product): Observable<Product[]>;
  abstract updateProduct(updates: UpdateProduct): Observable<string>;
  abstract deleteProduct(id: string): Observable<string>;
}
