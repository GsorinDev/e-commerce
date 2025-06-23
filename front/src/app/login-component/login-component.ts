import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent {
  form = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {
  }

  message: string | null = null;
  error: string | null = null;

  async login() {
    this.message = null;
    this.error = null;

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.form)
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Erreur de connexion');
      }

      this.message = 'Connexion réussie !';
      this.form = { username: '', password: '' };

      const data = await response.json();
      localStorage.setItem('token', data.token);

      this.router.navigate(['/home']);

    } catch (err: any) {
      this.error = err.message || 'Une erreur est survenue.';
    }
  }
}
