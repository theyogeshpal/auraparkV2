import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
<div class="auth-wrapper" style="margin-top: 65px;">
  <div class="auth-card">
    <div class="text-center mb-4">
      <img src="/Assets/images/AuraPark-logo (2).png" style="height:70px" alt="AuraPark">
      <h4 class="fw-bold mt-3 text-dark">Welcome Back</h4>
      <p class="text-muted small">Login to your AuraPark account</p>
    </div>

    <div *ngIf="error()" class="alert alert-danger py-2 small border-0 rounded-3">
      <i class="fa-solid fa-circle-exclamation me-2"></i>{{error()}}
    </div>

    <form (ngSubmit)="login()">
      <div class="mb-3">
        <label class="form-label-custom">Email Address</label>
        <div class="input-group-custom">
          <i class="fa-solid fa-envelope"></i>
          <input type="email" [(ngModel)]="form.email" name="email" placeholder="you@example.com" required>
        </div>
      </div>
      <div class="mb-4">
        <label class="form-label-custom">Password</label>
        <div class="input-group-custom">
          <i class="fa-solid fa-lock"></i>
          <input [type]="showPass ? 'text' : 'password'" [(ngModel)]="form.password" name="password" placeholder="••••••••" required>
          <i class="fa-solid toggle-eye" [class.fa-eye]="!showPass" [class.fa-eye-slash]="showPass" (click)="showPass=!showPass"></i>
        </div>
      </div>
      <button type="submit" class="auth-btn w-100" [disabled]="loading()">
        <span *ngIf="!loading()"><i class="fa-solid fa-right-to-bracket me-2"></i>Login</span>
        <span *ngIf="loading()"><i class="fa-solid fa-spinner fa-spin me-2"></i>Logging in...</span>
      </button>
    </form>

    <p class="text-center mt-4 small text-muted">
      Don't have an account? <a routerLink="/register" class="text-danger fw-bold text-decoration-none">Register here</a>
    </p>
  </div>
</div>
  `,
  styles: [`
    .auth-wrapper { min-height:100vh; background:linear-gradient(135deg,#0f172a,#1e293b); display:flex; align-items:center; justify-content:center; padding:20px; }
    .auth-card { background:white; border-radius:24px; padding:40px; width:100%; max-width:420px; box-shadow:0 25px 60px rgba(0,0,0,0.3); }
    .form-label-custom { font-size:0.82rem; font-weight:700; color:#374151; display:block; margin-bottom:6px; }
    .input-group-custom { display:flex; align-items:center; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:0 14px; gap:10px; transition:border-color 0.2s; }
    .input-group-custom:focus-within { border-color:#AB1111; background:white; }
    .input-group-custom i { color:#94a3b8; font-size:0.9rem; flex-shrink:0; }
    .input-group-custom input { flex:1; border:none; background:transparent; padding:13px 0; font-size:0.95rem; color:#1e293b; outline:none; }
    .toggle-eye { cursor:pointer !important; }
    .auth-btn { background:#AB1111; color:white; border:none; border-radius:12px; padding:14px; font-weight:700; font-size:1rem; transition:all 0.3s; cursor:pointer; }
    .auth-btn:hover:not(:disabled) { background:#8f0d0d; transform:translateY(-2px); box-shadow:0 8px 20px rgba(171,17,17,0.3); }
    .auth-btn:disabled { opacity:0.7; cursor:not-allowed; }
  `]
})
export class LoginComponent {
  form = { email: '', password: '' };
  showPass = false;
  loading = signal(false);
  error = signal('');

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  login() {
    this.error.set('');
    this.loading.set(true);
    this.authService.login(this.form.email, this.form.password).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Login failed. Please try again.');
        this.loading.set(false);
      }
    });
  }
}
