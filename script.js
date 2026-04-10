/*
  JavaScript for the Kiddicare website.
  Handles mobile navigation toggling and booking form interactions.
*/


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
