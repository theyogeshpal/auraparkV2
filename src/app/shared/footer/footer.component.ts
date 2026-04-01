import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
<footer class="d-none d-md-block site-footer">

  <div class="footer-top">
    <div class="footer-inner">

      <!-- Brand -->
      <div class="footer-brand">
        <img src="/Assets/images/AuraPark-logo (2).png" style="height:55px" alt="AuraPark">
        <p class="brand-desc">AuraPark connects drivers with available parking across the city — simple, efficient, and smart.</p>
        <div class="social-row">
          <a href="https://www.linkedin.com/in/pal-yogesh" target="_blank" class="social-btn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="https://www.instagram.com/the_yogeshpal/" target="_blank" class="social-btn"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" class="social-btn"><i class="fa-brands fa-twitter"></i></a>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="footer-col">
        <h6 class="footer-heading">Quick Links</h6>
        <ul class="footer-links">
          <li><a routerLink="/"><i class="fa-solid fa-chevron-right"></i>Home</a></li>
          <li><a routerLink="/find-parking"><i class="fa-solid fa-chevron-right"></i>Find Parking</a></li>
          <li><a routerLink="/add-parking"><i class="fa-solid fa-chevron-right"></i>Add Parking</a></li>
          <li><a routerLink="/about"><i class="fa-solid fa-chevron-right"></i>About Us</a></li>
          <li><a routerLink="/contact"><i class="fa-solid fa-chevron-right"></i>Contact Us</a></li>
        </ul>
      </div>

      <!-- Legal -->
      <div class="footer-col">
        <h6 class="footer-heading">Legal</h6>
        <ul class="footer-links">
          <li><a routerLink="/privacy"><i class="fa-solid fa-chevron-right"></i>Privacy Policy</a></li>
          <li><a href="#" routerLink="/terms"><i class="fa-solid fa-chevron-right"></i>Terms of Service</a></li>
        
        </ul>
      </div>

      <!-- Contact -->
      <div class="footer-col">
        <h6 class="footer-heading">Get in Touch</h6>
        <ul class="footer-contact">
          <li>
            <div class="contact-icon"><i class="fa-solid fa-phone"></i></div>
            <span>+91 7817095043</span>
          </li>
          <li>
            <div class="contact-icon"><i class="fa-solid fa-envelope"></i></div>
            <span>yogeshpal1309&#64;gmail.com</span>
          </li>
          <li>
            <div class="contact-icon"><i class="fa-solid fa-location-dot"></i></div>
            <span>C-39, Near Ayubkhan Chauraha,<br>New Delhi, UP 110001</span>
          </li>
        </ul>
      </div>

    </div>
  </div>

  <div class="footer-bottom">
    <span>&copy; 2026 AuraPark Solutions. All Rights Reserved.</span>
    <span>Crafted with <span class="heart">&#9829;</span> by <a href="https://yogesh-pal.netlify.app/" target="_blank" class="footer-author">Yogesh Pal</a></span>
  </div>

</footer>
  `,
  styles: [`
    .site-footer { background: #0a0a0a; border-top: 1px solid rgba(255,255,255,0.06); }

    .footer-top { padding: 64px 40px 48px; max-width: 1200px; margin: 0 auto; }
    .footer-inner { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 48px; }

    .footer-brand .brand-desc { color: rgba(255,255,255,0.45); font-size: 0.88rem; line-height: 1.7; margin: 16px 0 20px; max-width: 260px; }
    .social-row { display: flex; gap: 10px; }
    .social-btn { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.6); display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 0.9rem; transition: all 0.2s; border: 1px solid rgba(255,255,255,0.1); }
    .social-btn:hover { background: #0b74da; color: white; border-color: #0b74da; transform: translateY(-2px); }

    .footer-heading { color: white; font-size: 0.8rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 20px; position: relative; padding-bottom: 10px; }
    .footer-heading::after { content: ''; position: absolute; bottom: 0; left: 0; width: 24px; height: 2px; background: #0b74da; border-radius: 2px; }

    .footer-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
    .footer-links li a { color: rgba(255,255,255,0.45); text-decoration: none; font-size: 0.9rem; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
    .footer-links li a i { font-size: 0.6rem; color: #0b74da; }
    .footer-links li a:hover { color: white; padding-left: 4px; }

    .footer-contact { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; }
    .footer-contact li { display: flex; align-items: flex-start; gap: 12px; color: rgba(255,255,255,0.45); font-size: 0.88rem; line-height: 1.6; }
    .contact-icon { width: 32px; height: 32px; border-radius: 8px; background: rgba(11,116,218,0.15); color: #0b74da; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; flex-shrink: 0; }

    .footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding: 20px 40px; max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; color: rgba(255,255,255,0.3); font-size: 0.82rem; }
    .heart { color: #e11d48; }
    .footer-author { color: rgba(255,255,255,0.6); text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.2); transition: all 0.2s; }
    .footer-author:hover { color: white; border-bottom-color: white; }
  `]
})
export class FooterComponent {}
