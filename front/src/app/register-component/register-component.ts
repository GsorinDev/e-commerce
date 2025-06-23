import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-component.html',
  styleUrls: ['./register-component.css']
})
export class RegisterComponent {
  form = {
    username: '',
    email: '',
    password: ''
  };

  message: string | null = null;
  error: string | null = null;

  async register() {
    this.message = null;
    this.error = null;

    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.form)
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Erreur lors de l’inscription');
      }

      this.message = 'Inscription réussie !';
      this.form = { username: '', email: '', password: '' };
    } catch (err: any) {
      this.error = err.message || 'Une erreur est survenue.';
    }
  }
}
