import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
<div id="header" class="container-fluid fixed-top overflow-hidden" [class.scrolled]="scrolled || !isHome">
  <div class="row">
    <div class="col-sm-4 d-flex align-items-center main-nav">
      <div class="logo p-0 m-0">
        <img src="/Assets/images/AuraPark-logo (2).png" style="height: 120px" alt="AuraPark">
      </div>
      <div class="w-25 m-0 nav-open">
        <a data-bs-toggle="offcanvas" href="#offcanvasMenu" role="button">
          <i class="fa-solid float-end me-4 fw-bold text-white fa-bars-staggered"></i>
        </a>
      </div>

      <div class="offcanvas offcanvas-start modern-offcanvas" tabindex="-1" id="offcanvasMenu">
        <div class="offcanvas-header border-bottom border-light border-opacity-10 py-3">
          <img src="/Assets/images/AuraPark-logo (2).png" style="height: 35px" alt="AuraPark">
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body p-0 d-flex flex-column h-100">
          <div class="menu-section mt-4">
            <p class="text-uppercase small fw-bold px-4 mb-2" style="letter-spacing:0.15em;color:rgba(255,255,255,0.4)">Navigation</p>
            <ul class="list-unstyled w-100 custom-nav">
              <li><a class="nav-link-custom" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" data-bs-dismiss="offcanvas"><i class="bi bi-house-door me-3"></i>Home</a></li>
              <li><a class="nav-link-custom" routerLink="/find-parking" routerLinkActive="active" data-bs-dismiss="offcanvas"><i class="bi bi-geo-alt me-3"></i>Find Parking</a></li>
              <li><a class="nav-link-custom" routerLink="/add-parking" routerLinkActive="active" data-bs-dismiss="offcanvas"><i class="bi bi-plus-circle me-3"></i>Add Parking</a></li>
              <li><a class="nav-link-custom" routerLink="/about" routerLinkActive="active" data-bs-dismiss="offcanvas"><i class="bi bi-info-circle me-3"></i>About Us</a></li>
              <li><a class="nav-link-custom" routerLink="/contact" routerLinkActive="active" data-bs-dismiss="offcanvas"><i class="bi bi-envelope me-3"></i>Contact Us</a></li>
            </ul>
          </div>
          <div class="p-4 mt-3 mx-3 rounded-4 promo-card">
            <h6 class="fw-bold text-white mb-2">Smart Owner Tip</h6>
            <p class="small text-white-50 mb-0">List your spot during peak office hours to maximize your daily earnings!</p>
          </div>
          <div class="mt-auto p-4 border-top border-light border-opacity-10">
            <div class="d-flex justify-content-around fs-4 mb-3">
              <a href="https://www.linkedin.com/in/pal-yogesh" class="text-white-50 hover-gold" target="_blank"><i class="bi bi-linkedin"></i></a>
              <a href="https://www.instagram.com/the_yogeshpal/" class="text-white-50 hover-gold" target="_blank"><i class="bi bi-instagram"></i></a>
              <a href="#" class="text-white-50 hover-gold"><i class="bi bi-twitter-x"></i></a>
              <a href="#" class="text-white-50 hover-gold"><i class="bi bi-facebook"></i></a>
            </div>
            <p class="text-center small text-muted mb-0">© 2026 AuraPark Solutions</p>
          </div>
        </div>
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
  <a routerLink="/about" routerLinkActive="active" class="bottom-nav-link">
    <i class="fa-solid fa-circle-info"></i>
    <span>About</span>
  </a>
  <a routerLink="/contact" routerLinkActive="active" class="bottom-nav-link">
    <i class="fa-regular fa-envelope"></i>
    <span>Contact</span>
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
    .nav-open { display: none; }
    .modern-offcanvas { background: linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%) !important; color: white !important; width: 320px !important; border-right: 1px solid rgba(255,255,255,0.1); }
    .custom-nav .nav-link-custom { display: flex; padding: 14px 25px; text-decoration: none; color: rgba(255,255,255,0.7); font-weight: 500; transition: all 0.3s ease; border-left: 4px solid transparent; }
    .custom-nav .nav-link-custom:hover { color: #fff; background: rgba(255,255,255,0.05); border-left: 4px solid #0b74da; padding-left: 35px; }
    .custom-nav .nav-link-custom.active { color: white; background: rgba(11,116,218,0.15); border-left: 4px solid #0b74da; }
    .promo-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(10px); }
    .hover-gold:hover { color: #ffc107 !important; transform: translateY(-3px); transition: 0.2s; }
    
    .bottom-nav { position: fixed; bottom: 0; left: 0; width: 100%; height: 70px; background: #ffffff; z-index: 1050; box-shadow: 0 -4px 20px rgba(0,0,0,0.06); margin: 0; padding: 0; border-top: 1px solid #f3f4f6; }
    .bottom-nav-link { color: #9ca3af; text-decoration: none; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600; width: 100%; height: 100%; position: relative; transition: color 0.2s; padding-top: 5px; outline: none; -webkit-tap-highlight-color: transparent; }
    .bottom-nav-link:focus, .bottom-nav-link:active { outline: none; background: transparent; }
    .bottom-nav-link i, .bottom-nav-link .p-icon { font-size: 1.35rem; margin-bottom: 3px; display: block; }
    .bottom-nav-link .p-icon { font-weight: 800; font-family: sans-serif; line-height: 1; }
    .bottom-nav-link.active { color: #111827; }
    .bottom-nav-link.active::before { content: ''; position: absolute; top: -1px; left: 50%; transform: translateX(-50%); width: 28px; height: 4px; background-color: #10b981; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; }

    @media (max-width: 426px) {
      .nav-tabs { display: none; }
      .nav-open { display: block; font-size: 32px; width: auto !important; z-index: 10; padding-right: 15px; }
      .main-nav { position: relative; width: 100%; justify-content: flex-end; }
      .logo { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 1; margin: 0 !important; }
      .logo img { height: 90px !important; } /* slightly smaller on mobile to balance */
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
