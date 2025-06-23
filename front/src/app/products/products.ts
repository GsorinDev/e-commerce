import {Component, OnInit} from '@angular/core';
import {Product} from '../product/product';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule, Product],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  products: any[] = [];

  async getAllProducts() {
    const res = await fetch('http://localhost:4000/products');
    this.products = await res.json();
  }

  ngOnInit() {
    this.getAllProducts();
  }
}
