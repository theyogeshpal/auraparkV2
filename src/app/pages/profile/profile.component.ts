import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  template: `
<div class="profile-page">

  <!-- Header -->
  <div class="profile-header">
    <div class="header-bg"></div>
    <div class="avatar-wrap">
      <div class="avatar">
        <i class="fa-solid fa-user"></i>
      </div>
      <div class="edit-btn"><i class="fa-solid fa-pen"></i></div>
    </div>
    <h4 class="mt-3 mb-0 fw-bold text-white">Yogesh Pal</h4>
    <p class="text-white-50 small mb-0">yogesh&#64;aurapark.in</p>
    <span class="member-badge mt-2">Premium Member</span>
  </div>

  <!-- Stats -->
  <div class="stats-row">
    <div class="stat-item">
      <span class="stat-num">12</span>
      <span class="stat-label">Bookings</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
      <span class="stat-num">3</span>
      <span class="stat-label">Listings</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
      <span class="stat-num">4.8</span>
      <span class="stat-label">Rating</span>
    </div>
  </div>

  <!-- Menu -->
  <div class="menu-section px-3">

    <p class="section-label">Account</p>
    <div class="menu-card">
      <a class="menu-item" routerLink="/find-parking">
        <div class="menu-icon" style="background:#eff6ff"><i class="fa-solid fa-car text-primary"></i></div>
        <span>My Bookings</span>
        <i class="fa-solid fa-chevron-right ms-auto text-muted"></i>
      </a>
      <a class="menu-item" routerLink="/add-parking">
        <div class="menu-icon" style="background:#f0fdf4"><i class="fa-solid fa-square-parking" style="color:#16a34a"></i></div>
        <span>My Listings</span>
        <i class="fa-solid fa-chevron-right ms-auto text-muted"></i>
      </a>
      <a class="menu-item" href="#">
        <div class="menu-icon" style="background:#fefce8"><i class="fa-solid fa-wallet" style="color:#ca8a04"></i></div>
        <span>Payments</span>
        <i class="fa-solid fa-chevron-right ms-auto text-muted"></i>
      </a>
    </div>

    <p class="section-label mt-4">Preferences</p>
    <div class="menu-card">
      <a class="menu-item" href="#">
        <div class="menu-icon" style="background:#fdf4ff"><i class="fa-solid fa-bell" style="color:#9333ea"></i></div>
        <span>Notifications</span>
        <i class="fa-solid fa-chevron-right ms-auto text-muted"></i>
      </a>
      <a class="menu-item" href="#">
        <div class="menu-icon" style="background:#fff1f2"><i class="fa-solid fa-shield-halved" style="color:#e11d48"></i></div>
        <span>Privacy & Security</span>
        <i class="fa-solid fa-chevron-right ms-auto text-muted"></i>
      </a>
    </div>

    <p class="section-label mt-4">Support</p>
    <div class="menu-card">
      <a class="menu-item" routerLink="/contact">
        <div class="menu-icon" style="background:#f0f9ff"><i class="fa-solid fa-headset" style="color:#0284c7"></i></div>
        <span>Help & Support</span>
        <i class="fa-solid fa-chevron-right ms-auto text-muted"></i>
      </a>
      <a class="menu-item" routerLink="/about">
        <div class="menu-icon" style="background:#f8fafc"><i class="fa-solid fa-circle-info text-secondary"></i></div>
        <span>About AuraPark</span>
        <i class="fa-solid fa-chevron-right ms-auto text-muted"></i>
      </a>
    </div>

    <button class="logout-btn mt-4 mb-5">
      <i class="fa-solid fa-right-from-bracket me-2"></i> Log Out
    </button>

  </div>
</div>
  `,
  styles: [`
    .profile-page { background: #f8f9fa; min-height: 100vh; padding-bottom: 90px; }

    .profile-header { position: relative; background: linear-gradient(135deg, #0f0f0f, #1e1e2e); text-align: center; padding: 100px 20px 30px; }
    .header-bg { position: absolute; inset: 0; background: radial-gradient(circle at 60% 30%, rgba(11,116,218,0.25), transparent 60%); }
    .avatar-wrap { position: relative; display: inline-block; }
    .avatar { width: 90px; height: 90px; border-radius: 50%; background: linear-gradient(135deg, #0b74da, #1e40af); display: flex; align-items: center; justify-content: center; border: 3px solid rgba(255,255,255,0.2); margin: 0 auto; }
    .avatar i { font-size: 2.5rem; color: white; }
    .edit-btn { position: absolute; bottom: 2px; right: 2px; width: 26px; height: 26px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
    .edit-btn i { font-size: 0.65rem; color: white; }
    .member-badge { display: inline-block; background: rgba(16,185,129,0.15); color: #10b981; border: 1px solid rgba(16,185,129,0.3); border-radius: 50px; font-size: 0.72rem; font-weight: 700; padding: 4px 14px; letter-spacing: 0.5px; }

    .stats-row { display: flex; background: white; margin: 0 16px; border-radius: 16px; padding: 18px 0; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transform: translateY(-20px); }
    .stat-item { flex: 1; text-align: center; display: flex; flex-direction: column; }
    .stat-num { font-size: 1.5rem; font-weight: 800; color: #111827; }
    .stat-label { font-size: 0.72rem; color: #9ca3af; font-weight: 600; margin-top: 2px; }
    .stat-divider { width: 1px; background: #f3f4f6; }

    .section-label { font-size: 0.72rem; font-weight: 700; color: #9ca3af; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; padding-left: 4px; }
    .menu-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
    .menu-item { display: flex; align-items: center; gap: 14px; padding: 15px 16px; text-decoration: none; color: #111827; font-size: 0.95rem; font-weight: 500; border-bottom: 1px solid #f9fafb; transition: background 0.15s; }
    .menu-item:last-child { border-bottom: none; }
    .menu-item:active { background: #f9fafb; }
    .menu-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .menu-icon i { font-size: 1rem; }

    .logout-btn { width: 100%; padding: 14px; border: none; border-radius: 14px; background: #fff1f2; color: #e11d48; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: background 0.2s; }
    .logout-btn:active { background: #ffe4e6; }
  `]
})
export class ProfileComponent {}
