import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, FormsModule, CommonModule],
  template: `
<div class="profile-page">
  <div class="profile-header">
    <div class="header-bg"></div>
    <div class="header-inner">
      <div class="avatar-wrap">
        <div class="avatar">
          <img *ngIf="auth.currentUser()?.avatar" [src]="auth.currentUser()!.avatar!" class="avatar-img" alt="Profile">
          <span *ngIf="!auth.currentUser()?.avatar" class="avatar-initial">{{auth.currentUser()?.name?.charAt(0)?.toUpperCase()}}</span>
        </div>
      </div>
      <div class="header-info">
        <h3 class="mb-0 fw-bold text-white">{{auth.currentUser()?.name}}</h3>
        <p class="text-white-50 mb-1">{{auth.currentUser()?.email}}</p>
        <span class="member-badge">Premium Member</span>
      </div>
      <div class="stats-inline">
        <div class="stat-item"><span class="stat-num">{{bookingCount()}}</span><span class="stat-label">Bookings</span></div>
        <div class="stat-divider"></div>
        <div class="stat-item"><span class="stat-num">4.8</span><span class="stat-label">Rating</span></div>
      </div>
    </div>
  </div>

  <div class="stats-row d-md-none">
    <div class="stat-item"><span class="stat-num">{{bookingCount()}}</span><span class="stat-label">Bookings</span></div>
    <div class="stat-divider"></div>
    <div class="stat-item"><span class="stat-num">4.8</span><span class="stat-label">Rating</span></div>
  </div>

  <div class="content-wrap">
    <div class="sidebar">
      <button class="edit-profile-btn-mobile d-md-none mb-4" (click)="openModal()"><i class="fa-solid fa-pen me-2"></i>Edit Profile</button>

      <p class="section-label">Account</p>
      <div class="menu-card">
        <a class="menu-item" routerLink="/bookings">
          <div class="menu-icon" style="background:#eff6ff"><i class="fa-solid fa-car text-primary"></i></div>
          <span>My Bookings</span>
          <i class="fa-solid fa-chevron-right ms-auto text-muted"></i>
        </a>
      </div>

      <p class="section-label mt-4">Preferences</p>
      <div class="menu-card">
        <a class="menu-item" routerLink="/notifications">
          <div class="menu-icon" style="background:#fdf4ff"><i class="fa-solid fa-bell" style="color:#9333ea"></i></div>
          <span>Notifications</span>
          <i class="fa-solid fa-chevron-right ms-auto text-muted"></i>
        </a>
        <a class="menu-item" routerLink="/privacy">
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

      <button class="logout-btn mt-4" (click)="auth.logout()"><i class="fa-solid fa-right-from-bracket me-2"></i>Log Out</button>
    </div>

    <div class="main-panel d-none d-md-block">
      <div class="panel-card mb-4">
        <h6 class="panel-title"><i class="fa-solid fa-user-pen me-2" style="color:#0b74da"></i>Personal Information</h6>
        <div class="info-grid">
          <div class="info-field"><label>Full Name</label><div class="info-value">{{auth.currentUser()?.name}}</div></div>
          <div class="info-field"><label>Email Address</label><div class="info-value">{{auth.currentUser()?.email}}</div></div>
          <div class="info-field"><label>Phone Number</label><div class="info-value">{{auth.currentUser()?.mobile || '—'}}</div></div>
          <div class="info-field"><label>City</label><div class="info-value">{{auth.currentUser()?.city || '—'}}</div></div>
        </div>
        <button class="edit-profile-btn mt-3" (click)="openModal()"><i class="fa-solid fa-pen me-2"></i>Edit Profile</button>
      </div>

      <div class="panel-card">
        <h6 class="panel-title"><i class="fa-solid fa-clock-rotate-left me-2" style="color:#9333ea"></i>Recent Bookings</h6>
        <div *ngIf="recentBookings().length === 0" class="text-muted small py-3 text-center">No bookings yet.</div>
        <div class="activity-list">
          <div class="activity-item" *ngFor="let b of recentBookings()">
            <div class="activity-dot" style="background:#0b74da"></div>
            <div>
              <p class="mb-0 fw-semibold">{{b.parkingName}}</p>
              <small class="text-muted">{{b.date}} · {{b.duration}} hrs · ₹{{b.totalPrice}} · <span [class.text-success]="b.status==='completed'" [class.text-warning]="b.status==='ongoing'" [class.text-danger]="b.status==='cancelled'">{{b.status}}</span></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Edit Profile Modal -->
<div class="ep-modal" [class.open]="modalOpen()">
  <div class="ep-modal-backdrop" (click)="closeModal()"></div>
  <div class="ep-modal-box">
    <div class="ep-modal-header">
      <h6 class="mb-0 fw-bold">Edit Profile</h6>
      <button class="ep-close" (click)="closeModal()"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="ep-modal-body">
      <div *ngIf="saveMsg()" class="alert alert-success py-2 small border-0 rounded-3 mb-3">
        <i class="fa-solid fa-circle-check me-2"></i>{{saveMsg()}}
      </div>
      <div class="ep-field"><label>Full Name</label><input type="text" [(ngModel)]="form.name" placeholder="Enter full name"></div>
      <div class="ep-field"><label>Phone Number</label><input type="tel" [(ngModel)]="form.mobile" placeholder="Enter phone number"></div>
      <div class="ep-field"><label>City</label><input type="text" [(ngModel)]="form.city" placeholder="Enter city"></div>
    </div>
    <div class="ep-modal-footer">
      <button class="ep-cancel" (click)="closeModal()">Cancel</button>
      <button class="ep-save" (click)="saveProfile()" [disabled]="saving()">
        <span *ngIf="!saving()"><i class="fa-solid fa-check me-2"></i>Save Changes</span>
        <span *ngIf="saving()"><i class="fa-solid fa-spinner fa-spin me-2"></i>Saving...</span>
      </button>
    </div>
  </div>
</div>
  `,
  styles: [`
    .profile-page { background: #f1f5f9; min-height: 100vh; padding-bottom: 90px; }
    .profile-header { position: relative; background: linear-gradient(135deg, #0f0f0f, #1e1e2e); padding: 130px 20px 30px; }
    .header-bg { position: absolute; inset: 0; background: radial-gradient(circle at 60% 30%, rgba(11,116,218,0.25), transparent 60%); }
    .header-inner { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; }
    .avatar-wrap { position: relative; display: inline-block; }
    .avatar { width: 90px; height: 90px; border-radius: 50%; background: linear-gradient(135deg, #0b74da, #1e40af); display: flex; align-items: center; justify-content: center; border: 3px solid rgba(255,255,255,0.2); margin: 0 auto; }
    .avatar-img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
    .avatar-initial { font-size: 2.5rem; font-weight: 700; color: white; }
    .header-info { margin-top: 12px; }
    .member-badge { display: inline-block; background: rgba(16,185,129,0.15); color: #10b981; border: 1px solid rgba(16,185,129,0.3); border-radius: 50px; font-size: 0.72rem; font-weight: 700; padding: 4px 14px; }
    .stats-inline { display: none; }
    .stats-row { display: flex; background: white; margin: 0 16px; border-radius: 16px; padding: 18px 0; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transform: translateY(-20px); }
    .stat-item { flex: 1; text-align: center; display: flex; flex-direction: column; }
    .stat-num { font-size: 1.5rem; font-weight: 800; color: #111827; }
    .stat-label { font-size: 0.72rem; color: #9ca3af; font-weight: 600; margin-top: 2px; }
    .stat-divider { width: 1px; background: #f3f4f6; }
    .content-wrap { padding: 0 16px 20px; }
    .section-label { font-size: 0.72rem; font-weight: 700; color: #9ca3af; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; padding-left: 4px; }
    .menu-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
    .menu-item { display: flex; align-items: center; gap: 14px; padding: 15px 16px; text-decoration: none; color: #111827; font-size: 0.95rem; font-weight: 500; border-bottom: 1px solid #f9fafb; transition: background 0.15s; }
    .menu-item:last-child { border-bottom: none; }
    .menu-item:hover { background: #f8fafc; }
    .menu-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .logout-btn { width: 100%; padding: 14px; border: none; border-radius: 14px; background: #fff1f2; color: #e11d48; font-weight: 700; font-size: 0.95rem; cursor: pointer; }
    .logout-btn:hover { background: #ffe4e6; }
    .edit-profile-btn-mobile { width: 100%; padding: 12px; border: none; border-radius: 14px; background: #0b74da; color: white; font-weight: 700; font-size: 0.9rem; cursor: pointer; }
    .panel-card { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
    .panel-title { font-size: 1rem; font-weight: 700; color: #1e293b; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .info-field label { font-size: 0.72rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
    .info-value { font-size: 0.95rem; font-weight: 500; color: #1e293b; background: #f8fafc; border-radius: 10px; padding: 10px 14px; }
    .edit-profile-btn { background: #0b74da; color: white; border: none; border-radius: 10px; padding: 10px 22px; font-weight: 600; font-size: 0.9rem; cursor: pointer; }
    .activity-list { display: flex; flex-direction: column; gap: 16px; }
    .activity-item { display: flex; align-items: flex-start; gap: 14px; }
    .activity-dot { width: 10px; height: 10px; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
    .ep-modal { display: none; position: fixed; inset: 0; z-index: 2000; align-items: center; justify-content: center; }
    .ep-modal.open { display: flex; }
    .ep-modal-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); }
    .ep-modal-box { position: relative; background: white; border-radius: 20px; width: 100%; max-width: 480px; margin: 16px; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
    .ep-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid #f1f5f9; }
    .ep-close { width: 32px; height: 32px; border: none; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b; }
    .ep-modal-body { padding: 24px; overflow-y: auto; flex: 1; }
    .ep-field { margin-bottom: 16px; }
    .ep-field label { display: block; font-size: 0.75rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
    .ep-field input { width: 100%; padding: 12px 14px; border: 1.5px solid #e2e8f0; border-radius: 12px; font-size: 0.95rem; color: #1e293b; outline: none; transition: border-color 0.2s; }
    .ep-field input:focus { border-color: #0b74da; }
    .ep-modal-footer { display: flex; gap: 12px; padding: 16px 24px; border-top: 1px solid #f1f5f9; }
    .ep-cancel { flex: 1; padding: 12px; border: 1.5px solid #e2e8f0; border-radius: 12px; background: white; color: #64748b; font-weight: 600; cursor: pointer; }
    .ep-save { flex: 2; padding: 12px; border: none; border-radius: 12px; background: #0b74da; color: white; font-weight: 700; cursor: pointer; }
    .ep-save:disabled { opacity: 0.7; cursor: not-allowed; }
    @media (min-width: 768px) {
      .profile-header { padding: 140px 60px 40px; }
      .header-inner { flex-direction: row; text-align: left; gap: 28px; max-width: 1100px; margin: 0 auto; }
      .avatar { width: 110px; height: 110px; }
      .avatar-initial { font-size: 3rem; }
      .header-info { flex: 1; }
      .stats-inline { display: flex; background: rgba(255,255,255,0.08); border-radius: 16px; padding: 16px 24px; gap: 24px; align-items: center; }
      .stats-inline .stat-item { min-width: 70px; }
      .stats-inline .stat-num { color: white; }
      .stats-inline .stat-label { color: rgba(255,255,255,0.5); }
      .stats-inline .stat-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.15); }
      .content-wrap { display: grid; grid-template-columns: 300px 1fr; gap: 24px; max-width: 1100px; margin: 32px auto; padding: 0 40px 40px; }
      .sidebar { position: sticky; top: 80px; align-self: start; }
      .profile-page { padding-bottom: 40px; }
    }
  `]
})
export class ProfileComponent implements OnInit {
  modalOpen = signal(false);
  saving = signal(false);
  saveMsg = signal('');
  bookingCount = signal(0);
  recentBookings = signal<any[]>([]);
  form = { name: '', mobile: '', city: '' };

  constructor(public auth: AuthService, private api: ApiService) {}

  ngOnInit() {
    const u = this.auth.currentUser();
    if (u) this.form = { name: u.name, mobile: u.mobile || '', city: u.city || '' };
    this.api.getMyBookings().subscribe({
      next: (res) => {
        this.bookingCount.set(res.count || 0);
        this.recentBookings.set((res.data || []).slice(0, 3));
      }
    });
  }

  openModal() { this.modalOpen.set(true); }
  closeModal() { this.modalOpen.set(false); this.saveMsg.set(''); }

  saveProfile() {
    this.saving.set(true);
    this.auth.updateProfile(this.form).subscribe({
      next: () => { this.saveMsg.set('Profile updated successfully!'); this.saving.set(false); setTimeout(() => this.closeModal(), 1500); },
      error: () => this.saving.set(false)
    });
  }
}
