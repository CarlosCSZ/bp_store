import { Observable } from 'rxjs';

import { UseCase } from 'src/base/use-case';
import { ProductsRepository } from '../repositories/products.repository';
import { UpdateProduct } from '../models/products.model';

export class UpdateProductUseCase implements UseCase<UpdateProduct, string> {
  constructor(private productsRepository: ProductsRepository) {}

  execute(param: UpdateProduct): Observable<string> {
    return this.productsRepository.updateProduct(param);
  }
}
