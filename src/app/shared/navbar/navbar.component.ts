import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
<div id="header" class="container-fluid fixed-top" [class.scrolled]="scrolled || !isHome">
  <div class="row">
    <div class="col-sm-4 d-flex align-items-center main-nav">
      <div class="logo p-0 m-0">
        <img src="/Assets/images/AuraPark-logo (2).png" style="height: 120px" alt="AuraPark">
      </div>

    </div>

    <div class="col-sm-8 d-flex align-items-center justify-content-between">
      <ul class="border-0 nav-tabs">
        <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a></li>
        <li><a routerLink="/find-parking" routerLinkActive="active">Find Parking</a></li>
        <li><a routerLink="/add-parking" routerLinkActive="active">Add Parking</a></li>
        <li><a routerLink="/about" routerLinkActive="active">About Us</a></li>
        <li><a routerLink="/contact" routerLinkActive="active">Contact Us</a></li>
      </ul>
    </div>
  </div>
</div>

<div class="bottom-nav d-flex d-md-none justify-content-around">
  <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="bottom-nav-link">
    <i class="fa-solid fa-house"></i>
    <span>Home</span>
  </a>
  <a routerLink="/find-parking" routerLinkActive="active" class="bottom-nav-link">
    <i class="fa-solid fa-magnifying-glass-location"></i>
    <span>Find</span>
  </a>
  <a routerLink="/add-parking" routerLinkActive="active" class="bottom-nav-link">
    <span class="p-icon">P+</span>
    <span>Add</span>
  </a>
  <a routerLink="/profile" routerLinkActive="active" class="bottom-nav-link">
    <i class="fa-solid fa-circle-user"></i>
    <span>Profile</span>
  </a>
</div>
  `,
  styles: [`
    #header { transition: background-color 0.2s ease; background-color: transparent; }
    #header.scrolled { background-color: black; }
    .main-nav { background-color: transparent; }
    .nav-tabs { margin: 0; width: 75%; display: flex; justify-content: space-evenly; font-size: 20px; list-style: none; border: none; }
    .nav-tabs > li > a { text-decoration: none; color: white; opacity: 0.6; }
    .nav-tabs > li > a:hover, .nav-tabs > li > a.active { opacity: 1 !important; color: white; }

    .bottom-nav { position: fixed; bottom: 0; bottom: env(safe-area-inset-bottom, 0); left: 0; width: 100%; height: 70px; background: #ffffff; z-index: 1050; box-shadow: 0 -4px 20px rgba(0,0,0,0.06); margin: 0; padding: 0; border-top: 1px solid #f3f4f6; transform: translateZ(0); -webkit-transform: translateZ(0); will-change: transform; }
    .bottom-nav-link { color: #9ca3af; text-decoration: none; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600; width: 100%; height: 100%; position: relative; transition: color 0.2s; padding-top: 5px; outline: none; -webkit-tap-highlight-color: transparent; }
    .bottom-nav-link:focus, .bottom-nav-link:active { outline: none; background: transparent; }
    .bottom-nav-link i, .bottom-nav-link .p-icon { font-size: 1.35rem; margin-bottom: 3px; display: block; }
    .bottom-nav-link .p-icon { font-weight: 800; font-family: sans-serif; line-height: 1; }
    .bottom-nav-link.active { color: #111827; }
    .bottom-nav-link.active::before { content: ''; position: absolute; top: -1px; left: 50%; transform: translateX(-50%); width: 28px; height: 4px; background-color: #10b981; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; }

    @media (max-width: 426px) {
      .nav-tabs { display: none; }
      .nav-open { display: none; }
      .main-nav { position: relative; width: 100%; justify-content: flex-end; min-height: 110px; }
      .logo { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 1; margin: 0 !important; }
      .logo img { height: 100px !important; }
    }
  `]
})
export class NavbarComponent {
  scrolled = false;
  isHome = true;

  constructor(private router: Router) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.isHome = e.urlAfterRedirects === '/';
      }
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY >= 40;
  }
}
