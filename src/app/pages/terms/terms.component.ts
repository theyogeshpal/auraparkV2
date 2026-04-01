import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-terms',
  imports: [],
  template: `
<div class="terms-page">

  <!-- Header -->
  <div class="terms-header">
    <div class="header-inner">
      <button class="back-btn" (click)="goBack()">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <h5 class="mb-0 fw-bold text-white">Terms of Service</h5>
      <div style="width:36px"></div>
    </div>
  </div>

  <!-- Content -->
  <div class="terms-content">

    <!-- Hero -->
    <div class="terms-hero">
      <div class="terms-icon">
        <i class="fa-solid fa-file-contract"></i>
      </div>
      <div class="terms-hero-text">
        <h4 class="fw-bold mb-1">Terms of Service</h4>
        <p class="text-muted mb-0">Last updated: April 1, 2026 · AuraPark Solutions</p>
      </div>
    </div>

    <div class="intro-box">
      <p>By accessing or using AuraPark, you agree to be bound by these Terms of Service. Please read them carefully before using our platform. If you do not agree, you may not use our services.</p>
    </div>

    <!-- Cards Grid -->
    <div class="cards-grid">

      <div class="terms-card">
        <div class="terms-card-header">
          <div class="card-icon" style="background:#eff6ff"><i class="fa-solid fa-user-check" style="color:#0b74da"></i></div>
          <h6 class="mb-0 fw-bold">Eligibility</h6>
        </div>
        <p>You must be at least 18 years of age to use AuraPark. By using our services, you confirm that you meet this requirement and that all information you provide is accurate and complete.</p>
      </div>

      <div class="terms-card">
        <div class="terms-card-header">
          <div class="card-icon" style="background:#f0fdf4"><i class="fa-solid fa-circle-check" style="color:#16a34a"></i></div>
          <h6 class="mb-0 fw-bold">Acceptable Use</h6>
        </div>
        <p>You agree to use AuraPark only for lawful purposes. You must not misuse our platform by submitting false parking listings, manipulating availability data, or engaging in any fraudulent activity.</p>
      </div>

      <div class="terms-card">
        <div class="terms-card-header">
          <div class="card-icon" style="background:#fdf4ff"><i class="fa-solid fa-square-parking" style="color:#9333ea"></i></div>
          <h6 class="mb-0 fw-bold">Parking Listings</h6>
        </div>
        <p>Space owners are solely responsible for the accuracy of their listings, including availability, pricing, and access instructions. AuraPark acts as a discovery platform and is not liable for disputes between drivers and space owners.</p>
      </div>

      <div class="terms-card">
        <div class="terms-card-header">
          <div class="card-icon" style="background:#fff1f2"><i class="fa-solid fa-triangle-exclamation" style="color:#e11d48"></i></div>
          <h6 class="mb-0 fw-bold">Disclaimer of Liability</h6>
        </div>
        <p>AuraPark provides parking information on an "as-is" basis. We do not guarantee the accuracy of real-time availability data. We are not responsible for any damages, losses, or inconveniences arising from the use of our platform.</p>
      </div>

      <div class="terms-card">
        <div class="terms-card-header">
          <div class="card-icon" style="background:#fefce8"><i class="fa-solid fa-indian-rupee-sign" style="color:#ca8a04"></i></div>
          <h6 class="mb-0 fw-bold">Payments & Fees</h6>
        </div>
        <p>Parking fees are set by individual space owners and are paid directly at the lot. AuraPark does not process payments between drivers and owners unless explicitly stated. Any platform fees will be clearly disclosed before use.</p>
      </div>

      <div class="terms-card">
        <div class="terms-card-header">
          <div class="card-icon" style="background:#f0f9ff"><i class="fa-solid fa-lock" style="color:#0284c7"></i></div>
          <h6 class="mb-0 fw-bold">Account Security</h6>
        </div>
        <p>You are responsible for maintaining the confidentiality of your account credentials. Any activity that occurs under your account is your responsibility. Notify us immediately if you suspect unauthorized access.</p>
      </div>

      <div class="terms-card">
        <div class="terms-card-header">
          <div class="card-icon" style="background:#f0fdf4"><i class="fa-solid fa-copyright" style="color:#16a34a"></i></div>
          <h6 class="mb-0 fw-bold">Intellectual Property</h6>
        </div>
        <p>All content on AuraPark — including logos, designs, text, and software — is the property of AuraPark Solutions. You may not reproduce, distribute, or create derivative works without our explicit written permission.</p>
      </div>

      <div class="terms-card">
        <div class="terms-card-header">
          <div class="card-icon" style="background:#fdf4ff"><i class="fa-solid fa-ban" style="color:#9333ea"></i></div>
          <h6 class="mb-0 fw-bold">Termination</h6>
        </div>
        <p>We reserve the right to suspend or terminate your account at any time if you violate these terms. You may also delete your account at any time by contacting our support team.</p>
      </div>

      <div class="terms-card">
        <div class="terms-card-header">
          <div class="card-icon" style="background:#fff1f2"><i class="fa-solid fa-gavel" style="color:#e11d48"></i></div>
          <h6 class="mb-0 fw-bold">Governing Law</h6>
        </div>
        <p>These Terms are governed by the laws of India. Any disputes arising from the use of AuraPark shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.</p>
      </div>

      <div class="terms-card">
        <div class="terms-card-header">
          <div class="card-icon" style="background:#fffbeb"><i class="fa-solid fa-rotate" style="color:#f59e0b"></i></div>
          <h6 class="mb-0 fw-bold">Changes to Terms</h6>
        </div>
        <p>We may update these Terms from time to time. We will notify you of significant changes via email or in-app notification. Continued use of AuraPark after changes constitutes your acceptance of the new terms.</p>
      </div>

      <div class="contact-box">
        <i class="fa-solid fa-envelope-open-text" style="font-size:1.6rem;color:#0b74da"></i>
        <div>
          <p class="mb-1 fw-bold">Questions about our Terms?</p>
          <p class="text-muted small mb-0">Reach us at <span style="color:#0b74da">legal&#64;aurapark.in</span></p>
        </div>
      </div>

    </div>
  </div>
</div>
  `,
  styles: [`
    .terms-page { background: #f1f5f9; min-height: 100vh; padding-bottom: 40px; }

    .terms-header { background: #0f0f0f; border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top: 0; z-index: 100; }
    .header-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; max-width: 1100px; margin: 0 auto; }
    .back-btn { width: 36px; height: 36px; border: none; background: rgba(255,255,255,0.08); border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
    .back-btn:hover { background: rgba(255,255,255,0.15); }

    .terms-content { max-width: 1100px; margin: 0 auto; padding: 36px 20px; }

    .terms-hero { display: flex; align-items: center; gap: 20px; background: white; border-radius: 20px; padding: 28px; margin-bottom: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
    .terms-icon { width: 70px; height: 70px; border-radius: 18px; background: linear-gradient(135deg, #0b74da, #1e40af); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .terms-icon i { font-size: 2rem; color: white; }

    .intro-box { background: #fffbeb; border: 1px solid #fde68a; border-radius: 14px; padding: 16px 20px; margin-bottom: 24px; font-size: 0.9rem; color: #92400e; line-height: 1.7; }
    .intro-box p { margin: 0; }

    .cards-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }

    .terms-card { background: white; border-radius: 16px; padding: 20px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
    .terms-card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .card-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .card-icon i { font-size: 1rem; }
    .terms-card p { font-size: 0.9rem; color: #64748b; line-height: 1.7; margin: 0; }

    .contact-box { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); border: 1px solid #e0f2fe; display: flex; align-items: center; gap: 18px; }

    @media (min-width: 768px) {
      .header-inner { padding: 18px 40px; }
      .terms-content { padding: 48px 40px; }
      .cards-grid { grid-template-columns: 1fr 1fr; }
      .contact-box { grid-column: span 2; }
      .terms-hero { padding: 32px 36px; gap: 28px; }
      .terms-icon { width: 80px; height: 80px; }
      .terms-icon i { font-size: 2.4rem; }
    }
  `]
})
export class TermsComponent {
  constructor(private location: Location) {}
  goBack() { this.location.back(); }
}
