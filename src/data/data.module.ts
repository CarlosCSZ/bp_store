import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GetProductsUseCase } from 'src/domain/usecases/get-products.usecase';
import { ProductsRepository } from 'src/domain/repositories/products.repository';
import { GetSelectedProductUseCase } from 'src/domain/usecases/get-selectedProduct.usecase';
import { UpdateSelectedProductUseCase } from 'src/domain/usecases/update-selectedProduct.usecase';
import { RequestProductsUseCase } from 'src/domain/usecases/request-products.usecase';
import { ProductValidationUseCase } from 'src/domain/usecases/product-validation.usecase';
import { CreateProductUseCase } from 'src/domain/usecases/create-product.usecase';
import { UpdateProductUseCase } from 'src/domain/usecases/update-product.usecase';
import { DeleteProductUseCase } from 'src/domain/usecases/delete-product.usecase';
import { ProductsImplementationRepository } from './repositories/products/products-implementation.repository';

const getProductsUseCaseFactory = (productsRepo: ProductsRepository) =>
  new GetProductsUseCase(productsRepo);
const getProductsUseCaseProvider = {
  provide: GetProductsUseCase,
  useFactory: getProductsUseCaseFactory,
  deps: [ProductsRepository],
};

const getSelectedProductUseCaseFactory = (productsRepo: ProductsRepository) =>
  new GetSelectedProductUseCase(productsRepo);
const getSelectedProductUseCaseProvider = {
  provide: GetSelectedProductUseCase,
  useFactory: getSelectedProductUseCaseFactory,
  deps: [ProductsRepository],
};

const updateSelectedProductUseCaseFactory = (
  productsRepo: ProductsRepository
) => new UpdateSelectedProductUseCase(productsRepo);
const updateSelectedProductUseCaseProvider = {
  provide: UpdateSelectedProductUseCase,
  useFactory: updateSelectedProductUseCaseFactory,
  deps: [ProductsRepository],
};

const requestProductsUseCaseFactory = (productsRepo: ProductsRepository) =>
  new RequestProductsUseCase(productsRepo);
const requestProductsUseCaseProvider = {
  provide: RequestProductsUseCase,
  useFactory: requestProductsUseCaseFactory,
  deps: [ProductsRepository],
};

const productValidationUseCaseFactory = (productsRepo: ProductsRepository) =>
  new ProductValidationUseCase(productsRepo);
const productValidationUseCaseProvider = {
  provide: ProductValidationUseCase,
  useFactory: productValidationUseCaseFactory,
  deps: [ProductsRepository],
};

const createProductUseCaseFactory = (productsRepo: ProductsRepository) =>
  new CreateProductUseCase(productsRepo);
const createProductUseCaseProvider = {
  provide: CreateProductUseCase,
  useFactory: createProductUseCaseFactory,
  deps: [ProductsRepository],
};

const updateProductUseCaseFactory = (productsRepo: ProductsRepository) =>
  new UpdateProductUseCase(productsRepo);
const updateProductUseCaseProvider = {
  provide: UpdateProductUseCase,
  useFactory: updateProductUseCaseFactory,
  deps: [ProductsRepository],
};

const deleteProductUseCaseFactory = (productsRepo: ProductsRepository) =>
  new DeleteProductUseCase(productsRepo);
const deleteProductUseCaseProvider = {
  provide: DeleteProductUseCase,
  useFactory: deleteProductUseCaseFactory,
  deps: [ProductsRepository],
};

@NgModule({
  declarations: [],
  providers: [
    getProductsUseCaseProvider,
    getSelectedProductUseCaseProvider,
    updateSelectedProductUseCaseProvider,
    requestProductsUseCaseProvider,
    productValidationUseCaseProvider,
    createProductUseCaseProvider,
    updateProductUseCaseProvider,
    deleteProductUseCaseProvider,
    {
      provide: ProductsRepository,
      useClass: ProductsImplementationRepository
    }
  ],
  imports: [CommonModule, HttpClientModule],
})
class DataModule {}

export {
  DataModule,
  getProductsUseCaseProvider,
  getSelectedProductUseCaseProvider,
  updateSelectedProductUseCaseProvider,
  requestProductsUseCaseProvider,
  productValidationUseCaseProvider,
  createProductUseCaseProvider,
  updateProductUseCaseProvider,
  deleteProductUseCaseProvider,
};
