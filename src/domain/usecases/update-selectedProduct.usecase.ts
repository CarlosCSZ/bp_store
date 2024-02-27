import { UseCase } from 'src/base/use-case';
import { ProductsRepository } from '../repositories/products.repository';
import { Product } from '../models/products.model';

export class UpdateSelectedProductUseCase implements UseCase<Product, void> {
  constructor(private productsRepository: ProductsRepository) {}

  execute(param: Product): void {
    return this.productsRepository.updateSelectedProduct(param);
  }
}
