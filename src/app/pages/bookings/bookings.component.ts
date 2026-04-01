import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Booking {
  id: number;
  type: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  image: string;
  status: 'ongoing' | 'completed' | 'cancelled';
}

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bookings-page pt-5">
      <!-- Header -->
      <div class="header">
        <a routerLink="/profile" class="back-btn">
          <i class="fa-solid fa-arrow-left"></i>
        </a>
        <h1 class="page-title">Booking</h1>
        <div style="width: 40px;"></div> <!-- spacer -->
      </div>

      <!-- Tabs -->
      <div class="tabs-container">
        <div class="tabs">
          <button 
            class="tab-btn" 
            [class.active]="activeTab() === 'ongoing'"
            (click)="activeTab.set('ongoing')"
          >
            Ongoing
          </button>
          <button 
            class="tab-btn" 
            [class.active]="activeTab() === 'completed'"
            (click)="activeTab.set('completed')"
          >
            Completed
          </button>
          <button 
            class="tab-btn" 
            [class.active]="activeTab() === 'cancelled'"
            (click)="activeTab.set('cancelled')"
          >
            Cancelled
          </button>
        </div>
      </div>

      <!-- Booking List -->
      <div class="booking-list">
        <div *ngIf="filteredBookings().length === 0" class="no-bookings">
          <p>No {{ activeTab() }} bookings found.</p>
        </div>

        <div class="booking-card" *ngFor="let booking of filteredBookings()">
          
          <div class="card-top">
            <div class="image-wrapper">
              <img [src]="booking.image" [alt]="booking.title">
            </div>
            
            <div class="card-info">
              <div class="info-header">
                <span class="parking-type">{{ booking.type }}</span>
                <div class="rating">
                  <i class="fa-solid fa-star"></i>
                  <span>{{ booking.rating }}</span>
                </div>
              </div>
              
              <h3 class="title">{{ booking.title }}</h3>
              
              <div class="location">
                <i class="fa-solid fa-location-dot"></i>
                <span>{{ booking.location }}</span>
              </div>
              
              <div class="price">
                <span class="amount">{{ booking.price }}</span>
                <span class="unit">/hr</span>
              </div>
            </div>
          </div>
          
          <div class="card-actions" *ngIf="booking.status === 'ongoing'">
            <button class="btn-cancel">Cancel</button>
          </div>
          
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bookings-page {
      background-color: #f1f5f9;
      min-height: 100vh;
      padding-bottom: 90px;
      font-family: "Inter", sans-serif;
    }

    /* Header */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      padding-top: max(16px, env(safe-area-inset-top));
      background-color: transparent;
    }

    .back-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      text-decoration: none;
      box-shadow: 0 2px 10px rgba(0,0,0,0.03);
    }
    
    .back-btn:hover {
      color: #111827;
      background: #f8fafc;
    }

    .page-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #111827;
      margin: 0;
    }

    /* Tabs */
    .tabs-container {
      padding: 5px 20px 20px;
    }

    .tabs {
      display: flex;
      background: white;
      border-radius: 30px;
      padding: 6px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03);
    }

    .tab-btn {
      flex: 1;
      border: none;
      background: transparent;
      padding: 12px 0;
      font-size: 0.9rem;
      font-weight: 600;
      color: #6b7280;
      border-radius: 24px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .tab-btn.active {
      background: #10b981;
      color: white;
      box-shadow: 0 4px 10px rgba(16, 185, 129, 0.25);
    }

    /* List */
    .booking-list {
      padding: 0 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .no-bookings {
      text-align: center;
      color: #6b7280;
      padding: 40px 0;
      font-weight: 500;
      background: white;
      border-radius: 20px;
    }

    .booking-card {
      background: white;
      border-radius: 24px;
      padding: 18px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.04);
    }

    .card-top {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
    }

    .image-wrapper {
      width: 100px;
      height: 100px;
      border-radius: 16px;
      overflow: hidden;
      flex-shrink: 0;
      background: #f3f4f6;
    }

    .image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .info-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }

    .parking-type {
      font-size: 0.7rem;
      font-weight: 700;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.8rem;
      font-weight: 700;
      color: #374151;
    }

    .rating i {
      color: #eab308;
      font-size: 0.85rem;
    }

    .title {
      font-size: 1.05rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 6px 0;
    }

    .location {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8rem;
      color: #6b7280;
      margin-bottom: 8px;
    }

    .location i {
      font-size: 0.85rem;
      color: #9ca3af;
    }

    .price {
      display: flex;
      align-items: baseline;
      gap: 2px;
    }

    .amount {
      font-size: 1.1rem;
      font-weight: 700;
      color: #10b981;
    }

    .unit {
      font-size: 0.85rem;
      font-weight: 600;
      color: #111827;
    }

    .card-actions {
      display: flex;
      gap: 12px;
    }

    .btn-cancel {
      flex: 1;
      padding: 14px 0;
      border: none;
      background: #ef4444;
      color: white;
      font-weight: 700;
      font-size: 0.95rem;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
    }

    .btn-cancel:hover {
      background: #dc2626;
      box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
    }

    .btn-primary {
      flex: 1;
      padding: 14px 0;
      border: none;
      background: #10b981;
      color: white;
      font-weight: 700;
      font-size: 0.95rem;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
    }

    .btn-primary:hover {
      background: #059669;
      box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
    }

    /* Desktop Adjustments */
    @media (min-width: 768px) {
      .header, .tabs-container {
        max-width: 900px;
        margin: 0 auto;
      }
      
      .header {
        padding: 24px 20px;
        margin-top: 60px; /* Leave space for main navbar */
      }

      .page-title {
        font-size: 1.5rem;
      }

      .tabs {
        max-width: 500px;
        margin: 0 auto;
      }

      .booking-list {
        max-width: 900px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 24px;
        padding: 10px 20px 40px;
      }
      
      .no-bookings {
        grid-column: 1 / -1;
      }
    }
  `]
})
export class BookingsComponent {
  activeTab = signal<'ongoing' | 'completed' | 'cancelled'>('cancelled');

  // Dummy data matching the provided image
  allBookings: Booking[] = [
    {
      id: 1,
      type: 'CAR PARKING',
      title: 'MetroPark master',
      location: 'New York, USA',
      price: '$5.00',
      rating: 4.5,
      image: '/Assets/images/explore1.jpg',
      status: 'cancelled'
    },
    {
      id: 2,
      type: 'CAR PARKING',
      title: 'Premier parking',
      location: 'New York, USA',
      price: '$5.00',
      rating: 4.5,
      image: '/Assets/images/explore2.jpg',
      status: 'cancelled'
    },
    {
      id: 3,
      type: 'CAR PARKING',
      title: 'DriveGuard solutions',
      location: 'New York, USA',
      price: '$5.00',
      rating: 4.5,
      image: '/Assets/images/explore3.jpg',
      status: 'cancelled'
    },
    {
      id: 4,
      type: 'CAR PARKING',
      title: 'City Center Hub',
      location: 'New York, USA',
      price: '$6.50',
      rating: 4.8,
      image: '/Assets/images/explore4.jpg',
      status: 'ongoing'
    },
    {
      id: 5,
      type: 'CAR PARKING',
      title: 'Airport Long-Term',
      location: 'New York, USA',
      price: '$3.00',
      rating: 4.2,
      image: '/Assets/images/explore1.jpg',
      status: 'completed'
    }
  ];

  filteredBookings() {
    return this.allBookings.filter(b => b.status === this.activeTab());
  }
}
