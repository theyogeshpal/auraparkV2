import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  template: `
<style>
  .contact-page { background: #f8fafc; padding-top: 130px; padding-bottom: 80px; min-height: 100vh; }
  .contact-card { background: white; border-radius: 24px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
  .form-control-custom { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 20px; font-size: 0.95rem; color: #1e293b; transition: all 0.3s; }
  .form-control-custom:focus { outline: none; border-color: #AB1111; box-shadow: 0 0 0 4px rgba(171,17,17,0.1); background: white; }
  textarea.form-control-custom { min-height: 140px; resize: none; }
  .submit-btn { background: #AB1111; color: white; border: none; border-radius: 12px; padding: 16px 30px; font-weight: 700; width: 100%; transition: all 0.3s; }
  .submit-btn:hover:not(:disabled) { background: #8f0d0d; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(171,17,17,0.2); }
  .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
  .contact-info-icon { width: 50px; height: 50px; background: #fef2f2; color: #AB1111; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; min-width: 50px; }
  .info-block { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 25px; }
  .info-block h6 { font-weight: 700; color: #1e293b; margin-bottom: 5px; }
  .info-block p { color: #64748b; font-size: 0.95rem; margin: 0; }
  .contact-badge { background-color: #fef2f2; color: #AB1111; font-weight: 700; font-size: 0.85rem; letter-spacing: 1px; padding: 8px 20px; border-radius: 50px; display: inline-block; }
</style>

<div class="contact-page">
  <div class="container">
    <div class="row g-5 align-items-center">
      <div class="col-lg-5 pe-lg-5">
        <div class="contact-badge mb-4">CONTACT US</div>
        <h1 class="display-5 fw-bold mb-4" style="color:#0f172a;letter-spacing:-1px">Let's Start a <span style="color:#AB1111">Conversation.</span></h1>
        <p class="lead text-muted mb-5">Have a question? Our team is ready to help you.</p>
        <div class="info-block">
          <div class="contact-info-icon"><i class="fa-solid fa-location-dot"></i></div>
          <div><h6>Office Address</h6><p>123 AuraPark Tech Hub, Sector 62<br>Noida, UP 201301</p></div>
        </div>
        <div class="info-block">
          <div class="contact-info-icon"><i class="fa-solid fa-envelope"></i></div>
          <div><h6>Email Us</h6><p>support&#64;aurapark.com</p></div>
        </div>
        <div class="info-block">
          <div class="contact-info-icon"><i class="fa-solid fa-phone"></i></div>
          <div><h6>Call Us</h6><p>+91 98765 43210</p></div>
        </div>
      </div>

      <div class="col-lg-7">
        <div class="contact-card">
          <h3 class="fw-bold mb-1" style="color:#1e293b">Send a Message</h3>
          <p class="text-muted mb-4">We usually respond within 24 hours.</p>

          <div *ngIf="success()" class="alert alert-success d-flex align-items-center mb-4 border-0 bg-success bg-opacity-10 text-success fw-bold rounded-4 p-3">
            <i class="fa-solid fa-circle-check me-2 fs-5"></i> {{success()}}
          </div>
          <div *ngIf="error()" class="alert alert-danger border-0 rounded-4 p-3 mb-4 small">
            <i class="fa-solid fa-circle-exclamation me-2"></i>{{error()}}
          </div>

          <form (ngSubmit)="send()">
            <div class="row g-3">
              <div class="col-md-6">
                <input type="text" [(ngModel)]="form.name" name="name" class="form-control-custom w-100" placeholder="Your Name" required>
              </div>
              <div class="col-md-6">
                <input type="email" [(ngModel)]="form.email" name="email" class="form-control-custom w-100" placeholder="Email Address" required>
              </div>
              <div class="col-12">
                <input type="tel" [(ngModel)]="form.mobile" name="mobile" class="form-control-custom w-100" placeholder="Phone Number">
              </div>
              <div class="col-12">
                <textarea [(ngModel)]="form.message" name="message" class="form-control-custom w-100" placeholder="How can we help you?" required></textarea>
              </div>
              <div class="col-12 mt-4">
                <button type="submit" class="submit-btn" [disabled]="loading()">
                  <span *ngIf="!loading()"><i class="fa-solid fa-paper-plane me-2"></i>Send Message</span>
                  <span *ngIf="loading()"><i class="fa-solid fa-spinner fa-spin me-2"></i>Sending...</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: []
})
export class ContactComponent {
  form = { name: '', email: '', mobile: '', message: '' };
  loading = signal(false);
  success = signal('');
  error = signal('');

  constructor(private api: ApiService) {}

  send() {
    this.success.set(''); this.error.set('');
    this.loading.set(true);
    this.api.submitContact(this.form).subscribe({
      next: (res) => {
        this.form = { name: '', email: '', mobile: '', message: '' };
        this.loading.set(false);
        (window as any).Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: res.message || 'Message sent!', showConfirmButton: false, timer: 3000 });
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Failed to send message.');
        this.loading.set(false);
      }
    });
  }
}
