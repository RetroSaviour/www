/**
 * Contact form functionality with Netlify integration
 */
RetroApp.utils.onReady(function() {
  const contactForm = RetroApp.utils.select('.contact-form');
  
  if (contactForm) {
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const formSuccess = urlParams.get('form') === 'success';
    
    // Create success message element if it doesn't exist
    let successMessage = document.querySelector('.form-success-message');
    if (!successMessage) {
      successMessage = document.createElement('div');
      successMessage.className = 'form-success-message';
      successMessage.innerHTML = `
        <div class="success-content">
          <div class="success-icon">✅</div>
          <h3>Message Sent!</h3>
          <p>Thanks for reaching out! We'll get back to you as soon as possible.</p>
          <button class="close-success">Close</button>
        </div>
      `;
      document.body.appendChild(successMessage);
      
      // Add event listener to close button
      const closeButton = successMessage.querySelector('.close-success');
      closeButton.addEventListener('click', function() {
        successMessage.classList.remove('visible');
        // Clear the success parameter from URL without reloading
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
      });
    }
    
    // Show success message if form was successfully submitted
    if (formSuccess) {
      successMessage.classList.add('visible');
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        successMessage.classList.remove('visible');
        // Clear the success parameter from URL without reloading
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
      }, 5000);
    }
    
    // Basic form validation
    contactForm.addEventListener('submit', function(e) {
      let isValid = true;
      const formInputs = contactForm.querySelectorAll('input[required], textarea[required]');
      
      formInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
          
          // Add shake animation
          input.addEventListener('animationend', () => {
            input.classList.remove('error');
          });
          
          e.preventDefault();
        } else {
          input.classList.remove('error');
        }
      });
      
      if (isValid) {
        // Show loading state on button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // For local development, simulate submission
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          e.preventDefault();
          
          setTimeout(() => {
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            successMessage.classList.add('visible');
            
            setTimeout(() => {
              successMessage.classList.remove('visible');
            }, 5000);
          }, 1000);
        }
        // In production, form submits to Netlify normally with the action redirect
      }
    });
  }
});