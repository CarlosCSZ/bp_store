import { UseCase } from 'src/base/use-case';
import { Product } from '../models/products.model';
import { ProductsRepository } from '../repositories/products.repository';

export class GetProductsUseCase implements UseCase<Product, Product[]> {
  constructor(private productsRepository: ProductsRepository) {}

  execute(): Product[] {
    return this.productsRepository.products;
  }
}
