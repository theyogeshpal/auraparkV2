import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export interface User {
  id: number; name: string; email: string;
  mobile: string; city: string; role: string; avatar: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://localhost:5000/api/auth';
  private readonly TOKEN_KEY = 'aurapark_token';
  private readonly USER_KEY = 'aurapark_user';

  currentUser = signal<User | null>(this.loadUser());
  isLoggedIn = signal<boolean>(!!this.loadToken());

  constructor(private http: HttpClient, private router: Router) {}

  register(data: { name: string; email: string; password: string; mobile?: string; city?: string }) {
    return this.http.post<any>(`${this.API}/register`, data).pipe(
      tap(res => { if (res.success) this.saveSession(res.data.token, res.data.user); })
    );
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.API}/login`, { email, password }).pipe(
      tap(res => { if (res.success) this.saveSession(res.data.token, res.data.user); })
    );
  }

  updateProfile(data: { name?: string; mobile?: string; city?: string }) {
    return this.http.put<any>(`${this.API}/profile`, data, { headers: this.authHeaders() }).pipe(
      tap(res => { if (res.success) { localStorage.setItem(this.USER_KEY, JSON.stringify(res.data)); this.currentUser.set(res.data); } })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getToken() { return localStorage.getItem(this.TOKEN_KEY); }

  authHeaders() { return { Authorization: `Bearer ${this.getToken()}` }; }

  private saveSession(token: string, user: User) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);
    this.isLoggedIn.set(true);
  }

  private loadToken() { return localStorage.getItem(this.TOKEN_KEY); }
  private loadUser(): User | null {
    const u = localStorage.getItem(this.USER_KEY);
    return u ? JSON.parse(u) : null;
  }
}
