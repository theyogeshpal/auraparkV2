import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-parking',
  imports: [FormsModule, CommonModule],
  template: `
<style>
  .add-parking-page { background-color: #f8fafc; min-height: 100vh; padding-top: 130px; padding-bottom: 80px; }
  .badge-custom { background-color: #fef2f2; color: #AB1111; font-weight: 700; font-size: 0.85rem; letter-spacing: 1px; padding: 8px 20px; border-radius: 50px; display: inline-block; }
  .feature-item { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 25px; padding: 20px; border-radius: 16px; background: white; border: 1px solid #f1f5f9; transition: all 0.3s ease; }
  .feature-item:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.04); }
  .icon-circle { height: 50px; width: 50px; min-width: 50px; display: flex; align-items: center; justify-content: center; background: #fff5f5; color: #AB1111; border-radius: 50%; font-size: 1.25rem; transition: all 0.3s; }
  .feature-item:hover .icon-circle { background: #AB1111; color: white; }
  .form-container { background: white; border-radius: 24px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
  .form-control-custom { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 20px; font-size: 0.95rem; color: #1e293b; transition: all 0.3s; width: 100%; }
  .form-select-custom { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 20px; font-size: 0.95rem; color: #1e293b; transition: all 0.3s; cursor: pointer; width: 100%; }
  .form-control-custom:focus, .form-select-custom:focus { outline: none; border-color: #AB1111; box-shadow: 0 0 0 4px rgba(171,17,17,0.1); background: white; }
  .form-label-custom { font-weight: 700; color: #1e293b; margin-bottom: 8px; font-size: 0.9rem; display: block; }
  .req { color: #AB1111; }
  .submit-btn { background: #AB1111; color: white; border: none; border-radius: 12px; padding: 16px 30px; font-weight: 700; width: 100%; transition: all 0.3s; font-size: 1.05rem; cursor: pointer; }
  .submit-btn:hover:not(:disabled) { background: #8f0d0d; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(171,17,17,0.2); }
  .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
  .custom-checkbox { width: 22px; height: 22px; accent-color: #AB1111; cursor: pointer; }
  .sticky-sidebar { position: sticky; top: 120px; }
  .whats-app-btn { background: #25D366; color: white; border: none; font-weight: 600; padding: 12px 25px; border-radius: 50px; transition: all 0.3s; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; }
  .whats-app-btn:hover { background: #128C7E; color: white; }
</style>

<div class="add-parking-page">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-12">
        <div class="badge-custom mb-3">ADD PARKING</div>
        <h1 class="display-5 fw-bold mb-3 text-dark" style="letter-spacing:-1px">List Your <span style="color:#AB1111">Hidden Spot</span></h1>
        <p class="lead text-muted mx-auto" style="max-width:600px">Help fellow drivers by sharing private or public parking spots not yet on AuraPark.</p>
      </div>
    </div>

    <div class="row g-5">
      <div class="col-lg-5 pe-lg-4">
        <div class="sticky-sidebar">
          <h3 class="mb-4 fw-bold" style="color:#0f172a">Why host with us?</h3>
          <div *ngFor="let f of features" class="feature-item">
            <div class="icon-circle"><i class="fa-solid" [class]="f.icon"></i></div>
            <div>
              <span class="fw-bold d-block text-dark fs-5 mb-1">{{f.title}}</span>
              <p class="text-muted m-0 small">{{f.desc}}</p>
            </div>
          </div>
          <div class="mt-5 p-4 bg-white rounded-4 border">
            <p class="fw-bold text-dark mb-2">Need direct help?</p>
            <p class="text-muted small mb-3">Our onboarding team is ready to assist you over WhatsApp.</p>
            <a href="https://wa.me/7817095043" class="whats-app-btn w-100 justify-content-center">
              <i class="fa-brands fa-whatsapp fs-5"></i> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div class="col-lg-7">
        <div class="form-container">
          <h3 class="fw-bold mb-2 text-dark">Spot Details</h3>
          <p class="text-muted mb-4 pb-3 border-bottom">Fill in the mandatory details to get your spot verified.</p>

          <div *ngIf="success()" class="alert alert-success d-flex align-items-center p-3 border-0 bg-success bg-opacity-10 text-success fw-bold rounded-3 mb-4">
            <i class="fa-solid fa-circle-check fs-5 me-2"></i> {{success()}}
          </div>
          <div *ngIf="error()" class="alert alert-danger border-0 rounded-3 p-3 mb-4 small">
            <i class="fa-solid fa-circle-exclamation me-2"></i>{{error()}}
          </div>

          <form (ngSubmit)="submit()">
            <div class="row g-4">
              <div class="col-md-6">
                <label class="form-label-custom">Full Name <span class="req">*</span></label>
                <input type="text" class="form-control-custom" [(ngModel)]="form.name" name="name" placeholder="John Doe" required>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">Email <span class="req">*</span></label>
                <input type="email" class="form-control-custom" [(ngModel)]="form.email" name="email" placeholder="john@example.com" required>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">Mobile <span class="req">*</span></label>
                <input type="tel" class="form-control-custom" [(ngModel)]="form.mobile" name="mobile" placeholder="9876543210" required>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">Parking Name</label>
                <input type="text" class="form-control-custom" [(ngModel)]="form.parkingName" name="parkingName" placeholder="City Central Parking">
              </div>
              <div class="col-12">
                <label class="form-label-custom">Full Address <span class="req">*</span></label>
                <input type="text" class="form-control-custom" [(ngModel)]="form.address" name="address" placeholder="House/Flat No., Building Name, Street" required>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">City <span class="req">*</span></label>
                <input type="text" class="form-control-custom" [(ngModel)]="form.city" name="city" placeholder="e.g. Mumbai" required>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">State <span class="req">*</span></label>
                <select class="form-select-custom" [(ngModel)]="form.state" name="state" required>
                  <option value="">Select State</option>
                  <option *ngFor="let s of states">{{s}}</option>
                </select>
              </div>
              <div class="col-12">
                <label class="form-label-custom">Google Map Link <span class="req">*</span></label>
                <input type="url" class="form-control-custom" [(ngModel)]="form.map" name="map" placeholder="Paste Google Maps URL here" required>
              </div>

              <div class="col-12 mt-2"><h5 class="fw-bold text-dark border-bottom pb-2">Space Details</h5></div>

              <div class="col-md-6">
                <label class="form-label-custom">Vehicle Type</label>
                <select class="form-select-custom" [(ngModel)]="form.type" name="type" (change)="onTypeChange()">
                  <option value="Both">Both (Car & Bike)</option>
                  <option value="Bike">Bike Only</option>
                  <option value="Car">Car Only</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">Capacity Spots</label>
                <div class="d-flex gap-2">
                  <input type="text" class="form-control-custom" [(ngModel)]="form.carSpace" name="carSpace" placeholder="🚗 Cars" [disabled]="form.type==='Bike'">
                  <input type="text" class="form-control-custom" [(ngModel)]="form.bikeSpace" name="bikeSpace" placeholder="🏍️ Bikes" [disabled]="form.type==='Car'">
                </div>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">Hourly Rate (₹) <span class="req">*</span></label>
                <input type="text" class="form-control-custom" [(ngModel)]="form.hourRate" name="hourRate" placeholder="e.g. 20" required>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">Operating Hours <span class="req">*</span></label>
                <input type="text" class="form-control-custom" [(ngModel)]="form.operatingHours" name="operatingHours" placeholder="e.g. 8AM - 10PM" required>
              </div>

              <div class="col-12 mt-2"><h5 class="fw-bold text-dark border-bottom pb-2">Amenities</h5></div>
              <div class="col-12">
                <div class="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded-3 border">
                  <div><span class="fw-bold text-dark d-block">Covered Parking</span><small class="text-muted">Protection from direct sun and rain.</small></div>
                  <input type="checkbox" class="custom-checkbox" [(ngModel)]="form.covered" name="covered">
                </div>
                <div class="d-flex justify-content-between align-items-center p-3 bg-light rounded-3 border">
                  <div><span class="fw-bold text-dark d-block">EV Charging Available</span><small class="text-muted">Spot has electric vehicle charging ports.</small></div>
                  <input type="checkbox" class="custom-checkbox" [(ngModel)]="form.evCharging" name="evCharging">
                </div>
              </div>

              <div class="col-12 mt-2">
                <button type="submit" class="submit-btn shadow-sm" [disabled]="loading()">
                  <span *ngIf="!loading()">SUBMIT LISTING <i class="fa-solid fa-arrow-right ms-2"></i></span>
                  <span *ngIf="loading()"><i class="fa-solid fa-spinner fa-spin me-2"></i>Submitting...</span>
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
export class AddParkingComponent {
  loading = signal(false);
  success = signal('');
  error = signal('');

  form = { name: '', email: '', mobile: '', parkingName: '', address: '', city: '', state: '', map: '', type: 'Both', carSpace: '', bikeSpace: '', hourRate: '', operatingHours: '', covered: false, evCharging: false };

  features = [
    { icon: 'fa-person', title: 'Trusted Community', desc: 'Trusted by 1000+ Happy Owners.' },
    { icon: 'fa-user-shield', title: 'Verified Users Only', desc: 'Identity-verified for your peace of mind.' },
    { icon: 'fa-calendar-check', title: 'Flexible Scheduling', desc: 'List hourly, daily, or monthly.' },
    { icon: 'fa-chart-line', title: 'Smart Pricing Engine', desc: 'AI suggests the best rates for you.' },
    { icon: 'fa-bolt', title: 'Instant Setup', desc: 'Go live in under 5 minutes.' },
  ];

  states = ['Andhra Pradesh', 'Bihar', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

  constructor(private api: ApiService) {}

  onTypeChange() {
    if (this.form.type === 'Bike') this.form.carSpace = 'N/A';
    else if (this.form.type === 'Car') this.form.bikeSpace = 'N/A';
    else { this.form.carSpace = ''; this.form.bikeSpace = ''; }
  }

  submit() {
    this.success.set(''); this.error.set('');
    this.loading.set(true);
    this.api.submitParkingRequest(this.form).subscribe({
      next: (res) => {
        this.form = { name: '', email: '', mobile: '', parkingName: '', address: '', city: '', state: '', map: '', type: 'Both', carSpace: '', bikeSpace: '', hourRate: '', operatingHours: '', covered: false, evCharging: false };
        this.loading.set(false);
        (window as any).Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: res.message || 'Spot submitted for review!', showConfirmButton: false, timer: 3500 });
      },
      error: (err) => { this.error.set(err.error?.message || 'Submission failed. Please try again.'); this.loading.set(false); }
    });
  }
}
