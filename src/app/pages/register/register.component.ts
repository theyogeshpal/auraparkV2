import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
<div class="auth-wrapper">
  <div class="auth-card">
    <div class="text-center mb-4">
      <img src="/Assets/images/AuraPark-logo (2).png" style="height:70px" alt="AuraPark">
      <h4 class="fw-bold mt-3 text-dark">Create Account</h4>
      <p class="text-muted small">Join AuraPark and find parking easily</p>
    </div>

    <div *ngIf="error()" class="alert alert-danger py-2 small border-0 rounded-3">
      <i class="fa-solid fa-circle-exclamation me-2"></i>{{error()}}
    </div>
    <div *ngIf="success()" class="alert alert-success py-2 small border-0 rounded-3">
      <i class="fa-solid fa-circle-check me-2"></i>{{success()}}
    </div>

    <form (ngSubmit)="register()">
      <div class="mb-3">
        <label class="form-label-custom">Full Name <span class="text-danger">*</span></label>
        <div class="input-group-custom">
          <i class="fa-solid fa-user"></i>
          <input type="text" [(ngModel)]="form.name" name="name" placeholder="John Doe" required>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label-custom">Email Address <span class="text-danger">*</span></label>
        <div class="input-group-custom">
          <i class="fa-solid fa-envelope"></i>
          <input type="email" [(ngModel)]="form.email" name="email" placeholder="you@example.com" required>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label-custom">Mobile Number</label>
        <div class="input-group-custom">
          <i class="fa-solid fa-phone"></i>
          <input type="tel" [(ngModel)]="form.mobile" name="mobile" placeholder="9876543210">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label-custom">City</label>
        <div class="input-group-custom">
          <i class="fa-solid fa-location-dot"></i>
          <input type="text" [(ngModel)]="form.city" name="city" placeholder="Delhi">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label-custom">Password <span class="text-danger">*</span></label>
        <div class="input-group-custom">
          <i class="fa-solid fa-lock"></i>
          <input [type]="showPass ? 'text' : 'password'" [(ngModel)]="form.password" name="password" placeholder="Min 6 characters" required>
          <i class="fa-solid toggle-eye" [class.fa-eye]="!showPass" [class.fa-eye-slash]="showPass" (click)="showPass=!showPass"></i>
        </div>
      </div>
      <div class="mb-4">
        <label class="form-label-custom">Confirm Password <span class="text-danger">*</span></label>
        <div class="input-group-custom">
          <i class="fa-solid fa-lock"></i>
          <input [type]="showPass ? 'text' : 'password'" [(ngModel)]="form.confirmPassword" name="confirmPassword" placeholder="Repeat password" required>
        </div>
      </div>
      <button type="submit" class="auth-btn w-100" [disabled]="loading()">
        <span *ngIf="!loading()"><i class="fa-solid fa-user-plus me-2"></i>Create Account</span>
        <span *ngIf="loading()"><i class="fa-solid fa-spinner fa-spin me-2"></i>Creating...</span>
      </button>
    </form>

    <p class="text-center mt-4 small text-muted">
      Already have an account? <a routerLink="/login" class="text-danger fw-bold text-decoration-none">Login here</a>
    </p>
  </div>
</div>
  `,
  styles: [`
    .auth-wrapper { min-height:100vh; background:linear-gradient(135deg,#0f172a,#1e293b); display:flex; align-items:center; justify-content:center; padding:20px; }
    .auth-card { background:white; border-radius:24px; padding:40px; width:100%; max-width:440px; box-shadow:0 25px 60px rgba(0,0,0,0.3); }
    .form-label-custom { font-size:0.82rem; font-weight:700; color:#374151; display:block; margin-bottom:6px; }
    .input-group-custom { display:flex; align-items:center; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:0 14px; gap:10px; transition:border-color 0.2s; }
    .input-group-custom:focus-within { border-color:#AB1111; background:white; }
    .input-group-custom i { color:#94a3b8; font-size:0.9rem; flex-shrink:0; }
    .input-group-custom input { flex:1; border:none; background:transparent; padding:12px 0; font-size:0.95rem; color:#1e293b; outline:none; }
    .toggle-eye { cursor:pointer !important; }
    .auth-btn { background:#AB1111; color:white; border:none; border-radius:12px; padding:14px; font-weight:700; font-size:1rem; transition:all 0.3s; cursor:pointer; }
    .auth-btn:hover:not(:disabled) { background:#8f0d0d; transform:translateY(-2px); box-shadow:0 8px 20px rgba(171,17,17,0.3); }
    .auth-btn:disabled { opacity:0.7; cursor:not-allowed; }
  `]
})
export class RegisterComponent {
  form = { name: '', email: '', mobile: '', city: '', password: '', confirmPassword: '' };
  showPass = false;
  loading = signal(false);
  error = signal('');
  success = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.error.set('');
    if (this.form.password !== this.form.confirmPassword) { this.error.set('Passwords do not match'); return; }
    if (this.form.password.length < 6) { this.error.set('Password must be at least 6 characters'); return; }
    this.loading.set(true);
    this.authService.register({ name: this.form.name, email: this.form.email, password: this.form.password, mobile: this.form.mobile, city: this.form.city }).subscribe({
      next: () => { this.success.set('Account created! Redirecting...'); setTimeout(() => this.router.navigate(['/profile']), 1500); },
      error: (err) => { this.error.set(err.error?.message || 'Registration failed.'); this.loading.set(false); }
    });
  }
}
