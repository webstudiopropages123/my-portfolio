// Kaushik Manoj Pawaskar - Portfolio Script File
// Dynamic interactivity & state management

// Project database for details modal
const projectsData = [
 {
  id: 'quiz-pro',
  title: 'Quiz Pro',
  category: 'web',
  tags: ['HTML5', 'CSS3', 'JavaScript'],
  image: 'assets/quiz%20pro.png',

  shortDesc: 'An interactive quiz application featuring HTML, CSS and JavaScript challenges.',

  fullDesc: 'Quiz Pro is a modern web-based quiz application designed for testing HTML, CSS, and JavaScript knowledge. It includes randomized questions, a countdown timer, progress tracking, score analysis, and a responsive glassmorphism interface.',

  features: [
    'Three quiz categories (HTML, CSS, JavaScript)',
    '20 randomized questions',
    '15-second timer per question',
    'Progress bar tracking',
    'Automatic score calculation',
    'Performance feedback messages',
    'Responsive glassmorphism UI',
    'Pure JavaScript implementation'
  ],

  techStack: [
    'HTML5',
    'CSS3',
    'JavaScript'
  ],

  githubUrl: 'https://github.com/webstudiopropages123/quiz-pro.git',
  liveUrl: '#'
},
  {
    id: 'shopping website',
    title: 'Shopping Website',
    category: 'web',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js'],
    image: 'assets/amazon%20clon.png',
    shortDesc: 'A premium glassmorphic web dashboard providing visual analysis of budgets, expense logging, and savings progress.',
    fullDesc: 'A modern personal finance web client featuring dynamic data visualization. It helps users gain deep insights into their spending habits. Users can set monthly budgets, categorize transactions, log items, and view detailed monthly breakdown charts. The app features offline storage capability via LocalStorage to keep user data private and fast.',
    features: [
      'User Registration and Login',
      'Product Catalog',
      'Search and Filter Functionality',
      'Shopping Cart',
      'Secure Payment System',
      'Order Management and Tracking'
    ],
    techStack: ['HTML5 Semantic Markup', 'CSS3 Custom Properties', 'Vanilla JavaScript (ES6+)', 'Chart.js Library', 'FontAwesome Icons'],
    githubUrl: 'https://github.com/webstudiopropages123/websites-demo.git',
    liveUrl: '#'
  },
  {
    id: 'college-connect',
    title: 'weather app',
    category: 'web',
    tags: ['Node.js', 'Express', 'MongoDB', 'JavaScript'],
   image: 'assets/weather%20app.png',
    shortDesc: 'A responsive weather application built with HTML, CSS, and JavaScript that displays temperature, humidity, wind speed, and weather conditions through a clean and user-friendly interface.',
    fullDesc: 'A responsive weather application that displays real-time weather information, including temperature, humidity, wind speed, and weather conditions, using a clean interface built with HTML, CSS, and JavaScript.',
    features: [
      'Search weather by city name',
      'Display temperature and weather conditions',
      'Show humidity and wind speed',
      'Responsive design for mobile and desktop',
      'Interactive and easy-to-use interface',
    ],
    techStack: ['HTML5', 'CSS3', 'javascript', ],
    githubUrl: 'https://github.com/webstudiopropages123/weatherapp.git',
    liveUrl: '#'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // THEME MANAGEMENT (DARK / LIGHT)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  // Apply default theme
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add temporary rotation animation class
    themeToggleBtn.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeToggleBtn.style.transform = '';
    }, 400);
  });

  // ==========================================
  // SCROLL REVEAL EFFECTS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealOnScroll.observe(element);
  });

  // ==========================================
  // NAVBAR SCROLL EFFECT & ACTIVE LINK
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Scroll styling
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlight
    let currentScroll = window.pageYOffset + 120; // offset for navbar height
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      
      if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ==========================================
  // MOBILE NAVIGATION MENU
  // ==========================================
  const menuBtn = document.getElementById('menu-btn');
  const navLinksContainer = document.getElementById('nav-links-container');

  menuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    // Change menu icon between bars and times
    const icon = menuBtn.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('active');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });

  // ==========================================
  // PROJECTS FILTER SYSTEM
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'flex';
          // Trigger slight reflow for entrance transition
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          // Hide after transition ends
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================
  // PROJECT MODAL DETAILS
  // ==========================================
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const viewDetailsButtons = document.querySelectorAll('.project-link-details');

  // Modal DOM elements to update
  const modalImage = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeaturesList = document.getElementById('modal-features-list');
  const modalTechChips = document.getElementById('modal-tech-chips');
  const modalGithubLink = document.getElementById('modal-github-link');
  const modalLiveLink = document.getElementById('modal-live-link');

  const openModal = (projectId) => {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    // Populate modal values
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category.toUpperCase();
    modalDesc.textContent = project.fullDesc;

    // Render features
    modalFeaturesList.innerHTML = '';
    project.features.forEach(feature => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fas fa-check-circle"></i> <span>${feature}</span>`;
      modalFeaturesList.appendChild(li);
    });

    // Render tech stack chips
    modalTechChips.innerHTML = '';
    project.techStack.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'project-tag';
      span.textContent = tech;
      modalTechChips.appendChild(span);
    });

    // Set URLs
    modalGithubLink.href = project.githubUrl;
    if (project.liveUrl === '#') {
      modalLiveLink.style.display = 'none';
    } else {
      modalLiveLink.style.display = 'inline-flex';
      modalLiveLink.href = project.liveUrl;
    }

    // Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // restore scrolling
  };

  viewDetailsButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = button.getAttribute('data-id');
      openModal(projectId);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close modal with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // ==========================================
  // CONTACT FORM VALIDATION & SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contact-form-element');
  const formStatus = document.getElementById('form-status-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name-input').value.trim();
      const email = document.getElementById('email-input').value.trim();
      const subject = document.getElementById('subject-input').value.trim();
      const message = document.getElementById('message-input').value.trim();
      
      // Simple validation check
      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
      }
      
      if (!validateEmail(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Mock successful submit
      showStatus('Sending message...', '');
      
      setTimeout(() => {
        showStatus('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
        
        // Clear labels focus styling
        const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
          // Trigger change to update labels floating position
          input.dispatchEvent(new Event('input'));
        });
      }, 1500);
    });
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status'; // reset
    
    if (type === 'success') {
      formStatus.classList.add('success');
    } else if (type === 'error') {
      formStatus.classList.add('error');
    } else {
      formStatus.style.display = 'block';
      formStatus.style.color = 'var(--text-secondary)';
    }

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    }
  }

  // Input styling handling (labels positioning)
  const inputs = document.querySelectorAll('.form-input, .form-textarea');
  inputs.forEach(input => {
    // Add listener on load to position if pre-filled
    if (input.value) {
      input.setAttribute('placeholder', ' ');
    }
    
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.setAttribute('placeholder', ' ');
      } else {
        input.removeAttribute('placeholder');
      }
    });
  });

  // ==========================================
  // RESUME PRINT / EXPORT ACTION
  // ==========================================
  const printResumeBtn = document.getElementById('print-resume-btn');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', (e) => {
      // Allow the browser to open the PDF link normally.
    });
  }
});
