/* ===================================================
   MAHIN & TEAM — script.js
=================================================== */

/* ── Theme Toggle ── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('mat-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('mat-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

/* ── Navbar Scroll Effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ── Animated Counters ── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1800;
  const start = performance.now();
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter, .hstat-num').forEach(el => counterObserver.observe(el));

/* ── Fade-in Scroll Animations ── */
const fadeEls = document.querySelectorAll('.service-card, .proj-card, .cinfo-item, .about-text, .section-header');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${(Array.from(fadeEls).indexOf(entry.target) % 4) * 0.08}s`;
      entry.target.classList.add('fade-in', 'visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => { el.classList.add('fade-in'); fadeObserver.observe(el); });

/* ── Project Filter ── */
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.proj-card').forEach(card => {
      const cat = card.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'card-in 0.4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ── Project Data ── */
const projectData = [
  {
    title: "E-Commerce Website",
    gradient: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    icon: "fa-cart-shopping",
    desc: "A fully-featured e-commerce platform with product management, secure payment integration (Stripe & PayPal), real-time inventory tracking, and a powerful admin dashboard. Built for scalability and performance to handle thousands of concurrent users.",
    features: [
      "User authentication and JWT-based sessions",
      "Product search with filters and real-time suggestions",
      "Stripe & PayPal payment gateway integration",
      "Admin dashboard with sales analytics",
      "Order tracking and email notifications",
      "Mobile-responsive product gallery with zoom",
      "Customer review and rating system"
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "JWT", "Redux"],
    feedback: {
      text: "Mahin and his team delivered an exceptional e-commerce platform. The UI is stunning, performance is blazing fast, and the admin dashboard is incredibly intuitive. Exceeded every expectation!",
      name: "James Richardson",
      country: "🇺🇸 United States",
      stars: 5
    }
  },
  {
    title: "Food Delivery App",
    gradient: "linear-gradient(135deg,#f97316,#ef4444)",
    icon: "fa-utensils",
    desc: "A cross-platform food delivery application connecting customers, restaurants, and delivery drivers in real time. Features live map tracking, push notifications, and seamless order management from kitchen to doorstep.",
    features: [
      "Real-time order tracking with live map view",
      "Driver assignment and routing algorithm",
      "Restaurant onboarding and menu management",
      "Push notifications for order updates",
      "Multiple payment methods (card, wallet, COD)",
      "In-app chat between customer and driver",
      "Ratings and reviews for restaurants"
    ],
    tech: ["Flutter", "Firebase", "Google Maps API", "Stripe", "FCM", "Dart"],
    feedback: {
      text: "Our food delivery app launched ahead of schedule and completely transformed our operations. The real-time tracking is smooth, and our customers absolutely love the interface. Worth every penny!",
      name: "Aisha Patel",
      country: "🇬🇧 United Kingdom",
      stars: 5
    }
  },
  {
    title: "Portfolio Builder Tool",
    gradient: "linear-gradient(135deg,#06b6d4,#3b82f6)",
    icon: "fa-id-card",
    desc: "A drag-and-drop portfolio builder for developers and creatives to create beautiful, shareable portfolio websites without writing code. Features pre-built templates, custom color themes, and one-click export to HTML.",
    features: [
      "Drag-and-drop section editor",
      "12+ professional templates",
      "Custom color themes and fonts",
      "Real-time live preview",
      "One-click HTML/CSS export",
      "GitHub integration for projects",
      "Custom domain support"
    ],
    tech: ["HTML5", "CSS3", "Vanilla JS", "LocalStorage", "Canvas API"],
    feedback: {
      text: "I built my entire portfolio in under 30 minutes! The drag-and-drop builder is incredibly smooth and the templates are gorgeous. Got 3 job interviews from my new portfolio within a week.",
      name: "Carlos Mendez",
      country: "🇪🇸 Spain",
      stars: 5
    }
  },
  {
    title: "Hospital Management System",
    gradient: "linear-gradient(135deg,#10b981,#06b6d4)",
    icon: "fa-hospital",
    desc: "A comprehensive HMS covering patient registration, appointment scheduling, lab reports, billing, pharmacy management, and staff administration. Designed to digitalize and streamline hospital operations end-to-end.",
    features: [
      "Patient registration and medical history",
      "Doctor appointment scheduling system",
      "Lab test requests and result management",
      "Automated billing and insurance processing",
      "Pharmacy inventory management",
      "Staff attendance and payroll",
      "Detailed financial reports and analytics"
    ],
    tech: ["PHP", "MySQL", "Bootstrap", "jQuery", "AJAX", "FPDF"],
    feedback: {
      text: "This system has completely digitalized our hospital. The billing module alone saved us 15 hours per week, and the patient portal has dramatically improved our satisfaction scores. Exceptional work!",
      name: "Dr. Nadia Al-Hassan",
      country: "🇦🇪 UAE",
      stars: 5
    }
  },
  {
    title: "Chat Application",
    gradient: "linear-gradient(135deg,#8b5cf6,#ec4899)",
    icon: "fa-comments",
    desc: "A real-time messaging platform supporting private chats, group rooms, file sharing, and video calls. Built with Socket.io for low-latency communication and end-to-end encryption for privacy.",
    features: [
      "Real-time private and group messaging",
      "File and image sharing with preview",
      "Typing indicators and read receipts",
      "Message search and history",
      "User presence and online status",
      "End-to-end message encryption",
      "Emoji reactions and message threading"
    ],
    tech: ["Node.js", "Socket.io", "Express", "MongoDB", "WebRTC", "JWT"],
    feedback: {
      text: "We integrated this chat app into our SaaS product and it works flawlessly. The real-time features are rock solid, delivery is instant, and the code quality is excellent. Highly recommend this team!",
      name: "Lena Hoffmann",
      country: "🇩🇪 Germany",
      stars: 5
    }
  },
  {
    title: "Online Learning Platform",
    gradient: "linear-gradient(135deg,#f59e0b,#f97316)",
    icon: "fa-graduation-cap",
    desc: "A full-featured learning management system where instructors create and sell video courses, and students track progress, take quizzes, earn certificates, and collaborate through discussion forums.",
    features: [
      "Video course creation and management",
      "Interactive quizzes and assignments",
      "Automatic certificate generation",
      "Student progress tracking and analytics",
      "Discussion forums and Q&A sections",
      "Instructor revenue dashboard",
      "Subscription and one-time payment models"
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "AWS S3", "Stripe", "Redux Toolkit"],
    feedback: {
      text: "Our online course platform launched with 500+ students in the first month. The video streaming is flawless, the certificate system is professional, and students constantly compliment the learning experience.",
      name: "Prof. Sarah Kimani",
      country: "🇰🇪 Kenya",
      stars: 5
    }
  }
];

/* ── Project Modal ── */
const projectModal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('click', () => {
    const idx = parseInt(card.getAttribute('data-project'));
    const p = projectData[idx];
    const stars = '★'.repeat(p.feedback.stars);
    modalContent.innerHTML = `
      <div class="modal-img" style="background:${p.gradient}">
        <i class="fa-solid ${p.icon}"></i>
      </div>
      <div class="modal-body">
        <h2>${p.title}</h2>
        <p class="modal-desc">${p.desc}</p>
        <div class="modal-section">
          <h4>Key Features</h4>
          <ul class="modal-features">
            ${p.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>
        <div class="modal-section">
          <h4>Technologies Used</h4>
          <div class="modal-tech">
            ${p.tech.map(t => `<span>${t}</span>`).join('')}
          </div>
        </div>
        <div class="modal-section">
          <h4>Client Feedback</h4>
          <div class="modal-feedback">
            <p>"${p.feedback.text}"</p>
            <div class="fb-author">
              <div>
                <div class="fb-name">${p.feedback.name}</div>
                <small style="color:var(--text3)">${p.feedback.country}</small>
              </div>
              <div class="fb-stars">${stars}</div>
            </div>
          </div>
        </div>
      </div>
    `;
    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

modalClose.addEventListener('click', closeModal);
projectModal.addEventListener('click', e => { if (e.target === projectModal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function closeModal() {
  projectModal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Testimonials Data ── */
const testimonials = [
  { name: "James Richardson", country: "USA", role: "Startup Founder", text: "Absolutely outstanding work. The team delivered a pixel-perfect website that boosted our conversions by 40%. Professional, communicative, and talented!", stars: 5, color: "#6366f1" },
  { name: "Aisha Patel", country: "UK", role: "E-Commerce Owner", text: "Best freelance team I've ever worked with. They understood our vision instantly and delivered beyond expectations. Will definitely hire again!", stars: 5, color: "#10b981" },
  { name: "Carlos Mendez", country: "Spain", role: "Digital Agency", text: "Mahin and team are absolute legends. Fast turnaround, clean code, and stunning design. My clients are blown away every single time.", stars: 5, color: "#f59e0b" },
  { name: "Lena Hoffmann", country: "Germany", role: "SaaS Founder", text: "The backend architecture they built is rock solid. Handles thousands of users without breaking a sweat. Truly world-class engineers.", stars: 5, color: "#ec4899" },
  { name: "Dr. Nadia Al-Hassan", country: "UAE", role: "Healthcare Director", text: "Our hospital management system transformed our operations entirely. The team was professional, punctual, and delivered every feature we asked for.", stars: 5, color: "#06b6d4" },
  { name: "Prof. Sarah Kimani", country: "Kenya", role: "EdTech Entrepreneur", text: "The learning platform they built for us is on par with Udemy in terms of UI and functionality. Remarkable talent for such a young team!", stars: 5, color: "#8b5cf6" },
  { name: "Mohammed Al-Farsi", country: "Qatar", role: "Real Estate App Owner", text: "Delivered a stunning property listing app in just 3 weeks. The attention to detail in the UI/UX is incredible. Highly recommended!", stars: 5, color: "#f97316" },
  { name: "Sofia Rossi", country: "Italy", role: "Restaurant Chain Owner", text: "Our food delivery app is getting 5-star reviews everywhere. The real-time tracking feature is buttery smooth. Thank you, Mahin & Team!", stars: 5, color: "#ef4444" },
  { name: "Ethan Brooks", country: "Canada", role: "Marketing Agency CEO", text: "SEO results were visible within the first month. Organic traffic up 120%, keyword rankings improved dramatically. ROI has been incredible.", stars: 5, color: "#14b8a6" },
  { name: "Yuki Tanaka", country: "Japan", role: "Tech Startup CTO", text: "The chat application they built for us is production-grade and handles edge cases I didn't even think of. Genuinely impressed by the quality.", stars: 5, color: "#a855f7" },
  { name: "Fatima Ouali", country: "France", role: "Fashion Brand Owner", text: "My Shopify-like store is now getting 200+ daily orders. The performance optimization they did reduced load time from 6s to under 1s. Amazing!", stars: 5, color: "#e879f9" },
  { name: "David Osei", country: "Ghana", role: "FinTech Founder", text: "Built a complete fintech dashboard with charts, transactions, and reports. The code quality is excellent and the UI is incredibly polished.", stars: 5, color: "#22d3ee" },
  { name: "Priya Sharma", country: "India", role: "EdTech CEO", text: "10 out of 10. The team is responsive, skilled, and genuinely cares about your project success. Our platform launched ahead of schedule!", stars: 5, color: "#fb923c" },
  { name: "Ryan O'Brien", country: "Ireland", role: "Gym App Developer", text: "Hired them for a fitness tracking app and was blown away. The UI design by Toheed is exceptional. Looks like a big-budget Silicon Valley product.", stars: 5, color: "#4ade80" },
  { name: "Amara Diallo", country: "Senegal", role: "NGO Director", text: "They built our donation platform pro bono partially, showing genuine care for social causes. The platform raised $50K in its first month.", stars: 5, color: "#f472b6" },
  { name: "Lucas Schmidt", country: "Austria", role: "B2B SaaS Founder", text: "Our dashboard is getting compliments from every user. The data visualization work is particularly impressive. Top-tier quality at fair prices.", stars: 5, color: "#818cf8" },
  { name: "Zara Ahmed", country: "Pakistan", role: "Blogger & Influencer", text: "Got a stunning personal brand website. The animations are smooth, the design is unique, and Fayiq's SEO work got me on the first page of Google!", stars: 5, color: "#34d399" },
  { name: "Thomas Dubois", country: "Belgium", role: "Agency Director", text: "We subcontract all our overflow work to Mahin & Team. Their code is clean, well-documented, and always passes our QA process. Reliable partners.", stars: 5, color: "#60a5fa" },
  { name: "Isabella Ferreira", country: "Brazil", role: "E-Commerce Manager", text: "The mobile app they built for our fashion store doubled our mobile revenue in 60 days. The checkout flow is seamless and conversion rate is up 35%.", stars: 5, color: "#fb7185" },
  { name: "Omar Hassan", country: "Egypt", role: "Logistics Startup", text: "Complex system with real-time driver tracking, route optimization, and billing. They nailed every single requirement. A truly exceptional team!", stars: 5, color: "#a3e635" },
  { name: "Mei Lin", country: "Singapore", role: "Tech Recruiter", text: "Mahin's team built our job portal with AI-powered matching. The quality of code and the speed of delivery was impressive. 5 stars without hesitation.", stars: 5, color: "#38bdf8" },
  { name: "Advik Kapoor", country: "India", role: "Crypto Platform Owner", text: "Real-time crypto dashboard with live prices, portfolio tracking, and news feed. Works flawlessly. Umaid's testing ensured zero bugs on launch day!", stars: 5, color: "#c084fc" },
  { name: "Natalie White", country: "Australia", role: "Travel Agency Owner", text: "Beautiful travel booking website with payment integration and hotel listings. Within 2 months of launch, we saw a 60% increase in online bookings.", stars: 5, color: "#fdba74" },
  { name: "Boris Petrov", country: "Russia", role: "Gaming Platform", text: "Built a tournament management platform for esports. Real-time brackets, live scores, team management. The community absolutely loves it.", stars: 5, color: "#86efac" },
  { name: "Layla Al-Amin", country: "Kuwait", role: "Interior Design Studio", text: "The portfolio website they designed for us is absolutely breathtaking. Multiple international clients have reached out through it already. Worth every dirham!", stars: 5, color: "#fda4af" }
];

/* ── Build Testimonial Marquees ── */
function buildTestiCard(t) {
  const stars = '★'.repeat(t.stars);
  return `
    <div class="testi-card">
      <div class="testi-header">
        <div class="testi-avatar" style="background:${t.color}">${t.name.charAt(0)}</div>
        <div class="testi-meta">
          <h4>${t.name}</h4>
          <small>${t.role} · ${t.country}</small>
        </div>
      </div>
      <div class="testi-stars">${stars}</div>
      <p class="testi-text"><span class="testi-quote">"</span>${t.text}"</p>
    </div>
  `;
}

const half1 = testimonials.slice(0, Math.ceil(testimonials.length / 2));
const half2 = testimonials.slice(Math.ceil(testimonials.length / 2));

const m1 = document.getElementById('testiMarquee');
const m2 = document.getElementById('testiMarquee2');

// Double the items for seamless loop
const row1 = [...half1, ...half1].map(buildTestiCard).join('');
const row2 = [...half2, ...half2].map(buildTestiCard).join('');
m1.innerHTML = row1;
m2.innerHTML = row2;

// Pause on hover
[m1, m2].forEach(m => {
  m.addEventListener('mouseenter', () => m.style.animationPlayState = 'paused');
  m.addEventListener('mouseleave', () => m.style.animationPlayState = 'running');
});

/* ── Contact Form – WhatsApp ── */
function sendWhatsApp() {
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields before sending.');
    return;
  }

  const text = `Hello Mahin & Team! 👋\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const url = `https://wa.me/917051725336?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

/* ── Contact Form – Email ── */
function sendEmail() {
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields before sending.');
    return;
  }

  const subject = `Project Inquiry from ${name}`;
  const body = `Hi Mahin & Team,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nLooking forward to hearing from you!`;
  const mailtoUrl = `mailto:mahinandteam@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
}

/* ── Smooth active nav link highlight ── */
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
}, { passive: true });
