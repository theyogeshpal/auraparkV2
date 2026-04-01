import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
<footer class="d-none d-md-block">
<div class="row pb-0 py-sm-5 py-3 bg-black mt-5">
  <div class="col-sm-4 mt-sm-5 mb-2">
    <div class="w-100 ps-sm-5 d-flex align-items-start justify-content-start flex-column">
      <img src="/Assets/images/AuraPark-logo (2).png" class="ps-sm-5 mb-3" style="height: 60px" alt="AuraPark">
      <p class="ps-sm-5 text-white" style="text-align:justify;">
        <b>AuraPark Smart Parking Solutions</b> connects drivers with available parking across the city. We make city parking simple, efficient, and profitable for space owners.
      </p>
    </div>
  </div>

  <div class="col-sm-2 mt-sm-5 pt-sm-4 ps-sm-5 mb-2 phone">
    <h4 class="text-white fw-bold">Quick Links</h4>
    <ul class="list-unstyled foot-ul pt-2">
      <li><a routerLink="/">Home</a></li>
      <li><a routerLink="/find-parking">Find Parking</a></li>
      <li><a routerLink="/add-parking">Add Parking</a></li>
      <li><a routerLink="/about">About Us</a></li>
      <li><a routerLink="/contact">Contact Us</a></li>
    </ul>
  </div>

  <div class="col-sm-3 mt-sm-5 pt-sm-4 ps-sm-5 mb-2 phone">
    <h4 class="text-white fw-bold">Get in Touch</h4>
    <ul class="list-unstyled foot-ul pt-2 text-white">
      <li class="mb-2"><i class="fa-solid fs-5 fa-phone me-2 text-warning"></i> +91 7817095043</li>
      <li class="mb-2"><i class="fa-solid fs-5 fa-envelope me-2 text-warning"></i> yogeshpal1309&#64;gmail.com</li>
      <li class="d-flex gap-2">
        <i class="fa-solid fs-5 fa-location-dot mt-1 text-warning"></i>
        <span>C-39, Near Ayubkhan Chauraha, New Delhi, UP 110001</span>
      </li>
    </ul>
  </div>

  <div class="col-sm-2 mt-sm-5 pt-sm-4 text-white phone">
    <h4 class="fw-bold">Follow Us</h4>
    <ul class="list-unstyled foot-ul pt-2 text-white">
      <li class="mb-2"><a target="_blank" href="https://www.linkedin.com/in/pal-yogesh"><i class="fa-brands fa-linkedin me-2"></i>Linkedin</a></li>
      <li class="mb-2"><a target="_blank" href="https://www.instagram.com/the_yogeshpal/"><i class="fa-brands fa-instagram me-2"></i>Instagram</a></li>
      <li class="mb-2"><a target="_blank" href="#"><i class="fa-brands fa-twitter me-2"></i>Twitter</a></li>
    </ul>
  </div>
</div>

<div class="row bg-black">
  <div class="col-sm-10 mx-auto">
    <hr style="border: 1px solid rgba(255,255,255,0.2);" />
  </div>
  <div class="col-sm-12 py-3 justify-content-around flex-wrap d-flex text-white small opacity-75">
    <div>&copy; 2026 Aura Park. All Rights Reserved.</div>
    <div>Developed by Yogesh Pal with <span class="text-warning">&#9829;</span></div>
  </div>
</div>
</footer>
  `,
  styles: [`
    .foot-ul > li > a { color: white; transition: 0.3s; text-decoration: none; }
    .foot-ul > li:hover, .foot-ul > li > a:hover { transform: scale(1.05); color: yellow !important; }
    @media (max-width: 426px) { .phone { text-align: left; padding-left: 25px; padding-right: 20px; } }
  `]
})
export class FooterComponent {}
