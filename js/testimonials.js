/**
 * Testimonials carousel functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    //console.log('Testimonials script loaded');
  
    // Get all necessary elements
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.pagination-dots');
    const joystick = document.querySelector('.joystick-stick');
    const controlBtns = document.querySelectorAll('.control-btn');
    
    // If no testimonials found, exit
    if (cards.length === 0) {
      console.error('No testimonial cards found');
      return;
    }
    
    // console.log(`Found ${cards.length} testimonial cards`);
    
    // Keep track of current testimonial
    let currentIndex = 0;
    
    // Create pagination dots
    if (dotsContainer) {
      for (let i = 0; i < cards.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        
        // Add click event to each dot
        dot.addEventListener('click', function() {
          showTestimonial(i);
        });
        
        dotsContainer.appendChild(dot);
      }
    }
    
    // Initialize - show the first testimonial
    showTestimonial(0);
    
    // Previous button click
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = cards.length - 1;  // Loop to the end
        showTestimonial(prevIndex);
      });
    }
    
    // Next button click
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= cards.length) nextIndex = 0;  // Loop to the beginning
        showTestimonial(nextIndex);
      });
    }
    
    // Control buttons
    controlBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Button press animation
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => btn.style.transform = '', 150);
        
        // Go to next testimonial
        let nextIndex = currentIndex + 1;
        if (nextIndex >= cards.length) nextIndex = 0;
        showTestimonial(nextIndex);
      });
    });
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
      // Hide all testimonials
      cards.forEach(card => {
        card.classList.remove('active');
      });
      
      // Show the selected testimonial
      cards[index].classList.add('active');
      
      // Update current index
      currentIndex = index;
      
      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      }
      
      // Animate joystick
      if (joystick) {
        const direction = Math.random() > 0.5 ? 15 : -15;
        joystick.style.transform = `translate(-50%, 50%) rotate(${direction}deg)`;
        
        // Reset joystick position after animation
        setTimeout(() => {
          joystick.style.transform = 'translate(-50%, 50%)';
        }, 300);
      }
      
      // console.log(`Showing testimonial ${index + 1} of ${cards.length}`);
    }
    
    // Auto-rotate testimonials every 5 seconds
    let autoRotate = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= cards.length) nextIndex = 0;
      showTestimonial(nextIndex);
    }, 5000);
    
    // Pause auto-rotation when hovering over testimonials
    const arcadeCabinet = document.querySelector('.arcade-cabinet');
    if (arcadeCabinet) {
      arcadeCabinet.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
      });
      
      arcadeCabinet.addEventListener('mouseleave', () => {
        // Restart auto-rotation
        autoRotate = setInterval(() => {
          let nextIndex = currentIndex + 1;
          if (nextIndex >= cards.length) nextIndex = 0;
          showTestimonial(nextIndex);
        }, 5000);
      });
    }
  });