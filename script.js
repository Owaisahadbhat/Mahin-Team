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
  { name: "Rahul Mehta", country: "🇮🇳 Mumbai, India", role: "Founder – TechNova Solutions", text: "Mahin & Team built our entire SaaS dashboard from scratch. The quality of work, attention to detail, and communication was exceptional. Highly recommended for any serious project.", stars: 4.5, color: "#6366f1" },
  { name: "Priya Nair", country: "🇮🇳 Bangalore, India", role: "CEO – GreenCart India", text: "We hired them for our e-commerce platform and they delivered beyond expectations. The site loads fast, looks premium, and our sales are up 38% since launch.", stars: 4.5, color: "#10b981" },
  { name: "Arjun Kapoor", country: "🇮🇳 Delhi, India", role: "Director – Kapoor Enterprises", text: "Our business management system is now fully automated. They understood our workflow perfectly and built exactly what we needed. Professional and reliable throughout.", stars: 4, color: "#f59e0b" },
  { name: "Sneha Iyer", country: "🇮🇳 Chennai, India", role: "Co-Founder – EduPath", text: "The learning platform they developed is clean, fast, and students love it. The mobile experience is top notch. Will definitely work with them again.", stars: 4.5, color: "#ec4899" },
  { name: "Vikram Singh", country: "🇮🇳 Hyderabad, India", role: "CTO – PayEase Fintech", text: "Built us a fintech dashboard with real-time tracking and reporting. Code is clean, UI is intuitive, and delivered on time and on budget. Great experience.", stars: 4, color: "#06b6d4" },
  { name: "Anjali Sharma", country: "🇮🇳 Pune, India", role: "Owner – StyleHouse Boutique", text: "My Shopify store redesign was handled perfectly. The new look is stunning and my customers keep complimenting it. Conversions are up noticeably since the revamp.", stars: 4.5, color: "#8b5cf6" },
  { name: "Rohan Desai", country: "🇮🇳 Ahmedabad, India", role: "Founder – LogiTrack", text: "Complex logistics system delivered flawlessly. Real-time driver tracking, route optimization, and automated billing all work perfectly. Incredibly skilled team.", stars: 3.5, color: "#f97316" },
  { name: "Meera Krishnan", country: "🇮🇳 Kochi, India", role: "Marketing Head – BrandBoost", text: "The SEO work pushed our websites to page one of Google within 6 weeks. Organic traffic doubled. These guys really know their stuff inside out.", stars: 4, color: "#14b8a6" },
  { name: "Suresh Patel", country: "🇮🇳 Surat, India", role: "Owner – Patel Textiles Online", text: "They migrated our whole business online with a beautiful e-commerce store. Orders started coming in within days of launch. Very smooth experience from start to finish.", stars: 4.5, color: "#a855f7" },
  { name: "Kavya Reddy", country: "🇮🇳 Bangalore, India", role: "Founder – FitLife App", text: "Our fitness tracking app looks and works like a premium product. Users love the interface and the backend is solid. The team was responsive and easy to work with.", stars: 4, color: "#e879f9" },
  { name: "Deepak Joshi", country: "🇮🇳 Jaipur, India", role: "CEO – RealEstate360", text: "Built us a property listing portal with advanced filters, map integration, and agent dashboard. Everything works perfectly. Our leads have tripled since launching.", stars: 4.5, color: "#22d3ee" },
  { name: "Nisha Gupta", country: "🇮🇳 Lucknow, India", role: "Co-Founder – Medibook", text: "The hospital appointment booking system they built is handling hundreds of bookings daily without issues. Clean UI and robust backend. Highly professional team.", stars: 4, color: "#fb7185" },
  { name: "Aakash Verma", country: "🇮🇳 Noida, India", role: "CTO – CloudStack India", text: "Their cloud infrastructure setup saved us significant costs. Auto-scaling, monitoring, CI/CD pipelines all configured perfectly. These guys know DevOps inside out.", stars: 4.5, color: "#34d399" },
  { name: "Pooja Menon", country: "🇮🇳 Mumbai, India", role: "Founder – CraftBay", text: "My handcraft marketplace is now live and getting orders daily. The product upload flow, payment integration, and seller dashboard are all excellent. Very happy!", stars: 4, color: "#f472b6" },
  { name: "Siddharth Rao", country: "🇮🇳 Pune, India", role: "Director – EduTech Hub", text: "Video course platform with quizzes, certificates, and progress tracking delivered perfectly. Students love the experience and completion rates have gone up significantly.", stars: 4.5, color: "#818cf8" },
  { name: "Harpreet Kaur", country: "🇮🇳 Chandigarh, India", role: "Owner – KaurFashions", text: "The Shopify store they built for us looks absolutely premium. Sales have improved and customers keep saying the shopping experience is smooth and enjoyable.", stars: 4, color: "#fbbf24" },
  { name: "Manish Tiwari", country: "🇮🇳 Bhopal, India", role: "Founder – QuickBite", text: "Food delivery app launched on time with all features working perfectly. Real-time tracking, restaurant dashboards, and driver app all seamlessly integrated.", stars: 3.5, color: "#60a5fa" },
  { name: "Ritu Agarwal", country: "🇮🇳 Delhi, India", role: "CEO – GrowthMedia", text: "The digital marketing dashboard they built gives us real-time insights on all campaigns. The UI is clean and our team adapted to it within a day. Excellent work.", stars: 4, color: "#a78bfa" },
  { name: "Kiran Bhat", country: "🇮🇳 Mangalore, India", role: "Freelancer & Agency Owner", text: "I outsource client projects to Mahin & Team regularly. Their code quality is consistently high and they always meet deadlines. A reliable development partner.", stars: 4.5, color: "#2dd4bf" },
  { name: "Sunita Pillai", country: "🇮🇳 Trivandrum, India", role: "Co-Founder – HealthFirst", text: "Our telemedicine platform was built with care and precision. Video consultations, prescription management, and billing all work flawlessly. Patients love it.", stars: 4, color: "#fb923c" },
  { name: "Gaurav Saxena", country: "🇮🇳 Indore, India", role: "Founder – AutoDeal", text: "The car listing and booking platform is exactly what we envisioned. Smooth UI, fast search, and great mobile experience. Revenue picked up within the first month.", stars: 4.5, color: "#e879f9" },
  { name: "Divya Nambiar", country: "🇮🇳 Kochi, India", role: "Owner – BlossomWeddings", text: "My wedding planning website is stunning and has brought in multiple clients already. The gallery, booking form, and WhatsApp integration work perfectly together.", stars: 4, color: "#f9a8d4" },
  { name: "James Richardson", country: "🇺🇸 New York, USA", role: "CEO – Nexus Digital Agency", text: "We outsource overflow development to Mahin & Team regularly. Code quality is excellent, communication is proactive, and delivery is always on time. True professionals.", stars: 4.5, color: "#6366f1" },
  { name: "Lena Hoffmann", country: "🇩🇪 Berlin, Germany", role: "Founder – CloudBase SaaS", text: "The backend architecture handles thousands of concurrent users without issues. Rock solid engineering, clean API design, and great documentation. Very impressed.", stars: 4, color: "#10b981" },
  { name: "Yuki Tanaka", country: "🇯🇵 Tokyo, Japan", role: "CTO – SwiftChat", text: "The real-time chat application is production-grade. WebSocket performance is smooth even under load. Genuinely impressed by the technical depth of this team.", stars: 4.5, color: "#f59e0b" },
  { name: "Isabella Ferreira", country: "🇧🇷 São Paulo, Brazil", role: "E-Commerce Manager – ModaOnline", text: "Our mobile shopping app doubled revenue in 60 days. The checkout experience is seamless and conversion rate improved by 35%. Outstanding work.", stars: 4, color: "#ec4899" },
  { name: "Ahmed Al-Rashid", country: "🇦🇪 Dubai, UAE", role: "Director – PropTech Gulf", text: "Delivered a stunning real estate app with map integration and virtual tours in just 4 weeks. The design is world class and clients are very impressed.", stars: 4.5, color: "#06b6d4" },
  { name: "Sophie Laurent", country: "🇫🇷 Paris, France", role: "Owner – MaisonLux", text: "The luxury fashion store they built perfectly represents our brand. Elegant design, fast performance, and smooth checkout. Our international customers love it.", stars: 4, color: "#8b5cf6" },
  { name: "Carlos Mendez", country: "🇲🇽 Mexico City, Mexico", role: "Founder – DeliveryMex", text: "Food delivery app built for the Mexican market with Spanish support and local payment gateways. Everything works perfectly. The team adapted quickly to our requirements.", stars: 3.5, color: "#f97316" },
  { name: "Aiko Yamamoto", country: "🇯🇵 Osaka, Japan", role: "CEO – NipponShop", text: "E-commerce platform with Japanese language support and local payment integration delivered perfectly. The team handled complex requirements with ease.", stars: 4, color: "#14b8a6" },
  { name: "Ethan Brooks", country: "🇨🇦 Toronto, Canada", role: "Marketing Agency CEO – GrowthPeak", text: "SEO results were visible within the first month. Organic traffic up 120% and keyword rankings improved dramatically. The ROI has been incredible for our clients.", stars: 4.5, color: "#a855f7" },
  { name: "Fatima Al-Zahra", country: "🇸🇦 Riyadh, Saudi Arabia", role: "Founder – HalaalMart", text: "The online grocery platform handles our entire inventory, orders, and delivery management. Arabic RTL support was implemented perfectly. Very professional team.", stars: 4, color: "#e879f9" },
  { name: "Natalie White", country: "🇦🇺 Sydney, Australia", role: "Owner – TravelNest", text: "Beautiful travel booking website with payment integration and hotel listings. Within 2 months of launch we saw a 60% increase in online bookings. Excellent value.", stars: 4.5, color: "#22d3ee" },
  { name: "Marco Rossi", country: "🇮🇹 Milan, Italy", role: "CEO – ItalStyle", text: "The fashion e-commerce site they built for us captures our brand perfectly. International shipping, multi-currency support, and a gorgeous design. We are very satisfied.", stars: 4, color: "#fb7185" }
];

/* ── Build Testimonial Marquees ── */
function buildTestiCard(t) {
  const fullStars = Math.floor(t.stars);
  const halfStar = t.stars % 1 >= 0.5 ? '½' : '';
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  const stars = '★'.repeat(fullStars) + (halfStar ? '⯨' : '') + '☆'.repeat(emptyStars);
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
