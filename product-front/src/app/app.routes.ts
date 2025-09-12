import { Routes } from '@angular/router';
import { ProductList } from './products/product-list/product-list';
import { ProductForm } from './products/product-form/product-form';

export const routes: Routes = [
  { path: '', redirectTo: 'products/list', pathMatch: 'full' },
  { path: 'products/list', component: ProductList },
  { path: 'products/new', component: ProductForm },
  {
    path: 'products/edit/:id',
    component: ProductForm,
    data: { renderMode: 'csr' } 
  },
];
