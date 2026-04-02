import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PwaUpdateService } from './pwa-update.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <div class="app-content-wrapper">
      <router-outlet />
    </div>
    <app-footer />
  `,
  styles: [`
    @media (max-width: 426px) {
      .app-content-wrapper { padding-bottom: 75px; }
    }
  `]
})
export class App implements OnInit {
  private pwaUpdate = inject(PwaUpdateService);

  ngOnInit() {
    this.pwaUpdate.init();
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  }

  private router = inject(Router);
}
