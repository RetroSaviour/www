/**
 * Process section animations
 */
RetroApp.utils.onReady(function() {
    // Animate process timeline
    const processCards = RetroApp.utils.selectAll('.process-card');
    
    if (processCards.length) {
      // Create observer for animation
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.3 }
      );
      
      // Observe each card
      processCards.forEach(card => {
        observer.observe(card);
      });
    }
  });