import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
const BASE = isLocal ? 'http://localhost:5000/api' : 'https://aurapark-backend.onrender.com/api';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private get headers() { return { headers: this.auth.authHeaders() }; }

  // ── Parkings ──────────────────────────────────────────
  getParkings(query?: { city?: string; q?: string; type?: string }) {
    let params = new HttpParams();
    if (query?.city) params = params.set('city', query.city);
    if (query?.q) params = params.set('q', query.q);
    if (query?.type) params = params.set('type', query.type);
    return this.http.get<any>(`${BASE}/parkings`, { params });
  }

  getParkingById(id: number) {
    return this.http.get<any>(`${BASE}/parkings/${id}`);
  }

  submitParkingRequest(data: FormData | any) {
    return this.http.post<any>(`${BASE}/parkings/request`, data);
  }

  // ── Bookings ──────────────────────────────────────────
  getMyBookings(status?: string) {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<any>(`${BASE}/bookings`, { ...this.headers, params });
  }

  createBooking(data: { parkingId: string; date: string; time: string; duration: number; vehicleNumber?: string; vehicleType?: string }) {
    return this.http.post<any>(`${BASE}/bookings`, data, this.headers);
  }

  getBookingReceipt(id: string) {
    return this.http.get<any>(`${BASE}/bookings/${id}/receipt`, this.headers);
  }

  cancelBooking(id: string, reason: string) {
    return this.http.put<any>(`${BASE}/bookings/${id}/cancel`, { reason }, this.headers);
  }

  // ── Contact ───────────────────────────────────────────
  submitContact(data: { name: string; email: string; mobile?: string; message: string }) {
    return this.http.post<any>(`${BASE}/contact`, data);
  }

  // ── Notifications ─────────────────────────────────────
  getNotifications() {
    return this.http.get<any>(`${BASE}/notifications/user`, this.headers);
  }

  markNotificationRead(id: string) {
    return this.http.put<any>(`${BASE}/notifications/user/${id}/read`, {}, this.headers);
  }

  markAllNotificationsRead() {
    return this.http.put<any>(`${BASE}/notifications/user/read-all`, {}, this.headers);
  }

  getFaqs() {
    return this.http.get<any>(`${BASE}/faqs`);
  }
}
