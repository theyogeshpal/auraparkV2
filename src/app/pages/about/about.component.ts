import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  template: `
<style>
  :root { --ap-red: #AB1111; --ap-gold: #FFC300; }
  #header { background-color: black !important; }
  .hero-about { padding: 140px 0 80px; background: radial-gradient(circle at 0% 0%, #fff5f5 0%, #ffffff 50%); border-bottom: 1px solid #f1f5f9; }
  .hero-badge { background-color: #fef2f2; color: var(--ap-red); font-weight: 700; font-size: 0.85rem; letter-spacing: 1px; padding: 8px 20px; border-radius: 50px; display: inline-block; }
  .mission-image-card { background: white; padding: 15px; border-radius: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.06); transition: transform 0.5s ease; }
  .mission-image-card:hover { transform: scale(1.02); }
  .pillar-item { background: #F8FAFC; border-radius: 24px; padding: 40px; border: 1px solid transparent; transition: all 0.3s ease; }
  .pillar-item:hover { background: white; border-color: #fee2e2; box-shadow: 0 15px 30px rgba(171,17,17,0.05); transform: translateY(-5px); }
  .icon-box { width: 60px; height: 60px; background: white; color: var(--ap-red); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; border-radius: 16px; box-shadow: 0 10px 15px rgba(0,0,0,0.05); margin-bottom: 25px; transition: all 0.3s; }
  .pillar-item:hover .icon-box { transform: scale(1.1); color: white; background: var(--ap-red); }
  .team-card { background: white; border-radius: 24px; padding: 40px 30px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.03); border: none; transition: all 0.3s; }
  .team-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
  .profile-img { width: 140px; height: 140px; object-fit: cover; border-radius: 50%; margin-bottom: 25px; border: 6px solid #f8fafc; box-shadow: 0 10px 20px rgba(0,0,0,0.08); }
  .cta-light { background: linear-gradient(135deg, #AB1111 0%, #ff4b4b 100%); border-radius: 30px; padding: 70px 40px; color: white; overflow: hidden; position: relative; }
  .cta-light::before { content: ''; position: absolute; top: -50px; left: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%; }
  .cta-light::after { content: ''; position: absolute; bottom: -50px; right: -50px; width: 300px; height: 300px; background: rgba(255,255,255,0.1); border-radius: 50%; }
</style>

<section class="hero-about">
  <div class="text-center">
    <div class="hero-badge mb-4">RELIABLE & SMART</div>
    <h1 class="display-5 fw-bold mb-4">The team making cities <br><span style="color:var(--ap-red)">breathable again.</span></h1>
    <p class="lead text-muted mx-auto" style="max-width:650px;">
      AuraPark is more than just a parking app. We are a group of engineers and urban dreamers dedicated to solving the last-mile parking problem.
    </p>
  </div>
</section>

<section class="py-5">
  <div class="container py-lg-5">
    <div class="row align-items-center g-5">
      <div class="col-lg-6">
        <div class="mission-image-card">
          <img src="/Assets/images/Car-Parking-Management-System-1.jpg" class="img-fluid rounded-4" alt="Parking">
        </div>
      </div>
      <div class="col-lg-6 ps-lg-5">
        <h2 class="fw-bolder mb-4">Why we started <span style="color:var(--ap-gold)">AuraPark</span></h2>
        <p class="text-muted fs-5 mb-4">In 2024, we realized that people spend over 17 hours a year just looking for parking. That's 17 hours of wasted fuel, extra CO2, and pure frustration.</p>
        <div class="d-flex mb-4">
          <div class="me-3"><div class="icon-box" style="margin-bottom:0"><i class="bi bi-lightning-charge"></i></div></div>
          <div>
            <h5 class="fw-bold mb-1">Instant Availability</h5>
            <p class="text-muted small">We verify every spot using smart community data feeds.</p>
          </div>
        </div>
        <div class="d-flex">
          <div class="me-3"><div class="icon-box" style="margin-bottom:0"><i class="bi bi-tree"></i></div></div>
          <div>
            <h5 class="fw-bold mb-1">Eco-Friendly Future</h5>
            <p class="text-muted small">Reducing circling time means reducing urban emissions.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5" style="background-color:#fbfcfd;">
  <div class="container">
    <div class="row mb-5">
      <div class="col-lg-6"><h2 class="fw-bolder">The Pillars of our <br><span class="text-danger">Innovation</span></h2></div>
      <div class="col-lg-6 text-lg-end d-flex align-items-center justify-content-lg-end"><p class="text-muted">Built for speed. Designed for people.</p></div>
    </div>
    <div class="row g-4">
      <div class="col-md-4"><div class="pillar-item"><div class="icon-box"><i class="bi bi-clock"></i></div><h5 class="fw-bold">Real-Time Sync</h5><p class="text-muted small">Our platform updates every few seconds, ensuring you don't drive to a full lot.</p></div></div>
      <div class="col-md-4"><div class="pillar-item"><div class="icon-box"><i class="bi bi-funnel"></i></div><h5 class="fw-bold">Hyper Filtering</h5><p class="text-muted small">EV? Covered? Accessible? We find exactly what your vehicle needs.</p></div></div>
      <div class="col-md-4"><div class="pillar-item"><div class="icon-box"><i class="bi bi-geo"></i></div><h5 class="fw-bold">Local Intel</h5><p class="text-muted small">We tap into local knowledge to show hidden spots no other app sees.</p></div></div>
    </div>
  </div>
</section>

<section class="py-5">
  <div class="container py-lg-5">
    <div class="text-center mb-5">
      <h2 class="fw-bolder">Meet the Founders</h2>
      <p class="text-muted">The hearts and minds behind the code.</p>
    </div>
    <div class="row g-4 justify-content-center">
      <div class="col-lg-4 col-md-6">
        <div class="team-card">
          <img src="/Assets/images/Ceo.jpg" class="profile-img" alt="Yogesh Pal">
          <h5 class="fw-bold mb-1">Yogesh Pal</h5>
          <p class="text-danger fw-bold small text-uppercase">Co-Founder & CEO</p>
          <p class="text-muted small">Expert in user-centric design and scalable data architecture.</p>
          <div class="mt-3">
            <a href="https://www.linkedin.com/in/pal-yogesh" class="text-muted mx-2" target="_blank"><i class="bi bi-linkedin"></i></a>
            <a href="#" class="text-muted mx-2"><i class="bi bi-twitter-x"></i></a>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="team-card">
          <img src="/Assets/images/girl-happy-portrait-user-profile-by-ai_1119669-10.jpg" class="profile-img" alt="Kamna Rajput">
          <h5 class="fw-bold mb-1">Kamna Rajput</h5>
          <p class="text-danger fw-bold small text-uppercase">Co-Founder & CTO</p>
          <p class="text-muted small">Software engineer focused on high-performance filtering engines.</p>
          <div class="mt-3">
            <a href="#" class="text-muted mx-2"><i class="bi bi-linkedin"></i></a>
            <a href="#" class="text-muted mx-2"><i class="bi bi-github"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5 mx-sm-5 mx-3 mb-5">
  <div class="cta-light text-center shadow-lg">
    <h2 class="fw-bolder display-6 mb-3 position-relative" style="z-index: 2;">Join the Parking Revolution</h2>
    <p class="mb-5 opacity-75 fs-5 position-relative" style="z-index: 2;">Ready to find your perfect spot in seconds?</p>
    <div class="d-flex flex-wrap justify-content-center gap-3 position-relative" style="z-index: 2;">
      <a routerLink="/find-parking" class="btn btn-light px-5 py-3 fw-bold rounded-pill text-danger shadow" style="font-size: 1.1rem;">Search Near Me</a>
      <a routerLink="/add-parking" class="btn btn-outline-light px-5 py-3 fw-bold rounded-pill" style="font-size: 1.1rem;">List My Space</a>
    </div>
  </div>
</section>
  `,
  styles: []
})
export class AboutComponent {}
