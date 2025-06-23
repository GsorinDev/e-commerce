import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./product-view.css']
})
export class ProductView implements OnInit {
  product: any = null;
  error: string | null = null;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'Aucun identifiant de produit trouvé.';
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/products/${id}`);

      if (!res.ok) {
        this.error = `Erreur lors du chargement : ${res.status}`;
        return;
      }

      this.product = await res.json();
    } catch (err) {
      this.error = 'Erreur réseau ou serveur';
      console.error(err);
    }
  }

  async addToCart(id:string) {
    try {
      await fetch(`http://localhost:4000/shopping/add/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({quantity: this.product.quantity})
      });
    } catch (err) {
      console.error('Erreur mise à jour quantité', err);
    }

  }
}
