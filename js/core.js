/**
 * Core utilities and helper functions
 */
const RetroApp = {
    // Helper functions
    utils: {
      // DOM ready function
      onReady: function(callback) {
        if (document.readyState !== 'loading') {
          callback();
        } else {
          document.addEventListener('DOMContentLoaded', callback);
        }
      },
      
      // Select elements
      select: function(selector) {
        return document.querySelector(selector);
      },
      
      selectAll: function(selector) {
        return document.querySelectorAll(selector);
      },
      
      // Responsive functions
      isMobile: function() {
        return window.innerWidth < 768;
      }
    }
  };

// Just in case some scripts try to load this file without waiting for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('RetroApp core initialized');
});