import { Routes } from '@angular/router';
import {ProductView} from './product-view/product-view';
import {Products} from './products/products';
import {AccueilComponent} from './accueil-component/accueil-component';
import {LoginComponent} from './login-component/login-component';
import {RegisterComponent} from './register-component/register-component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: AccueilComponent },
  { path: 'shop', component: Products },
  { path: 'produit/:id', component: ProductView },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
