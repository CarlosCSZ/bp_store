import { Observable } from 'rxjs';

import { UseCase } from 'src/base/use-case';
import { ProductsRepository } from '../repositories/products.repository';

export class DeleteProductUseCase implements UseCase<string, string> {
  constructor(private productsRepository: ProductsRepository) {}

  execute(param: string): Observable<string> {
    return this.productsRepository.deleteProduct(param);
  }
}
