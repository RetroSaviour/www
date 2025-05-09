/**
 * Main script that initializes all functionality
 */
RetroApp.utils.onReady(function() {
    //console.log('Retro Saviour website loaded');
    
    // Enable lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
      RetroApp.utils.selectAll('img').forEach(img => {
        if (img.getAttribute('data-src')) {
          img.src = img.getAttribute('data-src');
        }
      });
    }
    
    // Add any additional initializations here
  });