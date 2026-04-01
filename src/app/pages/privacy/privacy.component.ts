import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacy',
  imports: [],
  template: `
<div class="privacy-page pt-5">

  <!-- Header -->
  <div class="privacy-header">
    <div class="header-inner">
      <button class="back-btn" (click)="goBack()">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <h5 class="mb-0 fw-bold text-white">Privacy & Security</h5>
      <div style="width:36px"></div>
    </div>
  </div>

  <!-- Content -->
  <div class="privacy-content">

    <!-- Hero -->
    <div class="policy-hero">
      <div class="policy-icon">
        <i class="fa-solid fa-shield-halved"></i>
      </div>
      <div class="policy-hero-text">
        <h4 class="fw-bold mb-1">Your Privacy Matters</h4>
        <p class="text-muted mb-0">Last updated: April 1, 2026 · AuraPark Solutions</p>
      </div>
    </div>

    <!-- Cards Grid -->
    <div class="cards-grid">

      <div class="policy-card">
        <div class="policy-card-header">
          <div class="card-icon" style="background:#eff6ff"><i class="fa-solid fa-database" style="color:#0b74da"></i></div>
          <h6 class="mb-0 fw-bold">Data We Collect</h6>
        </div>
        <p>We collect information you provide directly — such as your name, email address, and vehicle details — when you register or use AuraPark services. We also collect usage data like search queries and parking history to improve your experience.</p>
      </div>

      <div class="policy-card">
        <div class="policy-card-header">
          <div class="card-icon" style="background:#fdf4ff"><i class="fa-solid fa-gears" style="color:#9333ea"></i></div>
          <h6 class="mb-0 fw-bold">How We Use Your Data</h6>
        </div>
        <p>Your data is used to provide and personalize our parking discovery services, process transactions, send important notifications, and improve our platform. We do not sell your personal information to third parties.</p>
      </div>

      <div class="policy-card">
        <div class="policy-card-header">
          <div class="card-icon" style="background:#fff1f2"><i class="fa-solid fa-location-dot" style="color:#e11d48"></i></div>
          <h6 class="mb-0 fw-bold">Location Data</h6>
        </div>
        <p>AuraPark uses your location only to show nearby parking spots. Location access is requested only when you use the Find Parking feature and is never stored or shared without your consent.</p>
      </div>

      <div class="policy-card">
        <div class="policy-card-header">
          <div class="card-icon" style="background:#fefce8"><i class="fa-solid fa-share-nodes" style="color:#ca8a04"></i></div>
          <h6 class="mb-0 fw-bold">Data Sharing</h6>
        </div>
        <p>We may share anonymized, aggregated data with parking operators to improve availability accuracy. Any third-party integrations (e.g. payment gateways) are bound by strict data protection agreements.</p>
      </div>

      <div class="policy-card">
        <div class="policy-card-header">
          <div class="card-icon" style="background:#f0fdf4"><i class="fa-solid fa-lock" style="color:#16a34a"></i></div>
          <h6 class="mb-0 fw-bold">Data Security</h6>
        </div>
        <p>We use industry-standard encryption (TLS/SSL) to protect your data in transit. Your account is secured with hashed passwords and optional two-factor authentication. We regularly audit our systems for vulnerabilities.</p>
      </div>

      <div class="policy-card">
        <div class="policy-card-header">
          <div class="card-icon" style="background:#f0f9ff"><i class="fa-solid fa-user-shield" style="color:#0284c7"></i></div>
          <h6 class="mb-0 fw-bold">Your Rights</h6>
        </div>
        <p>You have the right to access, correct, or delete your personal data at any time. You may also request a copy of your data or withdraw consent for specific processing activities by contacting our support team.</p>
      </div>

      <div class="policy-card">
        <div class="policy-card-header">
          <div class="card-icon" style="background:#fffbeb"><i class="fa-solid fa-cookie-bite" style="color:#f59e0b"></i></div>
          <h6 class="mb-0 fw-bold">Cookies</h6>
        </div>
        <p>We use essential cookies to keep you logged in and remember your preferences. Analytics cookies (opt-in) help us understand how users interact with AuraPark so we can improve the experience.</p>
      </div>

      <div class="contact-box">
        <i class="fa-solid fa-envelope-open-text" style="font-size:1.6rem;color:#0b74da"></i>
        <div>
          <p class="mb-1 fw-bold">Questions about your privacy?</p>
          <p class="text-muted small mb-0">Reach us at <span style="color:#0b74da">privacy&#64;aurapark.in</span></p>
        </div>
      </div>

    </div>
  </div>
</div>
  `,
  styles: [`
    .privacy-page { background: #f1f5f9; min-height: 100vh; padding-bottom: 40px; }

    .privacy-header { background: #0f0f0f; border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top: 0; z-index: 100; }
    .header-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; max-width: 1100px; margin: 0 auto; }
    .back-btn { width: 36px; height: 36px; border: none; background: rgba(255,255,255,0.08); border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
    .back-btn:hover { background: rgba(255,255,255,0.15); }

    .privacy-content { max-width: 1100px; margin: 0 auto; padding: 36px 20px; }

    .policy-hero { display: flex; align-items: center; gap: 20px; background: white; border-radius: 20px; padding: 28px; margin-bottom: 28px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
    .policy-icon { width: 70px; height: 70px; border-radius: 18px; background: linear-gradient(135deg, #e11d48, #9333ea); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .policy-icon i { font-size: 2rem; color: white; }

    .cards-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }

    .policy-card { background: white; border-radius: 16px; padding: 20px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
    .policy-card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .card-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .card-icon i { font-size: 1rem; }
    .policy-card p { font-size: 0.9rem; color: #64748b; line-height: 1.7; margin: 0; }

    .contact-box { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); border: 1px solid #e0f2fe; display: flex; align-items: center; gap: 18px; }

    @media (min-width: 768px) {
      .header-inner { padding: 18px 40px; }
      .privacy-content { padding: 48px 40px; }
      .cards-grid { grid-template-columns: 1fr 1fr; }
      .contact-box { grid-column: span 2; }
      .policy-hero { padding: 32px 36px; gap: 28px; }
      .policy-icon { width: 80px; height: 80px; }
      .policy-icon i { font-size: 2.4rem; }
    }
  `]
})
export class PrivacyComponent {
  constructor(private location: Location) {}
  goBack() { this.location.back(); }
}
