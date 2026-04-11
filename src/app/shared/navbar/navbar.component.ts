import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
<div id="header" class="container-fluid fixed-top" [class.scrolled]="scrolled || !isHome">
  <div class="row">
    <div class="col-sm-4 d-flex align-items-center main-nav">
      <div class="logo p-0 m-0">
        <img src="/Assets/images/AuraPark-logo (2).png" style="height: 80px" alt="AuraPark">
      </div>
    </div>
    <div class="col-sm-8 px-5 d-flex align-items-center justify-content-between">
      <ul class="border-0 gap-5 nav-tabs">
        <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a></li>
        <li><a routerLink="/find-parking" routerLinkActive="active">Find Parking</a></li>
        <li><a routerLink="/add-parking" routerLinkActive="active">Add Parking</a></li>
        <li><a routerLink="/bookings" routerLinkActive="active">Bookings</a></li>
        <li><a routerLink="/about" routerLinkActive="active">About Us</a></li>
        <li><a routerLink="/contact" routerLinkActive="active">Contact Us</a></li>
        <li>
          <a (click)="goToProfile()" class="profile-nav-btn px-3 py-2 rounded-pill" [class.active]="isProfileActive()" style="cursor:pointer">
            <i class="fa-solid fa-circle-user me-1"></i>
            {{auth.isLoggedIn() ? (auth.currentUser()?.name?.split(' ')?.[0] ?? 'Profile') : 'Profile'}}
          </a>
        </li>
        <li *ngIf="auth.isLoggedIn()">
          <a routerLink="/notifications" class="notif-nav-btn position-relative" style="cursor:pointer">
            <i class="fa-solid fa-bell"></i>
            <span class="notif-count" *ngIf="unreadCount > 0">{{unreadCount}}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="bottom-nav d-flex d-md-none justify-content-around">
  <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="bottom-nav-link">
    <i class="fa-solid fa-house"></i><span>Home</span>
  </a>
  <a routerLink="/find-parking" routerLinkActive="active" class="bottom-nav-link">
    <i class="fa-solid fa-square-parking"></i><span>Park</span>
  </a>
  <a routerLink="/add-parking" routerLinkActive="active" class="bottom-nav-link">
    <span class="p-icon">P+</span><span>Add</span>
  </a>
  <a routerLink="/bookings" routerLinkActive="active" class="bottom-nav-link">
    <i class="fa-solid fa-book-bookmark"></i><span>Bookings</span>
  </a>
  <a routerLink="/notifications" routerLinkActive="active" class="bottom-nav-link position-relative" *ngIf="auth.isLoggedIn()">
    <i class="fa-solid fa-bell"></i>
    <span class="bottom-notif-dot" *ngIf="unreadCount > 0">{{unreadCount}}</span>
    <span>Alerts</span>
  </a>
  <a (click)="goToProfile()" routerLinkActive="active" class="bottom-nav-link" style="cursor:pointer">
    <i class="fa-solid fa-circle-user"></i><span>Profile</span>
  </a>
</div>
  `,
  styles: [`
    #header { transition: background-color 0.2s ease; background-color: transparent; }
    #header.scrolled { background-color: black; }
    .main-nav { background-color: transparent; }
    .nav-tabs { margin: 0; width: 100%; display: flex; justify-content: flex-end; align-items: center; gap: 8px; font-size: 14px; list-style: none; border: none; padding-right: 8px; white-space: nowrap; flex-wrap: nowrap; }
    .nav-tabs > li > a { text-decoration: none; color: white; opacity: 0.6; }
    .nav-tabs > li > a:hover, .nav-tabs > li > a.active { opacity: 1 !important; color: white; }
    .notif-nav-btn { color: white; opacity: 0.6; font-size: 1.1rem; padding: 4px 10px; }
    .notif-nav-btn:hover { opacity: 1; }
    .notif-count { position: absolute; top: -6px; right: -4px; background: #ef4444; color: white; font-size: 0.6rem; font-weight: 700; min-width: 16px; height: 16px; border-radius: 50px; display: flex; align-items: center; justify-content: center; padding: 0 3px; border: 2px solid transparent; }
    .bottom-notif-dot { position: absolute; top: 4px; right: calc(50% - 14px); background: #ef4444; color: white; font-size: 0.55rem; font-weight: 700; min-width: 14px; height: 14px; border-radius: 50px; display: flex; align-items: center; justify-content: center; padding: 0 2px; }
    .profile-nav-btn:hover, .profile-nav-btn.active { background: white; color: black !important; }
    .bottom-nav { position: fixed; bottom: 0; bottom: env(safe-area-inset-bottom, 0); left: 0; width: 100%; height: 70px; background: #ffffff; z-index: 1050; box-shadow: 0 -4px 20px rgba(0,0,0,0.06); margin: 0; padding: 0; border-top: 1px solid #f3f4f6; }
    .bottom-nav-link { color: #9ca3af; text-decoration: none; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600; width: 100%; height: 100%; position: relative; transition: color 0.2s; padding-top: 5px; outline: none; -webkit-tap-highlight-color: transparent; }
    .bottom-nav-link i, .bottom-nav-link .p-icon { font-size: 1.35rem; margin-bottom: 3px; display: block; }
    .bottom-nav-link .p-icon { font-weight: 800; font-family: sans-serif; line-height: 1; }
    .bottom-nav-link.active { color: #111827; }
    .bottom-nav-link.active::before { content: ''; position: absolute; top: -1px; left: 50%; transform: translateX(-50%); width: 28px; height: 4px; background-color: #10b981; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; }
    @media (max-width: 426px) {
      .nav-tabs { display: none; }
      .main-nav { position: relative; width: 100%; justify-content: flex-end; min-height: 110px; }
      .logo { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 1; margin: 0 !important; }
      .logo img { height: 100px !important; }
    }
  `]
})
export class NavbarComponent implements OnInit {
  scrolled = false;
  isHome = true;
  unreadCount = 0;

  constructor(public auth: AuthService, private router: Router, private api: ApiService) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.isHome = e.urlAfterRedirects === '/';
        if (this.auth.isLoggedIn()) this.loadUnread();
      }
    });
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) this.loadUnread();
  }

  loadUnread() {
    this.api.getNotifications().subscribe({
      next: (res) => {
        this.unreadCount = (res.data || []).filter((n: any) => !n.isRead).length;
      },
      error: () => {}
    });
  }

  goToProfile() {
    if (this.auth.isLoggedIn()) this.router.navigate(['/profile']);
    else this.router.navigate(['/login']);
  }

  isProfileActive() {
    return this.router.url === '/profile' || this.router.url === '/login';
  }

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY >= 40; }
}
