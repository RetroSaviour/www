/**
 * Navigation functionality
 */
RetroApp.utils.onReady(function() {
    // Mobile menu toggle
    const navToggle = RetroApp.utils.select('.nav-toggle');
    const navMenu = RetroApp.utils.select('.nav-menu');
    const body = document.body;
    
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        body.classList.toggle('menu-open');
        navToggle.setAttribute('aria-expanded', navMenu.classList.contains('show'));
      });
    }
    
    // Close menu when clicking links
    RetroApp.utils.selectAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        body.classList.remove('menu-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Smooth scrolling
    RetroApp.utils.selectAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#home' || targetId === '#') {
          window.scrollTo({top: 0, behavior: 'smooth'});
        } else {
          const targetElement = RetroApp.utils.select(targetId);
          if (targetElement) {
            const headerOffset = 60;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({top: offsetPosition, behavior: 'smooth'});
          }
        }
      });
    });
    
    // Active navigation state
    window.addEventListener('scroll', () => {
      let current = '';
      RetroApp.utils.selectAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });
  
      RetroApp.utils.selectAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  });