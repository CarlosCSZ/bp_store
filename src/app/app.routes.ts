import { Routes } from '@angular/router';
import { PresentationComponent } from './pages/presentation/presentation.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];
