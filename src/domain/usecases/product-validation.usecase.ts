import { Observable } from "rxjs";

import { UseCase } from "src/base/use-case";
import { ProductsRepository } from "../repositories/products.repository";

export class ProductValidationUseCase implements UseCase<string, boolean> {
  constructor(private productsRepository: ProductsRepository) {}

  execute(param: string): Observable<boolean> {
    return this.productsRepository.productValidation(param);
  }
}
