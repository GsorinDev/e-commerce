import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
  @Input() data: any;

  constructor(private router: Router) {
  }

  async openProduct(id: string)
  {
    console.log('ID du produit cliqué :', id)

    if (!id) {
      console.error('ID manquant ou invalide');
      return;
    }

    await this.router.navigate(['/produit', id]);
  }
}
