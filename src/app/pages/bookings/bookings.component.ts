import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-bookings',
  imports: [CommonModule, RouterLink],
  template: `
<div class="bookings-page pt-5">
  <div class="header">
    <a routerLink="/profile" class="back-btn"><i class="fa-solid fa-arrow-left"></i></a>
    <h1 class="page-title">My Bookings</h1>
    <div style="width:40px"></div>
  </div>

  <div class="tabs-container">
    <div class="tabs">
      <button class="tab-btn" [class.active]="activeTab() === 'ongoing'" (click)="setTab('ongoing')">Ongoing</button>
      <button class="tab-btn" [class.active]="activeTab() === 'completed'" (click)="setTab('completed')">Completed</button>
      <button class="tab-btn" [class.active]="activeTab() === 'cancelled'" (click)="setTab('cancelled')">Cancelled</button>
    </div>
  </div>

  <div class="booking-list">
    <div *ngIf="loading()" class="no-bookings">
      <div class="spinner-border text-success" role="status"></div>
    </div>

    <div *ngIf="!loading() && filteredBookings().length === 0" class="no-bookings">
      <i class="fa-solid fa-calendar-xmark d-block fs-2 mb-2 text-muted"></i>
      <p class="text-muted">No {{activeTab()}} bookings found.</p>
    </div>

    <div class="booking-card" *ngFor="let b of filteredBookings()">
      <div class="card-top">
        <div class="image-wrapper">
          <div class="parking-icon-placeholder">
            <i class="fa-solid fa-square-parking"></i>
          </div>
        </div>
        <div class="card-info">
          <div class="info-header">
            <span class="parking-type">{{b.type}}</span>
            <div class="rating"><i class="fa-solid fa-star"></i><span>{{b.rating || '4.5'}}</span></div>
          </div>
          <h3 class="title">{{b.parkingName}}</h3>
          <div class="location"><i class="fa-solid fa-location-dot"></i><span>{{b.location}}</span></div>
          <div class="price">
            <span class="amount">₹{{b.totalPrice}}</span>
            <span class="unit"> · {{b.duration}}hr · {{b.date}}</span>
          </div>
        </div>
      </div>
      <div class="card-actions" *ngIf="b.status === 'ongoing'">
        <button class="btn-cancel" (click)="cancelBooking(b._id)" [disabled]="cancelling() === b._id">
          <span *ngIf="cancelling() !== b._id">Cancel Booking</span>
          <span *ngIf="cancelling() === b._id"><i class="fa-solid fa-spinner fa-spin me-1"></i>Cancelling...</span>
        </button>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
    .bookings-page { background-color: #f1f5f9; min-height: 100vh; padding-bottom: 90px; font-family: "Inter", sans-serif; }
    .header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; padding-top: max(16px, env(safe-area-inset-top)); }
    .back-btn { width: 40px; height: 40px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; color: #6b7280; text-decoration: none; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
    .back-btn:hover { color: #111827; }
    .page-title { font-size: 1.25rem; font-weight: 700; color: #111827; margin: 0; }
    .tabs-container { padding: 5px 20px 20px; }
    .tabs { display: flex; background: white; border-radius: 30px; padding: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
    .tab-btn { flex: 1; border: none; background: transparent; padding: 12px 0; font-size: 0.9rem; font-weight: 600; color: #6b7280; border-radius: 24px; cursor: pointer; transition: all 0.2s ease; }
    .tab-btn.active { background: #10b981; color: white; box-shadow: 0 4px 10px rgba(16,185,129,0.25); }
    .booking-list { padding: 0 20px 20px; display: flex; flex-direction: column; gap: 16px; }
    .no-bookings { text-align: center; color: #6b7280; padding: 40px 0; font-weight: 500; background: white; border-radius: 20px; }
    .booking-card { background: white; border-radius: 24px; padding: 18px; box-shadow: 0 8px 20px rgba(0,0,0,0.04); }
    .card-top { display: flex; gap: 16px; margin-bottom: 16px; }
    .image-wrapper { width: 90px; height: 90px; border-radius: 16px; overflow: hidden; flex-shrink: 0; background: #f0f9ff; display: flex; align-items: center; justify-content: center; }
    .parking-icon-placeholder { font-size: 2.5rem; color: #0b74da; }
    .card-info { flex: 1; display: flex; flex-direction: column; justify-content: center; }
    .info-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
    .parking-type { font-size: 0.7rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; }
    .rating { display: flex; align-items: center; gap: 4px; font-size: 0.8rem; font-weight: 700; color: #374151; }
    .rating i { color: #eab308; }
    .title { font-size: 1.05rem; font-weight: 700; color: #1f2937; margin: 0 0 6px 0; }
    .location { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #6b7280; margin-bottom: 8px; }
    .location i { color: #9ca3af; }
    .price { display: flex; align-items: baseline; gap: 4px; }
    .amount { font-size: 1.1rem; font-weight: 700; color: #10b981; }
    .unit { font-size: 0.8rem; color: #6b7280; }
    .card-actions { display: flex; gap: 12px; }
    .btn-cancel { flex: 1; padding: 14px 0; border: none; background: #ef4444; color: white; font-weight: 700; font-size: 0.95rem; border-radius: 16px; cursor: pointer; transition: all 0.2s; }
    .btn-cancel:hover:not(:disabled) { background: #dc2626; }
    .btn-cancel:disabled { opacity: 0.7; cursor: not-allowed; }
    @media (min-width: 768px) {
      .header, .tabs-container { max-width: 900px; margin: 0 auto; }
      .header { padding: 24px 20px; margin-top: 60px; }
      .tabs { max-width: 500px; margin: 0 auto; }
      .booking-list { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px; padding: 10px 20px 40px; }
      .no-bookings { grid-column: 1 / -1; }
    }
  `]
})
export class BookingsComponent implements OnInit {
  activeTab = signal<'ongoing' | 'completed' | 'cancelled'>('ongoing');
  allBookings = signal<any[]>([]);
  loading = signal(true);
  cancelling = signal<string | null>(null);

  filteredBookings = computed(() => this.allBookings().filter(b => b.status === this.activeTab()));

  constructor(private api: ApiService) {}

  ngOnInit() { this.loadBookings(); }

  loadBookings() {
    this.loading.set(true);
    this.api.getMyBookings().subscribe({
      next: (res) => { this.allBookings.set(res.data || []); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  setTab(tab: 'ongoing' | 'completed' | 'cancelled') { this.activeTab.set(tab); }

  cancelBooking(id: string) {
    if (!confirm('Cancel this booking?')) return;
    this.cancelling.set(id);
    this.api.cancelBooking(id).subscribe({
      next: () => {
        this.allBookings.update(b => b.map(x => x._id === id ? { ...x, status: 'cancelled' } : x));
        this.cancelling.set(null);
      },
      error: () => this.cancelling.set(null)
    });
  }
}
