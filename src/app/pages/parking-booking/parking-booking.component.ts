import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-parking-booking',
  imports: [CommonModule, FormsModule],
  template: `
<div class="page-wrapper">

  <!-- Top Bar -->
  <div class="top-bar pt-5 mt-4 mt-sm-0">
    <div class="container-xl d-flex align-items-center gap-3 pt-sm-5 mt-5">
      <button class="back-btn" (click)="goBack()">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <div>
        <h1 class="page-title mb-0">Book Parking</h1>
        <p class="page-sub mb-0">{{parking().name}}</p>
      </div>
    </div>
  </div>

  <div class="container-xl py-4 py-md-5">
    <div class="row g-4 g-xl-5">

      <!-- LEFT — Parking Info -->
      <div class="col-lg-7">

        <!-- Map -->
        <div class="map-card mb-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227821.98710530254!2d80.77769949830774!3d26.848902829067065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1775041687024!5m2!1sen!2sin"
            width="100%" height="280" style="border:0" allowfullscreen loading="lazy">
          </iframe>
          <div class="map-overlay">
            <div class="map-badge">
              <i class="fa-solid fa-location-dot me-2"></i>{{parking().address || 'View on map'}}
            </div>
          </div>
        </div>

        <!-- Parking Details Card -->
        <div class="info-card mb-4">
          <div class="d-flex align-items-start justify-content-between mb-4">
            <div>
              <h2 class="parking-name mb-1">{{parking().name}}</h2>
              <p class="parking-addr mb-0"><i class="fa-solid fa-location-dot me-2 text-danger"></i>{{parking().address}}</p>
            </div>
            <div class="rate-pill">₹{{parking().rate}}<span>/hr</span></div>
          </div>

          <div class="detail-grid">
            <div class="detail-item">
              <div class="detail-icon" style="background:#eff6ff;color:#1d4ed8"><i class="fa-solid fa-car"></i></div>
              <div><div class="detail-label">Vehicle Type</div><div class="detail-val">{{parking().type}}</div></div>
            </div>
            <div class="detail-item">
              <div class="detail-icon" style="background:#f0fdf4;color:#16a34a"><i class="fa-solid fa-clock"></i></div>
              <div><div class="detail-label">Duration</div><div class="detail-val">{{selectedDuration()}} Hour{{selectedDuration() > 1 ? 's' : ''}}</div></div>
            </div>
            <div class="detail-item">
              <div class="detail-icon" style="background:#fdf4ff;color:#9333ea"><i class="fa-solid fa-calendar-check"></i></div>
              <div><div class="detail-label">Date</div><div class="detail-val">{{bookingDate || '—'}}</div></div>
            </div>
            <div class="detail-item">
              <div class="detail-icon" style="background:#fff7ed;color:#ea580c"><i class="fa-solid fa-hourglass-half"></i></div>
              <div><div class="detail-label">Time Slot</div><div class="detail-val">{{currentTimeSlot()}}</div></div>
            </div>
          </div>
        </div>

        <!-- Duration Picker -->
        <div class="info-card">
          <h5 class="section-heading mb-3"><i class="fa-solid fa-stopwatch me-2 text-primary"></i>Select Duration</h5>
          <div class="duration-grid">
            <button *ngFor="let opt of durationOptions"
              class="dur-btn"
              [class.active]="selectedDuration() === opt.hours"
              (click)="selectedDuration.set(opt.hours)">
              <span class="dur-hr">{{opt.hours}}h</span>
              <span class="dur-price">₹{{opt.hours * parking().rate}}</span>
            </button>
          </div>
        </div>

      </div>

      <!-- RIGHT — Booking Form -->
      <div class="col-lg-5">
        <div class="booking-form-card sticky-top" style="top:90px">

          <div class="form-header">
            <h4 class="mb-0 fw-bold">Confirm Booking</h4>
            <p class="text-muted small mb-0">Fill in the details below</p>
          </div>

          <div class="form-body">

            <div *ngIf="successMsg()" class="alert alert-success border-0 rounded-3 small fw-bold mb-4">
              <i class="fa-solid fa-circle-check me-2"></i>{{successMsg()}}
            </div>
            <div *ngIf="errorMsg()" class="alert alert-danger border-0 rounded-3 small mb-4">
              <i class="fa-solid fa-circle-exclamation me-2"></i>{{errorMsg()}}
            </div>

            <!-- Vehicle Number -->
            <div class="field-group mb-3">
              <label class="field-label">Vehicle Number</label>
              <div class="field-input-wrap">
                <i class="fa-solid fa-hashtag field-icon"></i>
                <input type="text" [(ngModel)]="vehicleNumber" class="field-input text-uppercase" placeholder="e.g. UP32AB1234">
              </div>
            </div>

            <!-- Date -->
            <div class="field-group mb-3">
              <label class="field-label">Check-in Date</label>
              <div class="field-input-wrap">
                <i class="fa-solid fa-calendar-days field-icon"></i>
                <input type="date" [(ngModel)]="bookingDate" class="field-input">
              </div>
            </div>

            <!-- Time -->
            <div class="field-group mb-4">
              <label class="field-label">Check-in Time</label>
              <div class="field-input-wrap">
                <i class="fa-solid fa-clock field-icon"></i>
                <input type="time" [(ngModel)]="bookingTime" class="field-input">
              </div>
            </div>

            <!-- Price Summary -->
            <div class="price-summary mb-4">
              <div class="price-row">
                <span>Hourly Rate</span>
                <span>₹{{parking().rate}} × {{selectedDuration()}} hr</span>
              </div>
              <div class="price-row">
                <span>Platform Fee</span>
                <span class="text-success">Free</span>
              </div>
              <div class="price-divider"></div>
              <div class="price-row total-row">
                <span>Total Amount</span>
                <span class="total-amount">₹{{totalPrice()}}</span>
              </div>
            </div>

            <!-- Confirm Button -->
            <button class="confirm-btn w-100" (click)="startBooking()" [disabled]="booking()">
              <span *ngIf="!booking()">
                <i class="fa-solid fa-check-circle me-2"></i>Confirm Booking — ₹{{totalPrice()}}
              </span>
              <span *ngIf="booking()">
                <i class="fa-solid fa-spinner fa-spin me-2"></i>Processing...
              </span>
            </button>

            <p class="text-center text-muted mt-3" style="font-size:0.78rem">
              <i class="fa-solid fa-shield-halved me-1 text-success"></i>
              Secure booking · Free cancellation within 1 hour
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
  `,
  styles: [`
    .page-wrapper { background: #f1f5f9; min-height: 100vh; }

    /* Top Bar */
    .top-bar { background: white; border-bottom: 1px solid #e2e8f0; padding: 16px 0; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
    .back-btn { width: 42px; height: 42px; border-radius: 12px; background: #f1f5f9; border: none; display: flex; align-items: center; justify-content: center; color: #475569; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
    .back-btn:hover { background: #e2e8f0; color: #1e293b; }
    .page-title { font-size: 1.2rem; font-weight: 800; color: #0f172a; }
    .page-sub { font-size: 0.82rem; color: #64748b; }

    /* Map Card */
    .map-card { border-radius: 20px; overflow: hidden; position: relative; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .map-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 12px 16px; background: linear-gradient(to top, rgba(0,0,0,0.6), transparent); }
    .map-badge { color: white; font-size: 0.82rem; font-weight: 600; display: flex; align-items: center; }

    /* Info Card */
    .info-card { background: white; border-radius: 20px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); border: 1px solid #f1f5f9; }
    .parking-name { font-size: 1.4rem; font-weight: 800; color: #0f172a; }
    .parking-addr { font-size: 0.85rem; color: #64748b; }
    .rate-pill { background: #f0fdf4; color: #16a34a; border: 1.5px solid #bbf7d0; border-radius: 50px; padding: 8px 18px; font-size: 1.1rem; font-weight: 800; white-space: nowrap; }
    .rate-pill span { font-size: 0.75rem; font-weight: 600; }

    /* Detail Grid */
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .detail-item { display: flex; align-items: center; gap: 12px; padding: 14px; background: #f8fafc; border-radius: 14px; }
    .detail-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
    .detail-label { font-size: 0.72rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .detail-val { font-size: 0.9rem; font-weight: 700; color: #1e293b; margin-top: 2px; }

    /* Duration */
    .section-heading { font-size: 1rem; font-weight: 700; color: #1e293b; }
    .duration-grid { display: flex; gap: 10px; flex-wrap: wrap; }
    .dur-btn { min-width: 80px; height: 80px; border-radius: 16px; background: #f8fafc; border: 2px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all 0.25s; flex-shrink: 0; }
    .dur-btn:hover { border-color: #10b981; background: #f0fdf4; }
    .dur-btn.active { background: #10b981; border-color: #10b981; transform: scale(1.05); box-shadow: 0 8px 20px rgba(16,185,129,0.25); }
    .dur-hr { font-size: 1rem; font-weight: 800; color: #1e293b; }
    .dur-price { font-size: 0.72rem; font-weight: 600; color: #64748b; margin-top: 2px; }
    .dur-btn.active .dur-hr, .dur-btn.active .dur-price { color: white; }

    /* Booking Form Card */
    .booking-form-card { background: white; border-radius: 24px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); border: 1px solid #f1f5f9; overflow: hidden; }
    .form-header { padding: 24px 28px 20px; border-bottom: 1px solid #f1f5f9; }
    .form-body { padding: 24px 28px 28px; }

    /* Fields */
    .field-label { font-size: 0.78rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px; }
    .field-input-wrap { display: flex; align-items: center; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 0 14px; gap: 10px; transition: border-color 0.2s; }
    .field-input-wrap:focus-within { border-color: #10b981; background: white; }
    .field-icon { color: #10b981; font-size: 0.9rem; flex-shrink: 0; }
    .field-input { flex: 1; border: none; background: transparent; padding: 13px 0; font-size: 0.95rem; font-weight: 600; color: #1e293b; outline: none; }

    /* Price Summary */
    .price-summary { background: #f8fafc; border-radius: 16px; padding: 18px 20px; }
    .price-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: #475569; margin-bottom: 10px; }
    .price-row:last-child { margin-bottom: 0; }
    .price-divider { height: 1px; background: #e2e8f0; margin: 12px 0; }
    .total-row { font-weight: 700; color: #0f172a; font-size: 1rem; }
    .total-amount { font-size: 1.3rem; font-weight: 800; color: #10b981; }

    /* Confirm Button */
    .confirm-btn { background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; border-radius: 14px; padding: 16px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 0 8px 20px rgba(16,185,129,0.3); }
    .confirm-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(16,185,129,0.4); }
    .confirm-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

    /* Mobile */
    @media (max-width: 991px) {
      .top-bar { padding: 12px 0; }
      .page-title { font-size: 1rem; }
      .detail-grid { grid-template-columns: 1fr 1fr; }
      .booking-form-card { position: static !important; }
    }
    @media (max-width: 576px) {
      .detail-grid { grid-template-columns: 1fr; }
      .form-header, .form-body { padding: 18px 20px; }
    }
  `]
})
export class ParkingBookingComponent implements OnInit {
  parking = signal({ name: 'Central City Parking', address: '123 MG Road, Delhi', rate: 20, type: 'Car', id: '' });
  selectedDuration = signal(2);
  bookingDate = new Date().toISOString().split('T')[0];
  bookingTime = '10:00';
  vehicleNumber = '';
  booking = signal(false);
  successMsg = signal('');
  errorMsg = signal('');

  durationOptions = [{ hours: 1 }, { hours: 2 }, { hours: 3 }, { hours: 4 }, { hours: 5 }, { hours: 6 }];
  totalPrice = computed(() => this.selectedDuration() * this.parking().rate);

  currentTimeSlot = computed(() => {
    if (!this.bookingDate || !this.bookingTime) return '—';
    const start = new Date(`${this.bookingDate}T${this.bookingTime}`);
    const end = new Date(start.getTime() + this.selectedDuration() * 3600000);
    const fmt = (d: Date) => {
      let h = d.getHours();
      const m = d.getMinutes().toString().padStart(2, '0');
      const ap = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return `${h}:${m} ${ap}`;
    };
    return `${fmt(start)} – ${fmt(end)}`;
  });

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['name']) {
        this.parking.set({
          name: params['name'],
          address: params['address'] || '',
          rate: parseInt(params['rate']) || 20,
          type: params['type'] || 'Car',
          id: params['id'] || ''
        });
      }
    });
  }

  goBack() { this.router.navigate(['/find-parking']); }

  startBooking() {
    if (!this.parking().id) {
      this.errorMsg.set('Invalid parking. Please go back and select again.');
      return;
    }
    this.booking.set(true);
    this.errorMsg.set('');
    this.api.createBooking({
      parkingId: this.parking().id as any,
      date: this.bookingDate,
      time: this.bookingTime,
      duration: this.selectedDuration(),
      vehicleNumber: this.vehicleNumber.toUpperCase() || undefined,
      vehicleType: this.parking().type === 'Bike' ? '2W' : '4W'
    }).subscribe({
      next: (res) => {
        this.booking.set(false);
        this.router.navigate(['/booking-receipt', res.data._id]);
      },
      error: (err) => {
        this.errorMsg.set(err.error?.message || 'Booking failed. Please try again.');
        this.booking.set(false);
      }
    });
  }
}
