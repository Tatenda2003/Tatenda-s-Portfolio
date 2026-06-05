document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  const checkScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Check on init

  // --- Mobile Navigation Menu Toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navbar.classList.toggle('mobile-open');
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navbar.classList.remove('mobile-open');
      });
    });
  }

  // --- Projects Category Filtering ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          // Add subtle fade-in animation
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Contact Form Submission Handling ---
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop standard form submission
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      
      // Update button state to loading
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';
      formStatus.style.display = 'none';
      formStatus.className = 'form-status';

      // Gather form values (simulated send)
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Simulate network request latency (1.2s)
      setTimeout(() => {
        if (name && email && subject && message) {
          // Success case simulation
          formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`;
          formStatus.classList.add('success');
          contactForm.reset();
        } else {
          // Failure case (unlikely due to HTML5 validation, but good fallback)
          formStatus.textContent = 'An error occurred. Please ensure all form fields are filled correctly.';
          formStatus.classList.add('error');
        }
        
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }, 1200);
    });
  }
});
