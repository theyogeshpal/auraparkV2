import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-parking-booking',
  imports: [CommonModule, FormsModule],
  template: `
<div class="booking-container py-5">
  <header class="header px-4 pt-4 pb-3 d-flex align-items-center justify-content-between">
    <button (click)="goBack()" class="icon-btn"><i class="fa-solid fa-arrow-left"></i></button>
    <h1 class="header-title m-0">Booking</h1>
    <div style="width:44px"></div>
  </header>

  <main class="content px-4">
    <div class="map-snippet mb-4">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.6105658602283!2d80.9424687!3d26.8524458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUxJzA4LjgiTiA4MMKwNTYnMzIuOSJF!5e0!3m2!1sen!2sin!4v1711995600000!5m2!1sen!2sin"
        width="100%" height="160" style="border:0;border-radius:20px" allowfullscreen loading="lazy"></iframe>
    </div>

    <h2 class="section-title mb-4">Book {{parking().name}}</h2>

    <div *ngIf="successMsg()" class="alert alert-success border-0 rounded-4 mb-4 fw-bold">
      <i class="fa-solid fa-circle-check me-2"></i>{{successMsg()}}
    </div>
    <div *ngIf="errorMsg()" class="alert alert-danger border-0 rounded-4 mb-4 small">
      <i class="fa-solid fa-circle-exclamation me-2"></i>{{errorMsg()}}
    </div>

    <div class="selection-card p-4 mb-4">
      <div class="row g-3">
        <div class="col-6">
          <label class="label mb-2">Check-in Date</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-calendar-days input-icon"></i>
            <input type="date" [(ngModel)]="bookingDate" class="custom-input">
          </div>
        </div>
        <div class="col-6">
          <label class="label mb-2">Check-in Time</label>
          <div class="input-wrapper">
            <i class="fa-solid fa-clock input-icon"></i>
            <input type="time" [(ngModel)]="bookingTime" class="custom-input">
          </div>
        </div>
      </div>
    </div>

    <div class="details-card p-4 mb-4">
      <div class="d-flex justify-content-between align-items-start">
        <div class="info-group">
          <span class="label">Parking</span>
          <h3 class="value" style="font-size:1.3rem">{{parking().name}}</h3>
          <span class="label mt-2">Time Slot</span>
          <p class="value-text">{{currentTimeSlot()}}</p>
        </div>
        <div class="mini-map-container">
          <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=200" alt="Location" class="mini-map">
          <div class="map-marker"><i class="fa-solid fa-location-dot"></i></div>
        </div>
      </div>
      <div class="d-flex justify-content-end mt-2">
        <span class="total-price">₹{{totalPrice()}}</span>
      </div>
    </div>

    <div class="duration-section mb-5">
      <h4 class="sub-title mb-3">Duration & Price</h4>
      <div class="duration-grid">
        <button *ngFor="let opt of durationOptions" class="duration-btn" [class.active]="selectedDuration() === opt.hours" (click)="selectedDuration.set(opt.hours)">
          <span class="btn-hours">{{opt.hours}} Hr</span>
          <span class="btn-price">₹{{opt.hours * parking().rate}}</span>
        </button>
      </div>
    </div>

    <button (click)="startBooking()" class="btn-start-booking w-100 py-3" [disabled]="booking()">
      <span *ngIf="!booking()">Confirm Booking <i class="fa-solid fa-check ms-2"></i></span>
      <span *ngIf="booking()"><i class="fa-solid fa-spinner fa-spin me-2"></i>Booking...</span>
    </button>
  </main>
</div>
  `,
  styles: [`
    .booking-container { background-color: #f8fafc; min-height: 100vh; font-family: 'Inter', sans-serif; max-width: 500px; margin: 0 auto; box-shadow: 0 0 40px rgba(0,0,0,0.05); }
    .header-title { font-size: 1.25rem; font-weight: 700; color: #1e293b; }
    .icon-btn { width: 44px; height: 44px; border-radius: 14px; background: white; border: none; display: flex; align-items: center; justify-content: center; color: #64748b; box-shadow: 0 4px 12px rgba(0,0,0,0.03); cursor: pointer; }
    .section-title { font-size: 1.5rem; font-weight: 800; color: #0f172a; }
    .selection-card { background: white; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); border: 1px solid #f1f5f9; }
    .input-wrapper { position: relative; background: #f8fafc; border-radius: 12px; padding: 10px; display: flex; align-items: center; gap: 10px; border: 1px solid #e2e8f0; }
    .input-icon { color: #006aff; font-size: 0.9rem; }
    .custom-input { background: transparent; border: none; width: 100%; font-size: 0.85rem; font-weight: 600; color: #1e293b; outline: none; }
    .details-card { background: white; border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
    .label { display: block; font-size: 0.8rem; color: #94a3b8; font-weight: 600; }
    .value { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin: 0; }
    .value-text { font-size: 0.95rem; font-weight: 600; color: #334155; margin: 0; }
    .mini-map-container { width: 100px; height: 100px; border-radius: 20px; overflow: hidden; position: relative; box-shadow: 0 8px 15px rgba(0,0,0,0.1); }
    .mini-map { width: 100%; height: 100%; object-fit: cover; }
    .map-marker { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -100%); color: #006aff; font-size: 1.5rem; }
    .total-price { font-size: 1.25rem; font-weight: 800; color: #1e293b; }
    .sub-title { font-size: 1.1rem; font-weight: 700; color: #1e293b; }
    .duration-grid { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 10px; scrollbar-width: none; }
    .duration-grid::-webkit-scrollbar { display: none; }
    .duration-btn { min-width: 90px; height: 90px; border-radius: 20px; background: white; border: 1px solid #f1f5f9; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: all 0.3s; flex-shrink: 0; cursor: pointer; }
    .duration-btn.active { background: #10b981; border-color: #10b981; transform: scale(1.05); box-shadow: 0 10px 20px rgba(16,185,129,0.2); }
    .btn-hours { font-size: 0.75rem; font-weight: 600; color: #94a3b8; margin-bottom: 4px; }
    .btn-price { font-size: 1rem; font-weight: 800; color: #1e293b; }
    .duration-btn.active .btn-hours, .duration-btn.active .btn-price { color: white; }
    .btn-start-booking { background: #10b981; color: white; border: none; border-radius: 20px; font-size: 1.1rem; font-weight: 700; box-shadow: 0 10px 25px rgba(16,185,129,0.3); transition: all 0.2s; cursor: pointer; }
    .btn-start-booking:disabled { opacity: 0.7; cursor: not-allowed; }
    @media (min-width: 768px) { .booking-container { margin: 40px auto; border-radius: 40px; } }
  `]
})
export class ParkingBookingComponent implements OnInit {
  parking = signal({ name: 'Central City Parking', address: '123 MG Road, Delhi', rate: 20, type: 'Car', id: '' });
  selectedDuration = signal(3);
  bookingDate = new Date().toISOString().split('T')[0];
  bookingTime = '10:00';
  booking = signal(false);
  successMsg = signal('');
  errorMsg = signal('');

  durationOptions = [{ hours: 1 }, { hours: 2 }, { hours: 3 }, { hours: 4 }, { hours: 5 }];
  totalPrice = computed(() => this.selectedDuration() * this.parking().rate);

  currentTimeSlot = computed(() => {
    if (!this.bookingDate || !this.bookingTime) return 'Select Date & Time';
    const start = new Date(`${this.bookingDate}T${this.bookingTime}`);
    const end = new Date(start.getTime() + this.selectedDuration() * 3600000);
    const fmt = (d: Date) => { let h = d.getHours(); const m = d.getMinutes().toString().padStart(2,'0'); const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return `${h}:${m} ${ap}`; };
    return `${fmt(start)} - ${fmt(end)}`;
  });

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['name']) {
        this.parking.set({ name: params['name'], address: params['address'] || '', rate: parseInt(params['rate']) || 20, type: params['type'] || 'Car', id: params['id'] || '' });
      }
    });
  }

  goBack() { this.router.navigate(['/find-parking']); }

  startBooking() {
    if (!this.parking().id) { this.errorMsg.set('Invalid parking. Please go back and select again.'); return; }
    this.booking.set(true); this.errorMsg.set('');
    this.api.createBooking({ parkingId: this.parking().id as any, date: this.bookingDate, time: this.bookingTime, duration: this.selectedDuration() }).subscribe({
      next: () => {
        this.successMsg.set(`Booking confirmed for ${this.selectedDuration()} hrs at ${this.parking().name}! Total: ₹${this.totalPrice()}`);
        this.booking.set(false);
        setTimeout(() => this.router.navigate(['/bookings']), 2000);
      },
      error: (err) => { this.errorMsg.set(err.error?.message || 'Booking failed. Please try again.'); this.booking.set(false); }
    });
  }
}
