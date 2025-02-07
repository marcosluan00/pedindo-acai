import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private isAdmin = false;

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (email === 'admin@admin.com' && password === 'admin') {
      this.isAuthenticated = true;
      this.isAdmin = true;
      this.router.navigate(['/order-summary']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }
}
