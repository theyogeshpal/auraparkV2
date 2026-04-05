import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'find-parking', loadComponent: () => import('./pages/find-parking/find-parking.component').then(m => m.FindParkingComponent) },
  { path: 'add-parking', loadComponent: () => import('./pages/add-parking/add-parking.component').then(m => m.AddParkingComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'terms', loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent) },
  { path: 'privacy', loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  // Protected routes
  { path: 'profile', canActivate: [authGuard], loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'bookings', canActivate: [authGuard], loadComponent: () => import('./pages/bookings/bookings.component').then(m => m.BookingsComponent) },
  { path: 'notifications', canActivate: [authGuard], loadComponent: () => import('./pages/notifications/notifications.component').then(m => m.NotificationsComponent) },
  { path: 'parking-booking', canActivate: [authGuard], loadComponent: () => import('./pages/parking-booking/parking-booking.component').then(m => m.ParkingBookingComponent) },
  { path: 'booking-receipt/:id', canActivate: [authGuard], loadComponent: () => import('./pages/booking-receipt/booking-receipt.component').then(m => m.BookingReceiptComponent) },
  { path: '**', redirectTo: '' }
];
