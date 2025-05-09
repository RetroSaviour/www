/**
 * Contact form functionality
 */
RetroApp.utils.onReady(function() {
    const contactForm = RetroApp.utils.select('.contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
          if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            
            // Add shake animation
            input.addEventListener('animationend', () => {
              input.classList.remove('error');
            });
          } else {
            input.classList.remove('error');
          }
        });
        
        if (isValid) {
          // Here you would typically send the form data to a server
          // For now, show a success message
          alert('Form submitted! We\'ll get back to you soon.');
          contactForm.reset();
        }
      });
    }
  });