import { Component } from '@angular/core';
import {Navbar} from './navbar/navbar';
import {Products} from './products/products';
import {ProductView} from './product-view/product-view';
import {RouterOutlet} from '@angular/router';
import {Shopping} from './shopping/shopping';

@Component({
  selector: 'app-root',
  imports: [Navbar, Products, ProductView, RouterOutlet, Shopping],
  templateUrl: './app.html',
  styleUrl: '../styles.css'
})
export class App {
  cartOpen= false
  protected title = 'e-commerce-front';
}
