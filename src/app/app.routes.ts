import { Routes } from '@angular/router';
import { PresentationComponent } from './pages/presentation/presentation.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';

export const routes: Routes = [
  {
    path: 'home',
    component: PresentationComponent,
  },
  {
    path: 'new-product',
    component: NewProductComponent,
  },
  {
    path: 'edit-product',
    component: EditProductComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
