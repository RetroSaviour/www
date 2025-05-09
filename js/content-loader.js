/**
 * Content Loader for Retro Saviour Website
 * Loads content from JSON files and updates the HTML accordingly
 */

document.addEventListener('DOMContentLoaded', function() {
    // console.log('Content loader initialized');
    
    // Load all content sections
    loadContent('header');
    loadContent('about');
    loadContent('services');
    loadContent('process');
    loadContent('gallery');
    loadContent('stats');
    loadContent('testimonials');
    loadContent('contact');
  });
  
  /**
   * Load content for a specific section
   * @param {string} sectionId - The ID of the section to load content for
   */
  async function loadContent(sectionId) {
    try {
      const response = await fetch(`content/${sectionId}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${sectionId} content (${response.status})`);
      }
      
      const data = await response.json();
      // console.log(`Loaded ${sectionId} content:`, data);
      
      const section = document.getElementById(sectionId) || document.querySelector(sectionId);
      
      if (!section) {
        console.warn(`Section #${sectionId} not found in the document`);
        return;
      }
      
      // Update section title if it exists
      const sectionTitle = section.querySelector('h1, h2');
      if (sectionTitle && data.title) {
        sectionTitle.textContent = data.title;
      }
      
      // Different rendering based on section type
      switch(sectionId) {
        case 'header':
          renderHeader(section, data);
          break;
        case 'about':
          renderAbout(section, data);
          break;
        case 'services':
          renderServices(section, data);
          break;
        case 'process':
          renderProcess(section, data);
          break;
        case 'gallery':
          renderGallery(section, data);
          break;
        case 'stats':
          renderStats(section, data);
          break;
        case 'testimonials':
          renderTestimonials(section, data);
          break;
        case 'contact':
          renderContact(section, data);
          break;
      }
      
      // console.log(`${sectionId} content updated successfully`);
    } catch (error) {
      console.error(`Error loading ${sectionId} content:`, error);
    }
  }
  
  /**
   * Render header content
   * @param {HTMLElement} section - The header element
   * @param {Object} data - The header data
   */
  function renderHeader(section, data) {
    const h1 = section.querySelector('h1');
    const p = section.querySelector('p');
    const cta = section.querySelector('.hero-cta');
    
    if (h1 && data.title) h1.textContent = data.title;
    if (p && data.subtitle) p.textContent = data.subtitle;
    
    if (cta && data.cta) {
      cta.textContent = data.cta.text;
      if (data.cta.link) cta.href = data.cta.link;
    }

    // Optional: Update styling based on JSON values
    if (data.backgroundOpacity) {
        section.style.setProperty('--overlay-opacity', data.backgroundOpacity);
    }
    
    if (data.overlayColor) {
        section.style.setProperty('--overlay-color', data.overlayColor);
    }
  }
  
  /**
   * Render about section content
   * @param {HTMLElement} section - The about section element
   * @param {Object} data - The about data
   */
  function renderAbout(section, data) {
    // Update title and description
    const description = section.querySelector('p:first-of-type');
    if (description && data.description) {
      description.textContent = data.description;
    }
    
    // Update welcome icons
    const welcomeIcons = section.querySelector('.welcome-icons');
    if (welcomeIcons && data.welcomeIcons) {
      welcomeIcons.innerHTML = '';
      
      data.welcomeIcons.forEach(item => {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'welcome-icon';
        iconDiv.innerHTML = `
          <span>${item.icon}</span>
          <p>${item.text}</p>
        `;
        welcomeIcons.appendChild(iconDiv);
      });
    }
    
    // Update CTA button
    const ctaButton = section.querySelector('.welcome-cta a');
    if (ctaButton && data.cta) {
      ctaButton.textContent = data.cta.text;
      if (data.cta.link) {
        ctaButton.href = data.cta.link;
      }
    }
  }
  
  /**
   * Render services section content
   * @param {HTMLElement} section - The services section element
   * @param {Object} data - The services data
   */
  function renderServices(section, data) {
    // Find the container for services
    const servicesGrid = section.querySelector('.services-grid');
    if (!servicesGrid || !data.services) return;
    
    servicesGrid.innerHTML = '';
    
    // Render each service
    data.services.forEach(service => {
      const serviceCard = document.createElement('div');
      serviceCard.className = service.isFeatured ? 'service-card featured' : 'other-services';
      
      if (service.isFeatured) {
        serviceCard.innerHTML = `
          <div class="service-icon">${service.icon || ''}</div>
          <h3>${service.name}</h3>
          <p>${service.description}</p>
          ${service.services ? `
            <ul>
              ${service.services.map(item => `
                <li><span>${item.name}</span><span>${item.price}</span></li>
              `).join('')}
            </ul>
          ` : ''}
        `;
      } else {
        serviceCard.innerHTML = `
          <h3>${service.name}</h3>
          <p>${service.description} <a href="#contact">Contact us</a> for details!</p>
        `;
      }
      
      servicesGrid.appendChild(serviceCard);
    });
    
    // Add note if exists
    if (data.note) {
      let noteElement = section.querySelector('p[style*="text-align: center"]');
      
      if (!noteElement) {
        noteElement = document.createElement('p');
        noteElement.style.textAlign = 'center';
        noteElement.style.marginTop = '2rem';
        section.appendChild(noteElement);
      }
      
      noteElement.textContent = data.note;
    }
  }
  
  /**
   * Render process section content
   * @param {HTMLElement} section - The process section element
   * @param {Object} data - The process data
   */
  function renderProcess(section, data) {
    const container = section.querySelector('.process-container');
    if (!container || !data.steps) return;
    
    // Keep the timeline element
    const timeline = container.querySelector('.process-timeline');
    container.innerHTML = '';
    if (timeline) container.appendChild(timeline);
    
    // Render each process step
    data.steps.forEach(step => {
      const card = document.createElement('div');
      card.className = 'process-card';
      card.innerHTML = `
        <span class="emoji">${step.icon}</span>
        <h3>${step.title}</h3>
        <p>${step.description}</p>
      `;
      
      container.appendChild(card);
    });
  }
  
  /**
   * Render gallery section content
   * @param {HTMLElement} section - The gallery section element
   * @param {Object} data - The gallery data
   */
  function renderGallery(section, data) {
    const gallery = section.querySelector('.gallery-grid');
    if (!gallery || !data.items) return;
    
    gallery.innerHTML = '';
    
    // Render each gallery item
    data.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.alt}">
        <p>${item.caption}</p>
      `;
      
      gallery.appendChild(card);
    });
  }
  
  /**
   * Render stats section content
   * @param {HTMLElement} section - The stats section element
   * @param {Object} data - The stats data
   */
  function renderStats(section, data) {
    const statsGrid = section.querySelector('.stats-grid');
    if (!statsGrid || !data.stats) return;
    
    statsGrid.innerHTML = '';
    
    // Render each stat
    data.stats.forEach(stat => {
      const card = document.createElement('div');
      card.className = 'stat-card';
      card.innerHTML = `
        <h3>${stat.value}</h3>
        <p>${stat.label}</p>
      `;
      
      statsGrid.appendChild(card);
    });
  }
  
  /**
   * Render testimonials section content
   * @param {HTMLElement} section - The testimonials section element
   * @param {Object} data - The testimonials data
   */
  function renderTestimonials(section, data) {
    // We'll update just the testimonial content, keeping the arcade cabinet structure
    const track = section.querySelector('.testimonials-track');
    if (!track || !data.testimonials) return;
    
    track.innerHTML = '';
    
    // Render each testimonial
    data.testimonials.forEach(testimonial => {
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      
      // Create rating stars
      let stars = '';
      for (let i = 1; i <= 5; i++) {
        stars += i <= testimonial.rating ? '★' : '☆';
      }
      
      card.innerHTML = `
        <div class="testimonial-content">
          <p class="quote">"${testimonial.quote}"</p>
          <div class="testimonial-rating">
            <span>${stars}</span>
          </div>
          <p class="author">- ${testimonial.author}</p>
          <p class="service">${testimonial.service}</p>
        </div>
      `;
      
      track.appendChild(card);
    });
    
    // Re-initialize testimonials carousel if it's already been set up
    if (window.initTestimonials && typeof window.initTestimonials === 'function') {
      setTimeout(() => window.initTestimonials(), 100);
    }
  }
  
  /**
   * Render contact section content
   * @param {HTMLElement} section - The contact section element
   * @param {Object} data - The contact data
   */
  function renderContact(section, data) {
    // Update contact form placeholders
    const form = section.querySelector('.contact-form');
    if (form && data.formPlaceholders) {
      const nameInput = form.querySelector('input[type="text"]');
      const emailInput = form.querySelector('input[type="email"]');
      const messageInput = form.querySelector('textarea');
      const submitButton = form.querySelector('button[type="submit"]');
      
      if (nameInput) nameInput.placeholder = data.formPlaceholders.name;
      if (emailInput) emailInput.placeholder = data.formPlaceholders.email;
      if (messageInput) messageInput.placeholder = data.formPlaceholders.message;
      if (submitButton) submitButton.textContent = data.formPlaceholders.submit;
    }
    
    // Update contact info
    const contactInfo = section.querySelector('.contact-info');
    if (contactInfo && data.email && data.location) {
      contactInfo.innerHTML = `
        <div class="contact-info-item">
          <div class="contact-info-icon">📧</div>
          <div class="contact-info-text">${data.email}</div>
        </div>
        <div class="contact-info-item">
          <div class="contact-info-icon">📍</div>
          <div class="contact-info-text">${data.location}</div>
        </div>
      `;
    }
  }