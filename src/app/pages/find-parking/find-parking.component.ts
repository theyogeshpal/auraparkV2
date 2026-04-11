import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-find-parking',
  imports: [CommonModule, FormsModule],
  template: `
<style>
  #header { background-color: #000 !important; }
  .parking-data { height: calc(100vh - 70px); overflow: hidden; margin-top: 60px !important; }
  .search-box-container { background: white; padding: 15px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin-bottom: 20px; }
  .search-input-group { position: relative; display: flex; gap: 10px; }
  .search-input-group input { border: 2px solid #edf2f7; padding: 12px 12px 12px 45px; border-radius: 12px; transition: all 0.3s; }
  .search-input-group input:focus { border-color: #006aff; box-shadow: 0 0 0 3px rgba(0,106,255,0.1); outline: none; }
  .mag-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #a0aec0; font-size: 18px; }
  .parking-card { background: white; border: none !important; border-radius: 16px !important; padding: 20px !important; margin-bottom: 20px; transition: all 0.3s; cursor: pointer; }
  .parking-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.12); }
  .card-title { font-weight: 700; color: #1a202c; font-size: 1.1rem; margin-bottom: 8px; }
  .info-row { width: 100%; display: flex; align-items: flex-start; gap: 10px; margin-bottom: 6px; color: #4a5568; font-size: 0.9rem; }
  .info-row i { color: #006aff; margin-top: 3px; }
  .price-badge { background: rgba(46,204,113,0.1); color: #2ecc71; padding: 6px 12px; border-radius: 8px; font-weight: 700; display: inline-block; }
  .n-map { border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); height: 100%; }
  #parkingscontainer { overflow-x: hidden; overflow-y: auto; }
  @media(max-width:768px) { .parking-data { height: auto; overflow: visible; } .n-map { height: 300px; margin-top: 20px; } }
</style>

<div class="row px-lg-5 px-3 parking-data" style="padding-top: 60px;">
  <div class="col-lg-5 col-md-6 h-100 d-flex flex-column py-3">
    <div class="search-box-container">
      <div class="search-input-group">
        <i class="fa-solid fa-magnifying-glass mag-icon"></i>
        <input type="text" [(ngModel)]="searchCity" (input)="onSearch()" placeholder="Where do you want to park?" class="form-control">
      </div>
    </div>

    <div id="parkingscontainer">
      <div *ngIf="loading" class="d-flex flex-column justify-content-center align-items-center py-5">
        <div class="spinner-border text-primary mb-3" role="status"></div>
        <p class="text-muted small">Loading parkings, please wait...</p>
      </div>

      <div *ngIf="!loading">
        <div *ngIf="filtered.length === 0" class="text-center py-5 text-muted">
          <img src="/Assets/images/no_data_found.png" class="img-fluid mb-3" style="max-width:200px">
          <h5>No parking spots found</h5>
        </div>

        <div *ngFor="let row of filtered" class="parking-card shadow-sm d-flex" (click)="bookParking(row)">
          <div class="w-100">
            <div class="d-flex w-100 justify-content-between align-items-start">
              <h5 class="card-title">{{row.parkingname}}</h5>
              <span class="badge rounded-pill" [class.bg-warning]="row.type==='Bike'" [class.bg-primary]="row.type==='Car'" [class.bg-info]="row.type==='Both'">{{row.type}}</span>
            </div>
            <div class="info-row"><i class="fa-solid fa-location-dot"></i><span>{{row.address}}, {{row.city}}</span></div>
            <div class="info-row"><i class="fa-solid fa-phone"></i><span>{{row.mobile}}</span></div>
            <div class="mt-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div class="price-badge">₹{{row.hourrate}} /hr</div>
              <a [href]="row.map" target="_blank" (click)="$event.stopPropagation()" class="btn btn-sm btn-outline-primary rounded-pill px-3">
                <i class="fa-solid fa-route me-1"></i> Directions
              </a>
            </div>
          </div>
          <div class="ms-3 d-none d-sm-flex align-items-center justify-content-center" style="width:100px;">
            <img [src]="row.type==='Bike' ? bikeImg : row.type==='Car' ? carImg : bothImg" style="max-width:100px;filter:drop-shadow(0 5px 15px rgba(0,0,0,0.1));">
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-lg-7 col-md-6 py-3 d-none d-md-block">
    <div class="n-map">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227821.98710530254!2d80.77769949830774!3d26.848902829067065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1775041687024!5m2!1sen!2sin" class="w-100 h-100" style="border:0;" allowfullscreen="" loading="eager"></iframe>
    </div>
  </div>
</div>
  `,
  styles: []
})
export class FindParkingComponent implements OnInit {
  searchCity = '';
  loading = true;
  bikeImg = '/Assets/images/hf-delux.png';
  carImg = '/Assets/images/Honda-car-image.png';
  bothImg = '/Assets/images/car-scooty-ezgif.com-crop.gif';
  parkings: any[] = [];
  filtered: any[] = [];

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['q']) { this.searchCity = params['q']; }
      this.loadParkings();
    });
  }

  loadParkings() {
    this.loading = true;
    // Retry up to 3 times for Render cold start
    this.tryLoad(0);
  }

  private tryLoad(attempt: number) {
    this.api.getParkings({}).subscribe({
      next: (res) => {
        this.parkings = res.data || [];
        this.filtered = this.searchCity
          ? this.parkings.filter(p => p.city.toLowerCase().includes(this.searchCity.toLowerCase()) || p.parkingname.toLowerCase().includes(this.searchCity.toLowerCase()))
          : [...this.parkings];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        if (attempt < 2) {
          setTimeout(() => this.tryLoad(attempt + 1), 3000);
        } else {
          this.loading = false;
          this.cdr.detectChanges();
        }
      }
    });
  }

  onSearch() {
    const q = this.searchCity.toLowerCase();
    if (!q) { this.filtered = [...this.parkings]; return; }
    this.filtered = this.parkings.filter(p =>
      p.city.toLowerCase().includes(q) ||
      p.parkingname.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q)
    );
  }

  bookParking(parking: any) {
    this.router.navigate(['/parking-booking'], { queryParams: { name: parking.parkingname, address: parking.address, rate: parking.hourrate, type: parking.type, id: parking._id } });
  }
}
