import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  template: `
<!-- Hero -->
<div class="row hero" style="padding-top:105px; background: url(/Assets/images/banner-bg.png); background-size: 100% 100%;">
  <div class="col-sm-6 hero-left text-light d-flex flex-column justify-content-center">
    <div class="d-block mt-4 mt-md-0 mb-4 mb-md-5 w-100 px-3 px-sm-5 search-widget">
      <div class="mobile-search-bar shadow-lg">
        <i class="fa-solid fa-location-dot text-secondary"></i>
        <input type="text" [(ngModel)]="searchQuery" (keyup.enter)="search()" placeholder="Enter destination...">
        <i class="fa-solid fa-sliders text-secondary" (click)="search()"></i>
      </div>
    </div>
    <h1 class="px-sm-5 px-3 fw-bold text-start">
      <b class="text-danger">Looking</b> to <br> Park Your Vehicle
    </h1>
    <p class="my-3 ps-sm-5 mb-sm-5 px-3 text-start">
      Find the exact parking spot you need, filtered by your comfort and budget.
    </p>
    <div class="d-flex flex-wrap gap-3 p-3 align-items-center justify-content-center">
      <a routerLink="/find-parking" class="btn goto-btn px-4 bg-white d-flex justify-content-center align-items-center ms-sm-5 fw-bold">
        <img class="location-map me-3" style="height: 50px;" src="/Assets/images/wired-lineal-52-location-pin-on-square-map.gif" alt="">
        <div class="m-0 p-0 text-black d-flex gap-0 flex-column">
          <span class="fs-5 my-0 py-0">PARKING</span>
          <span class="text-start fw-normal my-0 py-0">Near Me</span>
        </div>
      </a>
      <a routerLink="/add-parking" class="btn goto-btn px-4 bg-white d-flex justify-content-center align-items-center ms-sm-5 fw-bold">
        <img class="register-image me-3" style="height: 55px;" src="/Assets/images/register-image-removebg-preview.png" alt="">
        <div class="m-0 p-0 text-black d-flex gap-0 flex-column">
          <span class="fs-5 my-0 py-0">REGISTER</span>
          <span class="text-start fw-normal my-0 py-0">New Parking</span>
        </div>
      </a>
    </div>
  </div>
  <div class="col-sm-6 d-flex justify-content-center align-items-end">
    <div class="rounded-top-5 car d-flex justify-content-center mt-auto" style="width:60%;position:relative;">
      <img class="mt-5 heroimage" style="width:90vmin;position:absolute;bottom:0;" alt="car">
    </div>
  </div>
</div>

<!-- Services -->
<section class="services-section py-5 bg-white">
  <div class="container py-lg-4">
    <div class="text-center mb-5">
      <span class="t-badge mb-3 d-inline-block">HOW IT WORKS</span>
      <h2 class="service-heading fw-bold">Simple, <span class="text-danger">Three-Tap</span> Process</h2>
      <p class="mx-auto text-muted lead" style="max-width: 600px;">
        At <b>AuraPark,</b> we turn the frustrating hunt for parking into a simple, efficient experience.
      </p>
    </div>
    
    <div class="row align-items-center justify-content-center">
      <!-- Step 1 -->
      <div class="col-lg-3 col-md-8 mb-4 mb-lg-0">
        <div class="service-card h-100">
          <div class="service-img w-100 text-center">
            <div class="step-badge">1</div>
            <img class="s-img" src="/Assets/images/search-icon-png-9987.png" alt="">
          </div>
          <div class="service-body text-center mt-4 border-top pt-4">
            <h5>Precision Search</h5>
            <p>Stop wasting time. Our search engine filters real-time availability by the criteria that matter most.</p>
          </div>
        </div>
      </div>

      <!-- Arrow 1 -->
      <div class="col-lg-1 d-none d-lg-flex justify-content-center align-items-center">
        <img class="next arrow-img" src="/Assets/images/going-next-arrow-gif.webp" alt="next">
      </div>

      <!-- Step 2 -->
      <div class="col-lg-3 col-md-8 mb-4 mb-lg-0">
        <div class="service-card h-100">
          <div class="service-img w-100 text-center">
            <div class="step-badge">2</div>
            <img class="s-img" src="https://cdn-icons-png.flaticon.com/256/5278/5278681.png" alt="">
          </div>
          <div class="service-body text-center mt-4 border-top pt-4">
            <h5>Real-Time Booking</h5>
            <p>See exactly how many spots are open right now and secure your space before you even leave home.</p>
          </div>
        </div>
      </div>

      <!-- Arrow 2 -->
      <div class="col-lg-1 d-none d-lg-flex justify-content-center align-items-center">
        <img class="next arrow-img" src="/Assets/images/going-next-arrow-gif.webp" alt="next">
      </div>

      <!-- Step 3 -->
      <div class="col-lg-3 col-md-8 mb-4 mb-lg-0">
        <div class="service-card h-100">
          <div class="service-img w-100 text-center">
            <div class="step-badge">3</div>
            <img class="s-img" src="https://cdn-icons-png.flaticon.com/512/702/702994.png" alt="">
          </div>
          <div class="service-body text-center mt-4 border-top pt-4">
            <h5>Flexible Options</h5>
            <p>We partner with a wide network of parking providers to ensure you always have a choice.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="faq-section py-5">
  <div class="container py-lg-5 px-sm-4">
    <div class="row align-items-center g-5">
      <div class="col-lg-5 text-lg-start text-center">
        <span class="faq-heading d-inline-block py-2 px-4 rounded-pill bg-white shadow-sm mb-3">FAQ'S</span>
        <h2 class="faq-title mb-4">All parking questions <span class="text-danger">answered.</span></h2>
        <p class="lead fs-5 text-secondary mb-5">We hope you have found an answer to your question. If you need any help, please don't hesitate to reach out via email.</p>
        <img class="w-100 faq-img" src="/Assets/images/faqs.png" alt="FAQS">
      </div>
      <div class="col-lg-7">
        <div class="accordion accordion-flush" id="faqAccordion">
          <div class="accordion-item shadow-sm">
            <h2 class="accordion-header">
              <button class="accordion-button bg-transparent fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                Does AuraPark allow me to reserve a spot ahead of time?
              </button>
            </h2>
            <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
              <div class="accordion-body">AuraPark is a real-time parking discovery tool. We show you filtered, accurate information on available spots. Once you locate a spot, you navigate there directly and pay at the lot entrance.</div>
            </div>
          </div>
          <div class="accordion-item shadow-sm">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed bg-transparent fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                How accurate is the real-time availability?
              </button>
            </h2>
            <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body">We integrate with smart city feeds and community suggestions to provide the most current data possible. We recommend checking the app just before you depart.</div>
            </div>
          </div>
          <div class="accordion-item shadow-sm">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed bg-transparent fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                How can AuraPark help me find EV charging or covered spots?
              </button>
            </h2>
            <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body">AuraPark allows you to hyper-filter your search results for EV charging stations, accessible parking, height restrictions, and covered/uncovered spots.</div>
            </div>
          </div>
          <div class="accordion-item shadow-sm">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed bg-transparent fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                Is the parking rate shown the exact price I will pay?
              </button>
            </h2>
            <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div class="accordion-body">The hourly rate displayed is the most recently reported rate. While highly accurate, rates are estimates and may be subject to change by the parking operator.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Testimonials -->
<section class="testimonials-section py-5">
  <div class="container">
    <div class="text-center mb-5">
      <span class="t-badge">WHAT PEOPLE SAY</span>
      <h2 class="fw-bold mt-3">Trusted by <span class="text-danger">Thousands</span> of Drivers</h2>
      <p class="text-muted">Real experiences from real AuraPark users across India.</p>
    </div>
    <div class="row g-4">
      <div class="col-lg-3 col-md-6">
        <div class="t-card">
          <div class="t-quote"><i class="fa-solid fa-quote-left"></i></div>
          <p class="t-text">Found a spot near my office in under 2 minutes. Absolutely love this app!</p>
          <div class="t-stars">★★★★★</div>
          <div class="t-user">
            <img src="https://i.pravatar.cc/150?u=lakshay" alt="">
            <div>
              <h6 class="mb-0 fw-bold">Lakshay</h6>
              <small>Delhi</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="t-card">
          <div class="t-quote"><i class="fa-solid fa-quote-left"></i></div>
          <p class="t-text">Everything was clear and simple — no jargon, just honest info that made finding parking stress-free.</p>
          <div class="t-stars">★★★★★</div>
          <div class="t-user">
            <img src="https://i.pravatar.cc/150?u=nidhaan" alt="">
            <div>
              <h6 class="mb-0 fw-bold">Nidhaan Srivastava</h6>
              <small>Mumbai</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="t-card">
          <div class="t-quote"><i class="fa-solid fa-quote-left"></i></div>
          <p class="t-text">The directions feature is super accurate. Saved me so much time during peak hours.</p>
          <div class="t-stars">★★★★★</div>
          <div class="t-user">
            <img src="https://i.pravatar.cc/150?u=ananya" alt="">
            <div>
              <h6 class="mb-0 fw-bold">Ananya Rao</h6>
              <small>Bangalore</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="t-card">
          <div class="t-quote"><i class="fa-solid fa-quote-left"></i></div>
          <p class="t-text">Best parking app I've used. Real-time data is spot on and the UI is very clean.</p>
          <div class="t-stars">★★★★★</div>
          <div class="t-user">
            <img src="https://i.pravatar.cc/150?u=rahul" alt="">
            <div>
              <h6 class="mb-0 fw-bold">Rahul Mehta</h6>
              <small>Hyderabad</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
  styles: [`
    .hero { height: 100vh; }
    .hero-left > h1 { font-size: 70px; }
    .hero-left > p { font-size: 20px; }
    .car { height: 70vh; background-color: white; }
    .goto-btn:hover { transform: scale(1.05); transition: all ease 0.2s; }
    .service-heading { font-size: 3rem; color: #0f172a; letter-spacing: -1px; }
    .service-card { position: relative; cursor: pointer; background: #ffffff; border-radius: 20px; padding: 40px 24px; border: 1px solid #f1f5f9; box-shadow: 0 10px 30px rgba(0,0,0,0.03); transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); }
    .service-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); border-color: #fca5a5; }
    .service-img { position: relative; margin-bottom: 1.5rem; }
    .step-badge { position: absolute; top: -56px; left: -10px; background: linear-gradient(135deg, #AB1111, #ff4b4b); width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 50%; color: white; font-weight: bold; font-size: 1.2rem; box-shadow: 0 4px 10px rgba(171, 17, 17, 0.3); z-index: 2; border: 3px solid white; }
    .service-body h5 { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin-bottom: 0.75rem; }
    .service-body p { font-size: 0.95rem; color: #64748b; line-height: 1.6; margin: 0; }
    .arrow-img { height: 60px; filter: grayscale(1) opacity(0.3); transition: all 0.3s ease; }
    .arrow-img:hover { filter: grayscale(0) opacity(1); }
    .heroimage {
      animation: change 12s linear infinite;
    }
    @keyframes change {
      0% { content: url('/Assets/images/rubicon-image.png'); }
      20% { content: url('/Assets/images/Yamaha.png'); }
      40% { content: url('/Assets/images/Honda-car-image.png'); }
      60% { content: url('/Assets/images/honda-shine.png'); }
      80% { content: url('/Assets/images/hf-delux.png'); }
      100% { content: url('/Assets/images/rubicon-image.png'); }
    }
    .testimonials-section { background: #f8f9fa; }
    .t-badge { background: #fef2f2; color: #AB1111; font-weight: 700; font-size: 0.8rem; letter-spacing: 2px; padding: 6px 18px; border-radius: 50px; border: 1px solid #fecaca; }
    .testimonials-section h2 { color: #1e293b; }
    .testimonials-section p { color: #64748b !important; }
    .t-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 28px; height: 100%; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .t-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); border-color: #fca5a5; }
    .t-quote i { font-size: 1.5rem; color: #AB1111; margin-bottom: 16px; display: block; }
    .t-text { color: #475569; font-size: 0.95rem; line-height: 1.7; margin-bottom: 16px; }
    .t-stars { color: #f59e0b; font-size: 0.9rem; margin-bottom: 20px; letter-spacing: 2px; }
    .t-user { display: flex; align-items: center; gap: 12px; border-top: 1px solid #f1f5f9; padding-top: 16px; }
    .t-user img { width: 44px; height: 44px; border-radius: 50%; border: 2px solid #e2e8f0; object-fit: cover; }
    .t-user h6 { color: #1e293b; }
    .t-user small { color: #94a3b8; font-size: 0.8rem; }
    .faq-section { background-color: #f8fafc; }
    .faq-heading { color: #AB1111; letter-spacing: 1px; font-weight: 800; text-transform: uppercase; font-size: 0.9rem; }
    .faq-title { color: #0f172a; font-weight: 800; font-size: 2.8rem; line-height: 1.2; letter-spacing: -1px; }
    .accordion-item { border: none !important; margin-bottom: 1.25rem !important; border-radius: 16px !important; overflow: hidden; background: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.03); transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .accordion-item:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.06); }
    .accordion-button { padding: 1.25rem 1.5rem; font-weight: 600; font-size: 1.05rem; color: #1e293b; background-color: transparent !important; box-shadow: none !important; }
    .accordion-button:not(.collapsed) { color: #AB1111; background-color: #fffafb !important; border-bottom: 1px solid #f1f5f9; }
    .accordion-body { padding: 1.5rem; color: #64748b; font-size: 0.95rem; line-height: 1.7; background-color: #fff !important; }
    .faq-img { border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.08); transition: transform 0.5s ease; border: 4px solid white; }
    .faq-img:hover { transform: scale(1.02); }
    .mobile-search-bar { display: flex; align-items: center; background: white; border-radius: 50px; padding: 12px 20px; gap: 12px; }
    .mobile-search-bar input { flex: 1; border: none; outline: none; background: transparent; color: #333; font-size: 1rem; width: 100%; }
    .mobile-search-bar i { font-size: 1.2rem; cursor: pointer; }
    .s-img { height: 120px; transition: transform 0.4s ease; }
    .service-card:hover .s-img { transform: scale(1.1); }
    @media (max-width: 426px) {
      .hero-left > h1 { font-size: 50px; }
      .hero { height: 130vh; }
      .car { height: 40vh; }
      .next { transform: rotateZ(90deg); }
      .arrow-img { transform: rotateZ(360deg); margin-bottom: 20px; height: 60px; }
      .s-img { height: 80px; }
      .service-card { padding: 35px 20px; }
      .service-heading { font-size: 2.5rem; }
      .step-badge { width: 40px; height: 40px; font-size: 1rem; top: -45px; left: -5px; }
      .faq-title { font-size: 2.2rem; }
    }
  `]
})
export class HomeComponent {
  searchQuery = '';
  
  constructor(private router: Router) {}

  search() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/find-parking'], { queryParams: { q: this.searchQuery.trim() } });
    } else {
      this.router.navigate(['/find-parking']);
    }
  }
}
