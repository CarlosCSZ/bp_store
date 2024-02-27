import { Observable } from "rxjs";

import { UseCase } from "src/base/use-case";
import { Product } from "../models/products.model";
import { ProductsRepository } from "../repositories/products.repository";

export class RequestProductsUseCase implements UseCase<Product, Product[]> {
  constructor(private productsRepository: ProductsRepository) {}

  execute(): Observable<Product[]> {
    return this.productsRepository.requestProducts();
  }
}
