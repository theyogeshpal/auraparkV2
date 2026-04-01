import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

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
export class App {}
