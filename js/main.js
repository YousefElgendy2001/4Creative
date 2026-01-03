/* ================= Global Variables ================= */
let currentIndex = 0;
let track;
let cards;


  /* Preloader */
  window.onload = () => {
    document.getElementById("preloader").style.display = "none";
  };
/* ================= DOM Loaded ================= */
document.addEventListener('DOMContentLoaded', () => {

  /* Load Saved Settings */
  const savedMode = localStorage.getItem('mode') || 'light';
  const savedLang = localStorage.getItem('lang') || 'en';
  applyMode(savedMode);
  applyLang(savedLang);

  /* Navbar Scroll */
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    window.scrollY > 50
      ? navbar.classList.add('scrolled')
      : navbar.classList.remove('scrolled');
  });

  /* Fade-Up Animation (GLOBAL) */
  const fadeElements = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('show');
          }, index * 120);
        }
      });
    },
    { threshold: 0.2 }
  );
  fadeElements.forEach(el => fadeObserver.observe(el));

  /* Counter Animation */
  const counters = document.querySelectorAll('.counter');
  let started = false;

  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          counters.forEach(counter => {
            const target = +counter.dataset.target;
            let count = 0;
            const speed = target / 100;

            const updateCounter = () => {
              count += speed;
              if (count < target) {
                counter.textContent = Math.ceil(count);
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target;
              }
            };
            updateCounter();
          });
          started = true;
        }
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll('.why-numbers')
    .forEach(sec => counterObserver.observe(sec));

  /* Testimonials Init */
  track = document.querySelector('.testimonial-track');
  cards = document.querySelectorAll('.testimonial-card');

  setInterval(nextTestimonial, 5000);
});







/* ================= Testimonials Slider ================= */
function updateSlider() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextTestimonial() {
  currentIndex = (currentIndex + 1) % cards.length;
  updateSlider();
}

function prevTestimonial() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateSlider();
}


/* ================= Language ================= */
function toggleLang() {
  const newLang = localStorage.getItem('lang') === 'ar' ? 'en' : 'ar';
  localStorage.setItem('lang', newLang);
  applyLang(newLang);
}

function applyLang(lang) {
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.querySelector('.hero h1').innerHTML =
      'إحنا بنبني <span>براندات</span><br>وبنسوّق بذكاء<br>وبنبرمج حلول';
    document.querySelector('.hero p').innerText =
      'شركة تسويق وبرمجة بنحوّل أفكارك لنتايج حقيقية.';
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.querySelector('.hero h1').innerHTML =
      'We Build <span>Brands</span><br>We Market Smart<br>We Code Solutions';
    document.querySelector('.hero p').innerText =
      'Digital marketing & development agency helping businesses grow with creative strategies.';
  }
}


/* ================= Dark / Light Mode ================= */
function toggleMode() {
  const mode = localStorage.getItem('mode') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('mode', mode);
  applyMode(mode);
}

function applyMode(mode) {
  const body = document.body;
  const logo = document.getElementById('logo');

  if (mode === 'dark') {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    logo.src = 'images/4logodarkmood.png';
  } else {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    logo.src = 'images/4logolightmood.png';
  }
}


