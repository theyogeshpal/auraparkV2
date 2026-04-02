import { Component, OnInit, signal, computed } from '@angular/core';
import { Location, CommonModule, DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule, DatePipe],
  template: `
<div class="notif-page pt-5">
  <div class="notif-header">
    <div class="header-inner">
      <button class="back-btn" (click)="goBack()"><i class="fa-solid fa-arrow-left"></i></button>
      <div class="header-title">
        <h5 class="mb-0 fw-bold text-white">Notifications</h5>
        <span class="unread-badge" *ngIf="unreadCount() > 0">{{unreadCount()}} new</span>
      </div>
      <button class="mark-all-btn" (click)="markAllRead()" *ngIf="unreadCount() > 0">Mark all read</button>
      <div style="width:80px" *ngIf="unreadCount() === 0"></div>
    </div>
  </div>

  <div class="filter-tabs">
    <button [class.active]="activeFilter() === 'all'" (click)="setFilter('all')">All</button>
    <button [class.active]="activeFilter() === 'unread'" (click)="setFilter('unread')">Unread</button>
    <button [class.active]="activeFilter() === 'promo'" (click)="setFilter('promo')">Offers</button>
  </div>

  <div class="notif-content">
    <div *ngIf="loading()" class="empty-state"><div class="spinner-border text-primary"></div></div>

    <ng-container *ngIf="!loading()">
      <div *ngFor="let n of filteredNotifs()" class="notif-card" [class.unread]="!n.isRead" (click)="markRead(n._id)">
        <div class="notif-icon" [class]="'type-' + n.type">
          <i [class]="getIcon(n.type)"></i>
        </div>
        <div class="notif-body">
          <div class="notif-top">
            <p class="notif-title">{{n.title}}</p>
            <span class="notif-dot" *ngIf="!n.isRead"></span>
          </div>
          <p class="notif-msg">{{n.message}}</p>
          <span class="notif-time">{{n.createdAt | date:'d MMM, h:mm a'}}</span>
        </div>
      </div>

      <div *ngIf="filteredNotifs().length === 0" class="empty-state">
        <div class="empty-icon"><i class="fa-regular fa-bell-slash"></i></div>
        <h6 class="fw-bold">No notifications</h6>
        <p class="text-muted small">You're all caught up!</p>
      </div>
    </ng-container>
  </div>
</div>
  `,
  styles: [`
    .notif-page { background: #f1f5f9; min-height: 100vh; padding-bottom: 40px; }
    .notif-header { background: #0f0f0f; border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top: 0; z-index: 100; }
    .header-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; max-width: 700px; margin: 0 auto; }
    .back-btn { width: 36px; height: 36px; border: none; background: rgba(255,255,255,0.08); border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
    .back-btn:hover { background: rgba(255,255,255,0.15); }
    .header-title { display: flex; align-items: center; gap: 10px; }
    .unread-badge { background: #e11d48; color: white; font-size: 0.68rem; font-weight: 700; padding: 2px 8px; border-radius: 50px; }
    .mark-all-btn { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.6); font-size: 0.75rem; font-weight: 600; padding: 6px 12px; border-radius: 8px; cursor: pointer; white-space: nowrap; }
    .mark-all-btn:hover { border-color: white; color: white; }
    .filter-tabs { display: flex; gap: 8px; padding: 16px 20px; max-width: 700px; margin: 0 auto; }
    .filter-tabs button { background: white; border: 1.5px solid #e2e8f0; border-radius: 50px; padding: 7px 18px; font-size: 0.82rem; font-weight: 600; color: #64748b; cursor: pointer; transition: all 0.2s; }
    .filter-tabs button.active { background: #0f172a; border-color: #0f172a; color: white; }
    .notif-content { max-width: 700px; margin: 0 auto; padding: 0 20px; display: flex; flex-direction: column; gap: 10px; }
    .notif-card { background: white; border-radius: 16px; padding: 16px; display: flex; gap: 14px; cursor: pointer; transition: all 0.2s; border: 1.5px solid transparent; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
    .notif-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.08); transform: translateY(-1px); }
    .notif-card.unread { border-color: #e0f2fe; background: #f0f9ff; }
    .notif-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.1rem; }
    .type-info { background: #eff6ff; color: #0b74da; }
    .type-success { background: #f0fdf4; color: #16a34a; }
    .type-warning { background: #fffbeb; color: #ca8a04; }
    .type-promo { background: #fdf4ff; color: #9333ea; }
    .notif-body { flex: 1; min-width: 0; }
    .notif-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
    .notif-title { font-size: 0.9rem; font-weight: 700; color: #1e293b; margin: 0; }
    .notif-dot { width: 8px; height: 8px; background: #0b74da; border-radius: 50%; flex-shrink: 0; }
    .notif-msg { font-size: 0.83rem; color: #64748b; line-height: 1.5; margin: 0 0 6px; }
    .notif-time { font-size: 0.72rem; color: #94a3b8; font-weight: 500; }
    .empty-state { text-align: center; padding: 60px 20px; }
    .empty-icon { width: 72px; height: 72px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
    .empty-icon i { font-size: 1.8rem; color: #94a3b8; }
    @media (min-width: 768px) {
      .header-inner { padding: 18px 40px; }
      .filter-tabs { padding: 20px 40px; }
      .notif-content { padding: 0 40px; }
    }
  `]
})
export class NotificationsComponent implements OnInit {
  activeFilter = signal<'all' | 'unread' | 'promo'>('all');
  notifications = signal<any[]>([]);
  loading = signal(true);

  unreadCount = computed(() => this.notifications().filter(n => !n.isRead).length);
  filteredNotifs = computed(() => {
    const f = this.activeFilter();
    const all = this.notifications();
    if (f === 'unread') return all.filter(n => !n.isRead);
    if (f === 'promo') return all.filter(n => n.type === 'promo');
    return all;
  });

  constructor(private location: Location, private api: ApiService) {}

  ngOnInit() { this.loadNotifications(); }

  loadNotifications() {
    this.loading.set(true);
    this.api.getNotifications().subscribe({
      next: (res) => { this.notifications.set(res.data || []); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  setFilter(f: 'all' | 'unread' | 'promo') { this.activeFilter.set(f); }

  markRead(id: string) {
    const notif = this.notifications().find(n => n._id === id);
    if (!notif || notif.isRead) return;
    this.api.markNotificationRead(id).subscribe({
      next: () => this.notifications.update(list => list.map(n => n._id === id ? { ...n, isRead: true } : n))
    });
  }

  markAllRead() {
    this.notifications.update(list => list.map(n => ({ ...n, isRead: true })));
    this.api.markAllNotificationsRead().subscribe();
  }

  getIcon(type: string): string {
    const icons: Record<string, string> = { info: 'fa-solid fa-circle-info', success: 'fa-solid fa-circle-check', warning: 'fa-solid fa-triangle-exclamation', promo: 'fa-solid fa-tag' };
    return icons[type] ?? 'fa-solid fa-bell';
  }

  goBack() { this.location.back(); }
}
