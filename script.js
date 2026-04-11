/*
  JavaScript for the Kiddicare website.
  Handles mobile navigation toggling and booking form interactions.
*/

// Carousel functionality
class Carousel {
  constructor() {
    this.slides = document.querySelectorAll('.carousel-slide');
    this.indicators = document.querySelectorAll('.carousel-indicator');
    this.prevBtn = document.querySelector('.carousel-prev');
    this.nextBtn = document.querySelector('.carousel-next');
    this.currentSlide = 0;

    if (this.slides.length === 0) return;

    this.prevBtn?.addEventListener('click', () => this.previousSlide());
    this.nextBtn?.addEventListener('click', () => this.nextSlide());
    this.indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.dataset.slide);
        this.goToSlide(slideIndex);
      });
    });

    // Auto-advance carousel every 8 seconds
    this.autoAdvance = setInterval(() => this.nextSlide(), 8000);

    // Pause auto-advance on user interaction
    [this.prevBtn, this.nextBtn, ...this.indicators].forEach(element => {
      element?.addEventListener('click', () => this.resetAutoAdvance());
    });
  }

  updateCarousel() {
    this.slides.forEach((slide, index) => {
      slide.classList.remove('active');
      if (this.indicators[index]) {
        this.indicators[index].classList.remove('active');
      }
    });

    this.slides[this.currentSlide].classList.add('active');
    if (this.indicators[this.currentSlide]) {
      this.indicators[this.currentSlide].classList.add('active');
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateCarousel();
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateCarousel();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateCarousel();
  }

  resetAutoAdvance() {
    clearInterval(this.autoAdvance);
    this.autoAdvance = setInterval(() => this.nextSlide(), 8000);
  }
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new Carousel());
} else {
  new Carousel();
}

const navToggleButtons = document.querySelectorAll('.nav-toggle');
const navMenus = document.querySelectorAll('.nav-menu');

navToggleButtons.forEach((toggle) => {
  const menuId = toggle.getAttribute('aria-controls');
  const menu = document.getElementById(menuId);

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isExpanded));
    menu.classList.toggle('show');
  });
});

const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach((toggle) => {
  const menu = toggle.nextElementSibling;
  const navItem = toggle.parentElement;

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isExpanded));
    menu.classList.toggle('open');
  });
});

// Close dropdowns when clicking outside of them
document.addEventListener('click', (event) => {
  dropdownToggles.forEach((toggle) => {
    const menu = toggle.nextElementSibling;
    const navItem = toggle.parentElement;
    
    // Only close if click is outside both the toggle button and the dropdown menu
    if (!navItem.contains(event.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    }
  });
});

const bookingForm = document.getElementById('service-booking-form');
const bookingSummary = document.querySelector('.booking-summary');
const contactForm = document.getElementById('contact-form');

if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const serviceType = formData.get('serviceType');
    const childAge = formData.get('childAge');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const preferredTime = formData.get('preferredTime');
    const childrenCount = formData.get('childrenCount');
    const notes = formData.get('notes');

    if (!serviceType || !startDate || !endDate || !childAge || !preferredTime || !childrenCount) {
      bookingSummary.textContent = 'Please complete all required fields before submitting your booking request.';
      return;
    }

    bookingSummary.innerHTML = `
      <h4>Booking Request Submitted</h4>
      <p><strong>Service:</strong> ${formatServiceType(serviceType)}</p>
      <p><strong>Child age:</strong> ${childAge}</p>
      <p><strong>Dates:</strong> ${formatDate(startDate)} to ${formatDate(endDate)}</p>
      <p><strong>Time window:</strong> ${preferredTime}</p>
      <p><strong>Children in care:</strong> ${childrenCount}</p>
      ${notes ? `<p><strong>Notes:</strong> ${escapeText(notes)}</p>` : ''}
      <p>Our team will contact you soon to confirm your caregiver match.</p>
    `;

    bookingForm.reset();
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you for reaching out! We will reply to your message shortly.');
    contactForm.reset();
  });
}

function formatServiceType(type) {
  const serviceMap = {
    nanny: 'Nanny Services',
    babysitter: 'Babysitter Services',
    daycare: 'Daycare Services',
    'tour-guide': 'Child Tour Guide Services',
  };
  return serviceMap[type] || 'Child Care Service';
}

function formatDate(value) {
  const date = new Date(value);
  return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
}

function escapeText(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
