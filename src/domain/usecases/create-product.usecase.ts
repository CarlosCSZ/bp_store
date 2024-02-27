import { Observable } from 'rxjs';

import { UseCase } from 'src/base/use-case';
import { ProductsRepository } from '../repositories/products.repository';
import { Product } from '../models/products.model';

export class CreateProductUseCase implements UseCase<Product, Product[]> {
  constructor(private productsRepository: ProductsRepository) {}

  execute(param: Product): Observable<Product[]> {
    return this.productsRepository.createProduct(param);
  }
}
