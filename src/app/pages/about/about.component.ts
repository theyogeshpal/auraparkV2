import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  template: `

<!-- Hero -->
<section class="about-hero">
  <div class="hero-bg-grid"></div>
  <div class="about-hero-inner">
    <span class="about-badge">Our Story</span>
    <h1>We're on a mission to make<br><span class="hero-highlight">parking effortless.</span></h1>
    <p>AuraPark was born out of frustration — the kind you feel circling a block for 20 minutes. We built the solution we wished existed.</p>
    <div class="hero-stats">
      <div class="hs"><span class="hs-num">50K+</span><span class="hs-label">Active Users</span></div>
      <div class="hs-div"></div>
      <div class="hs"><span class="hs-num">1,200+</span><span class="hs-label">Spots Listed</span></div>
      <div class="hs-div"></div>
      <div class="hs"><span class="hs-num">30+</span><span class="hs-label">Cities</span></div>
      <div class="hs-div"></div>
      <div class="hs"><span class="hs-num">4.8★</span><span class="hs-label">Rating</span></div>
    </div>
  </div>
</section>

<!-- Story -->
<section class="story-section">
  <div class="story-inner">
    <div class="story-img-wrap">
      <img src="/Assets/images/Car-Parking-Management-System-1.jpg" alt="AuraPark Story">
      <div class="story-img-badge"><i class="fa-solid fa-award"></i><span>Est. 2024</span></div>
    </div>
    <div class="story-content">
      <span class="section-label">Why We Started</span>
      <h2>17 hours. That's how long the average driver spends <span class="text-red">hunting for parking</span> every year.</h2>
      <p>We saw a broken system — drivers circling endlessly, fuel wasted, emissions rising, and tempers flaring. So in 2024, a small team of engineers and urban planners set out to fix it.</p>
      <p>AuraPark connects drivers with real-time, verified parking data — filtered exactly to their needs. No guessing. No circling. Just park.</p>
      <div class="story-tags">
        <span><i class="fa-solid fa-leaf"></i> Eco-Friendly</span>
        <span><i class="fa-solid fa-bolt"></i> Real-Time</span>
        <span><i class="fa-solid fa-shield-halved"></i> Verified</span>
      </div>
    </div>
  </div>
</section>

<!-- Values -->
<section class="values-section">
  <div class="values-inner">
    <div class="section-header">
      <span class="section-label">What Drives Us</span>
      <h2>Our Core Values</h2>
    </div>
    <div class="values-grid">
      <div class="value-card">
        <div class="value-icon" style="background:#eff6ff"><i class="fa-solid fa-bolt" style="color:#0b74da"></i></div>
        <h5>Speed First</h5>
        <p>Every second counts when you're looking for parking. Our platform is engineered for instant, real-time results.</p>
      </div>
      <div class="value-card">
        <div class="value-icon" style="background:#f0fdf4"><i class="fa-solid fa-leaf" style="color:#16a34a"></i></div>
        <h5>Sustainability</h5>
        <p>Less circling means less fuel burned and fewer emissions. Every spot we help fill is a win for the planet.</p>
      </div>
      <div class="value-card">
        <div class="value-icon" style="background:#fdf4ff"><i class="fa-solid fa-users" style="color:#9333ea"></i></div>
        <h5>Community</h5>
        <p>We're powered by a network of real people — space owners and drivers — working together to solve urban parking.</p>
      </div>
      <div class="value-card">
        <div class="value-icon" style="background:#fff1f2"><i class="fa-solid fa-shield-halved" style="color:#e11d48"></i></div>
        <h5>Trust & Safety</h5>
        <p>Every listing is verified. Every transaction is secure. We take the safety of your vehicle seriously.</p>
      </div>
      <div class="value-card">
        <div class="value-icon" style="background:#fefce8"><i class="fa-solid fa-lightbulb" style="color:#ca8a04"></i></div>
        <h5>Innovation</h5>
        <p>We constantly push the boundaries of what a parking app can do — smart filters, live data, and more.</p>
      </div>
      <div class="value-card">
        <div class="value-icon" style="background:#f0f9ff"><i class="fa-solid fa-heart" style="color:#0284c7"></i></div>
        <h5>User Obsession</h5>
        <p>Every feature we build starts with one question: does this make the driver's life easier?</p>
      </div>
    </div>
  </div>
</section>

<!-- Team -->
<section class="team-section">
  <div class="team-inner">
    <div class="section-header">
      <span class="section-label">The People</span>
      <h2>Meet the Founders</h2>
      <p>The hearts and minds behind every line of code.</p>
    </div>
    <div class="team-grid">
      <div class="team-card">
        <div class="team-img-wrap">
          <img src="/Assets/images/Ceo.jpg" alt="Yogesh Pal">
          <div class="team-social">
            <a href="https://www.linkedin.com/in/pal-yogesh" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="https://yogesh-pal.netlify.app/" target="_blank"><i class="fa-solid fa-globe"></i></a>
          </div>
        </div>
        <div class="team-info">
          <h5>Yogesh Pal</h5>
          <span class="team-role">Co-Founder & CEO</span>
          <p>Expert in user-centric design, scalable architecture, and building products people love.</p>
        </div>
      </div>
      <div class="team-card">
        <div class="team-img-wrap">
          <img src="/Assets/images/girl-happy-portrait-user-profile-by-ai_1119669-10.jpg" alt="Kamna Rajput">
          <div class="team-social">
            <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="#"><i class="fa-brands fa-github"></i></a>
          </div>
        </div>
        <div class="team-info">
          <h5>Kamna Rajput</h5>
          <span class="team-role">Co-Founder & CTO</span>
          <p>Software engineer focused on high-performance filtering engines and real-time data systems.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="about-cta">
  <div class="about-cta-inner">
    <div class="cta-glow"></div>
    <span class="section-label" style="color:rgba(255,255,255,0.5)">Get Started</span>
    <h2>Ready to never circle the block again?</h2>
    <p>Join 50,000+ drivers who park smarter every day with AuraPark.</p>
    <div class="cta-actions">
      <a routerLink="/find-parking" class="cta-primary"><i class="fa-solid fa-magnifying-glass-location me-2"></i>Find Parking</a>
      <a routerLink="/add-parking" class="cta-outline"><i class="fa-solid fa-plus me-2"></i>List Your Spot</a>
    </div>
  </div>
</section>
  `,
  styles: [`
    /* Hero */
    .about-hero { position: relative; background: #0a0a0a; padding: 160px 24px 80px; text-align: center; overflow: hidden; }
    .hero-bg-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 40px 40px; }
    .about-hero-inner { position: relative; max-width: 800px; margin: 0 auto; }
    .about-badge { display: inline-block; background: rgba(171,17,17,0.15); color: #ff6b6b; border: 1px solid rgba(171,17,17,0.3); border-radius: 50px; font-size: 0.75rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 6px 18px; margin-bottom: 24px; }
    .about-hero h1 { font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 900; color: white; line-height: 1.15; margin-bottom: 20px; letter-spacing: -1px; }
    .hero-highlight { background: linear-gradient(135deg, #AB1111, #ff4b4b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .about-hero p { color: rgba(255,255,255,0.5); font-size: 1.1rem; line-height: 1.7; margin-bottom: 48px; }
    .hero-stats { display: flex; align-items: center; justify-content: center; gap: 0; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 24px 32px; flex-wrap: wrap; gap: 8px; }
    .hs { text-align: center; padding: 0 24px; display: flex; flex-direction: column; }
    .hs-num { font-size: 1.8rem; font-weight: 900; color: white; line-height: 1; }
    .hs-label { font-size: 0.72rem; color: rgba(255,255,255,0.4); margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
    .hs-div { width: 1px; height: 40px; background: rgba(255,255,255,0.1); }

    /* Story */
    .story-section { background: #fff; padding: 80px 24px; }
    .story-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
    .story-img-wrap { position: relative; }
    .story-img-wrap img { width: 100%; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.1); }
    .story-img-badge { position: absolute; bottom: 20px; left: 20px; background: white; border-radius: 14px; padding: 12px 18px; display: flex; align-items: center; gap: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); font-weight: 700; color: #AB1111; }
    .story-img-badge i { font-size: 1.2rem; }
    .section-label { font-size: 0.72rem; font-weight: 700; color: #AB1111; letter-spacing: 2px; text-transform: uppercase; display: block; margin-bottom: 12px; }
    .story-content h2 { font-size: 1.9rem; font-weight: 800; color: #0f172a; line-height: 1.3; margin-bottom: 20px; }
    .text-red { color: #AB1111; }
    .story-content p { color: #64748b; font-size: 0.95rem; line-height: 1.8; margin-bottom: 16px; }
    .story-tags { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 24px; }
    .story-tags span { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 50px; padding: 6px 16px; font-size: 0.82rem; font-weight: 600; color: #475569; display: flex; align-items: center; gap: 6px; }
    .story-tags span i { color: #AB1111; }

    /* Values */
    .values-section { background: #f8fafc; padding: 80px 24px; }
    .values-inner { max-width: 1100px; margin: 0 auto; }
    .section-header { text-align: center; margin-bottom: 48px; }
    .section-header h2 { font-size: 2.4rem; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
    .section-header p { color: #64748b; font-size: 1rem; }
    .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .value-card { background: white; border-radius: 20px; padding: 28px; border: 1px solid #f1f5f9; transition: all 0.3s ease; }
    .value-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.07); border-color: #e2e8f0; }
    .value-icon { width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
    .value-icon i { font-size: 1.2rem; }
    .value-card h5 { font-size: 1rem; font-weight: 800; color: #1e293b; margin-bottom: 8px; }
    .value-card p { font-size: 0.87rem; color: #64748b; line-height: 1.7; margin: 0; }

    /* Team */
    .team-section { background: white; padding: 80px 24px; }
    .team-inner { max-width: 900px; margin: 0 auto; }
    .team-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
    .team-card { background: #f8fafc; border-radius: 24px; overflow: hidden; border: 1px solid #f1f5f9; transition: all 0.3s ease; }
    .team-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
    .team-img-wrap { position: relative; overflow: hidden; }
    .team-img-wrap img { width: 100%; height: 280px; object-fit: cover; object-position: top; display: block; transition: transform 0.4s ease; }
    .team-card:hover .team-img-wrap img { transform: scale(1.04); }
    .team-social { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.7)); padding: 20px 16px 14px; display: flex; gap: 10px; transform: translateY(100%); transition: transform 0.3s ease; }
    .team-card:hover .team-social { transform: translateY(0); }
    .team-social a { width: 34px; height: 34px; background: rgba(255,255,255,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; font-size: 0.85rem; backdrop-filter: blur(4px); transition: background 0.2s; }
    .team-social a:hover { background: #AB1111; }
    .team-info { padding: 24px; }
    .team-info h5 { font-size: 1.1rem; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
    .team-role { font-size: 0.75rem; font-weight: 700; color: #AB1111; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 10px; }
    .team-info p { font-size: 0.87rem; color: #64748b; line-height: 1.7; margin: 0; }

    /* CTA */
    .about-cta { background: #0a0a0a; padding: 100px 24px; text-align: center; position: relative; overflow: hidden; }
    .cta-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 300px; background: radial-gradient(ellipse, rgba(171,17,17,0.2), transparent 70%); pointer-events: none; }
    .about-cta-inner { position: relative; max-width: 700px; margin: 0 auto; }
    .about-cta h2 { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900; color: white; margin: 16px 0; letter-spacing: -1px; }
    .about-cta p { color: rgba(255,255,255,0.5); font-size: 1rem; margin-bottom: 40px; }
    .cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    .cta-primary { background: #AB1111; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; text-decoration: none; font-size: 0.95rem; transition: all 0.2s; }
    .cta-primary:hover { background: #8f0e0e; transform: translateY(-2px); color: white; }
    .cta-outline { background: transparent; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; text-decoration: none; font-size: 0.95rem; border: 1.5px solid rgba(255,255,255,0.25); transition: all 0.2s; }
    .cta-outline:hover { border-color: white; background: rgba(255,255,255,0.05); color: white; }

    /* Responsive */
    @media (max-width: 768px) {
      .story-inner { grid-template-columns: 1fr; gap: 32px; }
      .values-grid { grid-template-columns: 1fr 1fr; }
      .team-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
      .hero-stats { gap: 4px; padding: 20px 16px; }
      .hs { padding: 0 12px; }
      .hs-num { font-size: 1.4rem; }
    }
    @media (max-width: 480px) {
      .values-grid { grid-template-columns: 1fr; }
      .hs-div { display: none; }
      .hero-stats { gap: 16px; }
    }
  `]
})
export class AboutComponent {}
