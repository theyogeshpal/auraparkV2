import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'find-parking', loadComponent: () => import('./pages/find-parking/find-parking.component').then(m => m.FindParkingComponent) },
  { path: 'add-parking', loadComponent: () => import('./pages/add-parking/add-parking.component').then(m => m.AddParkingComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
  { path: '**', redirectTo: '' }
];
