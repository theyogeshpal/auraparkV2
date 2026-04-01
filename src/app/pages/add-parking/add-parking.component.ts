import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-parking',
  imports: [FormsModule, CommonModule],
  template: `
<style>
  .add-parking-page { background-color: #f8fafc; min-height: 100vh; padding-top: 130px; padding-bottom: 80px; }
  .badge-custom { background-color: #fef2f2; color: #AB1111; font-weight: 700; font-size: 0.85rem; letter-spacing: 1px; padding: 8px 20px; border-radius: 50px; display: inline-block; }
  .feature-item { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 25px; padding: 20px; border-radius: 16px; background: white; border: 1px solid #f1f5f9; transition: all 0.3s ease; }
  .feature-item:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.04); border-color: #e2e8f0; }
  .icon-circle { height: 50px; width: 50px; min-width: 50px; display: flex; align-items: center; justify-content: center; background: #fff5f5; color: #AB1111; border-radius: 50%; font-size: 1.25rem; transition: all 0.3s; }
  .feature-item:hover .icon-circle { background: #AB1111; color: white; }
  .form-container { background: white; border-radius: 24px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
  .form-control-custom { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 20px; font-size: 0.95rem; color: #1e293b; transition: all 0.3s; }
  .form-select-custom { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 20px; font-size: 0.95rem; color: #1e293b; transition: all 0.3s; cursor: pointer; }
  .form-control-custom:focus, .form-select-custom:focus { outline: none; border-color: #AB1111; box-shadow: 0 0 0 4px rgba(171,17,17,0.1); background: white; }
  .form-label-custom { font-weight: 700; color: #1e293b; margin-bottom: 8px; font-size: 0.9rem; }
  .req { color: #AB1111; }
  .submit-btn { background: #AB1111; color: white; border: none; border-radius: 12px; padding: 16px 30px; font-weight: 700; width: 100%; transition: all 0.3s; font-size: 1.05rem; }
  .submit-btn:hover { background: #8f0d0d; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(171,17,17,0.2); color: white; }
  .custom-checkbox { width: 22px; height: 22px; accent-color: #AB1111; cursor: pointer; }
  .step-card { padding: 30px 20px; text-align: center; border-radius: 20px; background: white; height: 100%; box-shadow: 0 4px 15px rgba(0,0,0,0.02); border: 1px solid #f1f5f9; transition: all 0.3s; position: relative; overflow: hidden; }
  .step-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.05); border-color: #e2e8f0; }
  .step-icon { width: 60px; height: 60px; background: #fff5f5; color: #AB1111; display: inline-flex; justify-content: center; align-items: center; border-radius: 50%; margin-bottom: 15px; font-size: 1.5rem; transition: 0.3s; }
  .step-card:hover .step-icon { background: #AB1111; color: white; transform: scale(1.1); }
  .whats-app-btn { background: #25D366; color: white; border: none; font-weight: 600; padding: 12px 25px; border-radius: 50px; transition: all 0.3s; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; }
  .whats-app-btn:hover { background: #128C7E; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3); color: white; }
  
  /* Layout adjustments for features side */
  .sticky-sidebar { position: sticky; top: 120px; }
</style>

<div class="add-parking-page">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-12">
        <div class="badge-custom mb-3">ADD PARKING</div>
        <h1 class="display-5 fw-bold mb-3 text-dark" style="letter-spacing: -1px;">List Your <span style="color:#AB1111;">Hidden Spot</span></h1>
        <p class="lead text-muted mx-auto" style="max-width: 600px;">Help fellow drivers by sharing private or public parking spots not yet on AuraPark, and start earning today.</p>
      </div>
    </div>

    <div class="row g-5">
      <div class="col-lg-5 pe-lg-4">
        <div class="sticky-sidebar">
          <h3 class="mb-4 fw-bold" style="color: #0f172a;">Why host with us?</h3>
          <div *ngFor="let f of features" class="feature-item">
            <div class="icon-circle"><i class="fa-solid" [class]="f.icon"></i></div>
            <div>
              <span class="fw-bold d-block text-dark fs-5 mb-1">{{f.title}}</span>
              <p class="text-muted m-0 small" style="line-height: 1.5;">{{f.desc}}</p>
            </div>
          </div>
          
          <div class="mt-5 p-4 bg-white rounded-4 border" style="border-color: #f1f5f9 !important;">
            <p class="fw-bold text-dark mb-2">Need direct help?</p>
            <p class="text-muted small mb-3">Our onboarding team is ready to assist you setup your listing instantly over WhatsApp.</p>
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

          <form (ngSubmit)="submit()">
            <div class="row g-4">
              <div class="col-md-6">
                <label class="form-label-custom">Full Name <span class="req">*</span></label>
                <input type="text" class="form-control form-control-custom w-100" [(ngModel)]="form.name" name="name" placeholder="John Doe" required>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">Email <span class="req">*</span></label>
                <input type="email" class="form-control form-control-custom w-100" [(ngModel)]="form.email" name="email" placeholder="john@example.com" required>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">Mobile <span class="req">*</span></label>
                <input type="number" class="form-control form-control-custom w-100" [(ngModel)]="form.mobile" name="mobile" placeholder="9876543210" required>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">Parking Name</label>
                <input type="text" class="form-control form-control-custom w-100" [(ngModel)]="form.parkingName" name="parkingName" placeholder="City Central Parking">
              </div>
              <div class="col-12">
                <label class="form-label-custom">Full Address <span class="req">*</span></label>
                <input type="text" class="form-control form-control-custom w-100" [(ngModel)]="form.address" name="address" placeholder="House/Flat No., Building Name, Street" required>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">City <span class="req">*</span></label>
                <input type="text" class="form-control form-control-custom w-100" [(ngModel)]="form.city" name="city" placeholder="e.g. Mumbai" required>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">State <span class="req">*</span></label>
                <select class="form-select form-select-custom w-100" [(ngModel)]="form.state" name="state" required>
                  <option value="">Select State</option>
                  <option *ngFor="let s of states">{{s}}</option>
                </select>
              </div>
              <div class="col-12">
                <label class="form-label-custom">Google Map Link <span class="req">*</span></label>
                <input type="url" class="form-control form-control-custom w-100" [(ngModel)]="form.map" name="map" placeholder="Paste Google Maps URL here" required>
              </div>
              
              <div class="col-12 mt-4"><h5 class="fw-bold text-dark border-bottom pb-2">Space Details</h5></div>
              
              <div class="col-md-6">
                <label class="form-label-custom">Vehicle Type</label>
                <select class="form-select form-select-custom w-100" [(ngModel)]="form.type" name="type" (change)="onTypeChange()">
                  <option value="Both">Both (Car & Bike)</option>
                  <option value="Bike">Bike Only</option>
                  <option value="Car">Car Only</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">Capacity Spots</label>
                <div class="d-flex gap-2">
                  <input type="text" class="form-control form-control-custom w-50" [(ngModel)]="form.carSpace" name="carSpace" placeholder="🚗 Cars" [disabled]="form.type==='Bike'">
                  <input type="text" class="form-control form-control-custom w-50" [(ngModel)]="form.bikeSpace" name="bikeSpace" placeholder="🏍️ Bikes" [disabled]="form.type==='Car'">
                </div>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">Hourly Rate (₹) <span class="req">*</span></label>
                <input type="text" class="form-control form-control-custom w-100" [(ngModel)]="form.hourRate" name="hourRate" placeholder="e.g. 20" required>
              </div>
              <div class="col-md-6">
                <label class="form-label-custom">Operating Hours <span class="req">*</span></label>
                <input type="text" class="form-control form-control-custom w-100" [(ngModel)]="form.operatingHours" name="operatingHours" placeholder="e.g. 8AM - 10PM" required>
              </div>
              
              <div class="col-12 mt-4"><h5 class="fw-bold text-dark border-bottom pb-2">Amenities</h5></div>

              <div class="col-12">
                <div class="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded-3 border">
                  <div>
                    <span class="fw-bold text-dark d-block">Covered Parking</span>
                    <small class="text-muted">Protection from direct sun and rain.</small>
                  </div>
                  <input type="checkbox" class="custom-checkbox" [(ngModel)]="form.covered" name="covered">
                </div>
                <div class="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded-3 border">
                  <div>
                    <span class="fw-bold text-dark d-block">EV Charging Available</span>
                    <small class="text-muted">Spot has electric vehicle charging ports.</small>
                  </div>
                  <input type="checkbox" class="custom-checkbox" [(ngModel)]="form.evCharging" name="evCharging">
                </div>
              </div>
              
              <div class="col-12 mt-4">
                <div *ngIf="submitted" class="alert alert-success d-flex align-items-center p-3 border-0 bg-success bg-opacity-10 text-success fw-bold rounded-3 mb-4">
                  <i class="fa-solid fa-circle-check fs-5 me-2"></i> Your spot has been submitted for review! We will contact you shortly.
                </div>
                <button type="submit" class="submit-btn shadow-sm">
                  SUBMIT LISTING <i class="fa-solid fa-arrow-right ms-2"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- What's Next -->
    <div class="row mt-5 pt-5 text-center px-lg-0 px-3">
      <div class="col-12 mb-5">
        <h2 class="display-6 fw-bold text-dark" style="letter-spacing: -1px;">How it works</h2>
      </div>
      
      <div class="col-lg-3 col-md-6 mb-4">
        <div class="step-card">
          <div class="step-icon"><i class="fa-solid fa-list-ul"></i></div>
          <h5 class="fw-bold mb-2">1. List your spot</h5>
          <p class="text-muted small m-0">Fill out details about your space, price, and schedule.</p>
        </div>
      </div>
      
      <div class="col-lg-3 col-md-6 mb-4">
        <div class="step-card">
          <div class="step-icon"><i class="fa-solid fa-magnifying-glass-location"></i></div>
          <h5 class="fw-bold mb-2">2. Get Discovered</h5>
          <p class="text-muted small m-0">Your spot is instantly visible to thousands of drivers.</p>
        </div>
      </div>
      
      <div class="col-lg-3 col-md-6 mb-4">
        <div class="step-card">
          <div class="step-icon"><i class="fa-solid fa-indian-rupee-sign"></i></div>
          <h5 class="fw-bold mb-2">3. Earn Securely</h5>
          <p class="text-muted small m-0">Receive driver payments directly to your bank account.</p>
        </div>
      </div>
      
      <div class="col-lg-3 col-md-6 mb-4">
        <div class="step-card">
          <div class="step-icon"><i class="fa-solid fa-face-smile"></i></div>
          <h5 class="fw-bold mb-2">4. Relax & Grow</h5>
          <p class="text-muted small m-0">We handle the support while you maximize your earnings.</p>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: []
})
export class AddParkingComponent {
  submitted = false;
  form = { name:'', email:'', mobile:'', parkingName:'', address:'', city:'', state:'', map:'', type:'Both', carSpace:'', bikeSpace:'', hourRate:'', operatingHours:'', covered:false, evCharging:false };

  features = [
    { icon: 'fa-person', title: 'Trusted Community', desc: 'Trusted by 1000+ Happy Owners.' },
    { icon: 'fa-user-shield', title: 'Verified Users Only', desc: 'Identity-verified for your peace of mind.' },
    { icon: 'fa-calendar-check', title: 'Flexible Scheduling', desc: 'List hourly, daily, or monthly.' },
    { icon: 'fa-chart-line', title: 'Smart Pricing Engine', desc: 'AI suggests the best rates for you.' },
    { icon: 'fa-bolt', title: 'Instant Setup', desc: 'Go live in under 5 minutes.' },
  ];

  states = ['Andhra Pradesh','Bihar','Delhi','Goa','Gujarat','Haryana','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','Uttarakhand','West Bengal'];

  onTypeChange() {
    if (this.form.type === 'Bike') this.form.carSpace = 'N/A';
    else if (this.form.type === 'Car') this.form.bikeSpace = 'N/A';
    else { this.form.carSpace = ''; this.form.bikeSpace = ''; }
  }

  submit() {
    this.submitted = true;
    setTimeout(() => this.submitted = false, 4000);
  }
}
