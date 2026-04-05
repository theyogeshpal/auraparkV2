import { Component, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-booking-receipt',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<div class="receipt-page pt-5 mt-5">

  <div *ngIf="loading()" class="d-flex align-items-center justify-content-center min-vh-100">
    <div class="text-center">
      <div class="spinner-border text-success mb-3" style="width:3rem;height:3rem"></div>
      <p class="text-muted">Generating your receipt...</p>
    </div>
  </div>

  <div *ngIf="!loading() && error()" class="d-flex align-items-center justify-content-center min-vh-100">
    <div class="text-center">
      <i class="fa-solid fa-circle-exclamation text-danger fs-1 mb-3 d-block"></i>
      <h5>{{error()}}</h5>
      <a routerLink="/bookings" class="btn btn-primary mt-3">Go to Bookings</a>
    </div>
  </div>

  <div *ngIf="!loading() && !error() && receipt()" class="container py-4 py-md-5">
    <div class="receipt-wrapper">

      <div class="receipt-header text-center">
        <div class="success-icon">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h2 class="fw-bold mt-3 mb-1">Booking Confirmed!</h2>
        <p class="text-muted mb-0">Your parking slot has been reserved successfully.</p>
      </div>

      <div class="receipt-card" id="receipt-print" #receiptEl>

        <div class="receipt-brand">
          <div class="brand-left">
            <span class="brand-logo">🅿</span>
            <div>
              <div class="brand-name">AuraPark</div>
              <div class="brand-sub">Parking Receipt</div>
            </div>
          </div>
          <div class="text-end">
            <div class="ref-label">Booking Ref</div>
            <div class="ref-value">{{receipt()!.bookingRef}}</div>
          </div>
        </div>

        <div class="receipt-divider dashed "></div>

        <div class="text-center my-3">
          <span class="status-pill" [class.status-prebooked]="receipt()!.status === 'prebooked'" [class.status-ongoing]="receipt()!.status === 'ongoing'" [class.status-cancelled]="receipt()!.status === 'cancelled'" [class.status-completed]="receipt()!.status === 'completed'">
            <i class="fa-solid fa-circle me-2" style="font-size:0.5rem"></i>
            {{receipt()!.status === 'prebooked' ? 'Pre-Booked' : (receipt()!.status | titlecase)}}
          </span>
        </div>

        <div class="section-title"><i class="fa-solid fa-square-parking me-2"></i>Parking Details</div>
        <div class="info-rows">
          <div class="info-row">
            <span class="info-key">Parking Name</span>
            <span class="info-val fw-bold">{{receipt()!.parkingName}}</span>
          </div>
          <div class="info-row">
            <span class="info-key">Address</span>
            <span class="info-val">{{receipt()!.parkingAddress}}</span>
          </div>
          <div class="info-row">
            <span class="info-key">Location</span>
            <span class="info-val">{{receipt()!.location}}</span>
          </div>
          <div class="info-row">
            <span class="info-key">Owner</span>
            <span class="info-val">{{receipt()!.ownerName}}</span>
          </div>
          <div class="info-row">
            <span class="info-key">Contact</span>
            <span class="info-val">{{receipt()!.ownerMobile}}</span>
          </div>
        </div>

        <div class="receipt-divider"></div>

        <div class="section-title"><i class="fa-solid fa-calendar-check me-2"></i>Booking Details</div>
        <div class="info-rows">
          <div class="info-row">
            <span class="info-key">Date</span>
            <span class="info-val fw-bold">{{receipt()!.date}}</span>
          </div>
          <div class="info-row">
            <span class="info-key">Check-in Time</span>
            <span class="info-val fw-bold text-success">{{formatTime(receipt()!.time)}}</span>
          </div>
          <div class="info-row">
            <span class="info-key">Check-out Time</span>
            <span class="info-val fw-bold text-danger">{{formatTime(receipt()!.endTime)}}</span>
          </div>
          <div class="info-row">
            <span class="info-key">Duration</span>
            <span class="info-val">{{receipt()!.duration}} Hour{{receipt()!.duration > 1 ? 's' : ''}}</span>
          </div>
          <div class="info-row">
            <span class="info-key">Vehicle Type</span>
            <span class="info-val">{{receipt()!.type}}</span>
          </div>
        </div>

        <div class="receipt-divider"></div>

        <div class="section-title"><i class="fa-solid fa-user me-2"></i>Customer Details</div>
        <div class="info-rows">
          <div class="info-row">
            <span class="info-key">Name</span>
            <span class="info-val fw-bold">{{receipt()!.userName}}</span>
          </div>
          <div class="info-row">
            <span class="info-key">Email</span>
            <span class="info-val">{{receipt()!.userEmail}}</span>
          </div>
          <div class="info-row" *ngIf="receipt()!.userMobile">
            <span class="info-key">Mobile</span>
            <span class="info-val">{{receipt()!.userMobile}}</span>
          </div>
        </div>

        <div class="receipt-divider dashed"></div>

        <div class="price-section">
          <div class="price-row-sm">
            <span>Hourly Rate</span>
            <span>₹{{receipt()!.hourRate}}/hr</span>
          </div>
          <div class="price-row-sm">
            <span>Duration</span>
            <span>× {{receipt()!.duration}} hr</span>
          </div>
          <div class="price-row-sm">
            <span>Platform Fee</span>
            <span class="text-success">Free</span>
          </div>
          <div class="price-total-row">
            <span>{{receipt()!.status === 'prebooked' ? 'Amount Payable' : 'Total Paid'}}</span>
            <span class="price-total-val">₹{{receipt()!.totalPrice}}</span>
          </div>
        </div>

        <div *ngIf="receipt()!.status === 'prebooked'" class="payment-note">
          <i class="fa-solid fa-circle-info me-2"></i>
          Payment of <strong>₹{{receipt()!.totalPrice}}</strong> is due at the parking. Please carry cash or UPI.
        </div>

        <div class="receipt-divider dashed"></div>
        <div class="receipt-footer">
          <p class="mb-1"><i class="fa-solid fa-shield-halved me-2 text-success"></i>This is your official booking confirmation.</p>
          <p class="mb-1"><i class="fa-solid fa-clock me-2 text-primary"></i>Please arrive within 30 minutes of your booked time. Booking will be <strong>automatically cancelled</strong> if you do not check in within 30 minutes.</p>
          <p class="mb-0"><i class="fa-solid fa-phone me-2 text-warning"></i>For help, contact parking owner: {{receipt()!.ownerMobile}}</p>
        </div>

        <div class="barcode-section">
          <div class="barcode-ref">{{receipt()!.bookingRef}}</div>
          <div class="barcode-bars">
            <div *ngFor="let b of barcodeBars" class="bar" [style.height.px]="b"></div>
          </div>
          <div class="barcode-label">Show this at parking entrance</div>
        </div>

      </div>

      <div class="action-btns">
        <button class="btn-print" (click)="printReceipt()" [disabled]="printing()">
          <span *ngIf="!printing()"><i class="fa-solid fa-print me-2"></i>Print Receipt</span>
          <span *ngIf="printing()"><i class="fa-solid fa-spinner fa-spin me-2"></i>Generating...</span>
        </button>
        <a routerLink="/bookings" class="btn-bookings">
          <i class="fa-solid fa-list me-2"></i>My Bookings
        </a>
        <a routerLink="/find-parking" class="btn-home">
          <i class="fa-solid fa-magnifying-glass me-2"></i>Find More
        </a>
      </div>

    </div>
  </div>
</div>
  `,
  styles: [`
    .receipt-page { background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%); min-height: 100vh; }
    .receipt-wrapper { max-width: 600px; margin: 0 auto; }

    /* Success Header */
    .receipt-header { padding: 20px 0 30px; }
    .success-icon { width: 80px; height: 80px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; box-shadow: 0 10px 30px rgba(16,185,129,0.3); }
    .success-icon i { font-size: 2.5rem; color: white; }

    /* Receipt Card */
    .receipt-card { background: white; border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); overflow: hidden; margin-bottom: 24px; }

    /* Brand Header */
    .receipt-brand { display: flex; justify-content: space-between; align-items: center; padding: 24px 28px 20px; background: linear-gradient(135deg, #0f172a, #1e293b); color: white; }
    .brand-left { display: flex; align-items: center; gap: 12px; }
    .brand-logo { font-size: 2rem; }
    .brand-name { font-size: 1.3rem; font-weight: 800; }
    .brand-sub { font-size: 0.75rem; color: rgba(255,255,255,0.5); }
    .ref-label { font-size: 0.7rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px; }
    .ref-value { font-size: 0.95rem; font-weight: 700; color: #10b981; font-family: monospace; }

    /* Dividers & Sections */
    .receipt-divider { height: 1px; background: #f1f5f9; margin: 0 28px; }
    .receipt-divider.dashed { background: none; border-top: 2px dashed #e2e8f0; }
    .status-pill { padding: 6px 20px; border-radius: 50px; font-size: 0.82rem; font-weight: 700; }
    .status-ongoing { background: #fef9c3; color: #854d0e; }
    .status-prebooked { background: #eff6ff; color: #1d4ed8; }
    .status-completed { background: #dcfce7; color: #166534; }
    .status-cancelled { background: #fee2e2; color: #991b1b; }
    .section-title { font-size: 0.78rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; padding: 16px 28px 10px; }
    .info-rows { padding: 0 28px 16px; }
    .info-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid #f8fafc; gap: 16px; }
    .info-row:last-child { border-bottom: none; }
    .info-key { font-size: 0.82rem; color: #94a3b8; font-weight: 500; flex-shrink: 0; }
    .info-val { font-size: 0.88rem; color: #1e293b; text-align: right; }

    /* Price Section */
    .price-section { padding: 16px 28px; }
    .price-row-sm { display: flex; justify-content: space-between; font-size: 0.88rem; color: #64748b; margin-bottom: 8px; }
    .price-total-row { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; padding-top: 12px; border-top: 2px solid #f1f5f9; }
    .price-total-val { font-size: 1.5rem; font-weight: 800; color: #10b981; }
    .payment-note { margin: 0 28px 16px; background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 12px; padding: 12px 16px; font-size: 0.82rem; color: #92400e; }
    .receipt-footer { padding: 16px 28px; background: #f8fafc; font-size: 0.8rem; color: #64748b; line-height: 1.8; }

    /* Barcode */
    .barcode-section { padding: 20px 28px; text-align: center; }
    .barcode-ref { font-family: monospace; font-size: 1rem; font-weight: 700; color: #1e293b; letter-spacing: 3px; margin-bottom: 8px; }
    .barcode-bars { display: flex; justify-content: center; gap: 2px; margin-bottom: 8px; }
    .bar { width: 3px; background: #1e293b; border-radius: 1px; }
    .barcode-label { font-size: 0.72rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

    /* Action Buttons */
    .action-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 50px; }
    .btn-print, .btn-bookings, .btn-home { flex: 1; min-width: 140px; padding: 14px; border-radius: 14px; font-weight: 700; font-size: 0.9rem; border: none; transition: all 0.2s; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; }
    .btn-print { background: #1e293b; color: white; cursor: pointer; }
    .btn-bookings { background: #10b981; color: white; }
    .btn-home { background: #eff6ff; color: #1d4ed8; }

    @media (max-width: 576px) {
      .action-btns { flex-direction: column; }
    }
  `]
})
export class BookingReceiptComponent implements OnInit {
  @ViewChild('receiptEl') receiptEl!: ElementRef;
  receipt = signal<any>(null);
  loading = signal(true);
  error = signal('');
  printing = signal(false);
  barcodeBars: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) {
    this.barcodeBars = Array.from({ length: 40 }, () => Math.floor(Math.random() * 20) + 20);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.error.set('Invalid booking ID'); this.loading.set(false); return; }
    this.api.getBookingReceipt(id).subscribe({
      next: (res) => { this.receipt.set(res.data); this.loading.set(false); },
      error: (err) => { this.error.set(err.error?.message || 'Receipt not found'); this.loading.set(false); }
    });
  }

  formatTime(time: string): string {
    if (!time) return '—';
    const [h, m] = time.split(':').map(Number);
    const ap = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, '0')} ${ap}`;
  }

  async printReceipt() {
    if (this.printing()) return;
    this.printing.set(true);

    try {
      const html2canvas = (await import('html2canvas')).default;
      
      // Capture the element
      const canvas = await html2canvas(this.receiptEl.nativeElement, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollY: -window.scrollY // Fixes offset if page is scrolled
      });

      const imgData = canvas.toDataURL('image/png');
      const win = window.open('', '_blank');

      if (win) {
        win.document.write(`
          <html>
            <head>
              <title>Receipt_${this.receipt()?.bookingRef}</title>
              <style>
                /* Remove all default spacing that causes blank pages */
                html, body { 
                  margin: 0 !important; 
                  padding: 0 !important; 
                  width: 100%;
                }
                body { 
                  display: flex; 
                  justify-content: center; 
                  align-items: flex-start;
                  background: #fff;
                }
                img { 
                  max-width: 100%; 
                  display: block;
                  margin: 0 auto;
                }
                @media print {
                  @page { 
                    margin: 0; 
                    size: auto; 
                  }
                  body { margin: 0; }
                  img { width: 100%; height: auto; }
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" />
              <script>
                // Ensure image is loaded before triggering print
                const img = document.querySelector('img');
                if (img.complete) {
                  window.print();
                  window.close();
                } else {
                  img.onload = () => {
                    window.print();
                    window.close();
                  };
                }
              </script>
            </body>
          </html>
        `);
        win.document.close();
      }
    } catch (err) {
      console.error('Print failed:', err);
      alert('Could not generate receipt. Please try again.');
    } finally {
      this.printing.set(false);
    }
  }
}