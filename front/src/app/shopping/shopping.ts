import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';
import {FormsModule, NgModel} from '@angular/forms';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './shopping.html',
  styleUrls: ['./shopping.css']
})
export class Shopping implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() closeCart = new EventEmitter<void>();

  cartItems: any[] = [];
  userId: string = '1';

  async ngOnInit() {
    await this.loadCart();
  }

  async loadCart() {
    try {
      const res = await fetch(`http://localhost:4000/shopping`, {method: 'GET', headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }});
      const data = await res.json();
      if (!data.error) {
        this.cartItems = Array.isArray(data) ? data : [data];
      }
    } catch (err) {
      console.error('Erreur lors du chargement du panier', err);
    }
  }

  async updateQuantity(item: any) {
    try {
      await fetch(`http://localhost:4000/shopping/${item.id}/update`, {
        method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        body: JSON.stringify(item)
      });
    } catch (err) {
      console.error('Erreur mise à jour quantité', err);
    }
  }

  async removeItem(id: string) {
    try {
      await fetch(`http://localhost:4000/shopping/1/delete/${id}`, { method: 'DELETE', headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },});
      this.cartItems = this.cartItems.filter(item => item.Product.id !== id);
    } catch (err) {
      console.error('Erreur suppression article', err);
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.Product.price * item.quantity, 0);
  }

  emitCloseCart() {
    this.closeCart.emit();
  }
}
