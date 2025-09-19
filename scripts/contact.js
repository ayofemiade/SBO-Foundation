// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar background opacity on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Contact Form Handling with Formspree (fixed)
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Hide any previous messages (use classes, not inline styles)
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');

    const formData = new FormData(contactForm);

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            // Show success message via class (your CSS handles display)
            successMessage.classList.add('show');

            // Reset form
            contactForm.reset();

            // Reset input styles
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.style.borderColor = 'rgba(184, 134, 11, 0.2)';
                input.style.backgroundColor = '#F8F8F8';
            });

            // Scroll to success message (after it's visible)
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        } else {
            // Show error message
            errorMessage.textContent = 'There was a problem sending your message. Please try again.';
            errorMessage.classList.add('show');
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'Network error. Please try again later.';
        errorMessage.classList.add('show');
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
    }
});


// Newsletter Form Handling
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    console.log('Newsletter subscription:', email);
    
    // Show success feedback
    const button = this.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Subscribed!';
    button.style.background = '#4CAF50';
    
    // Reset button after 3 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '#B8860B';
        this.reset();
    }, 3000);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.contact-item, .contact-form, .map-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form validation enhancements
const inputs = document.querySelectorAll('input, textarea, select');

inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#e74c3c';
            this.style.backgroundColor = '#fdf2f2';
        } else {
            this.style.borderColor = 'rgba(184, 134, 11, 0.2)';
            this.style.backgroundColor = '#F8F8F8';
        }
    });

    input.addEventListener('focus', function() {
        this.style.borderColor = '#2D7D32';
        this.style.backgroundColor = '#FFFFFF';
    });
});

// Email validation
const emailInput = document.getElementById('email');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailInput.addEventListener('blur', function() {
    if (this.value && !emailPattern.test(this.value)) {
        this.style.borderColor = '#e74c3c';
        this.style.backgroundColor = '#fdf2f2';
        showValidationMessage(this, 'Please enter a valid email address');
    } else if (this.value && emailPattern.test(this.value)) {
        this.style.borderColor = '#27ae60';
        this.style.backgroundColor = '#f8fff8';
        hideValidationMessage(this);
    }
});

// Phone number validation
const phoneInput = document.getElementById('phone');
const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;

phoneInput.addEventListener('blur', function() {
    if (this.value && !phonePattern.test(this.value.replace(/\s/g, ''))) {
        this.style.borderColor = '#e74c3c';
        this.style.backgroundColor = '#fdf2f2';
        showValidationMessage(this, 'Please enter a valid phone number');
    } else if (this.value && phonePattern.test(this.value.replace(/\s/g, ''))) {
        this.style.borderColor = '#27ae60';
        this.style.backgroundColor = '#f8fff8';
        hideValidationMessage(this);
    }
});

// Helper functions for validation messages
function showValidationMessage(element, message) {
    hideValidationMessage(element);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.style.display = 'block';
    
    element.parentNode.appendChild(errorDiv);
}

function hideValidationMessage(element) {
    const errorDiv = element.parentNode.querySelector('.validation-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}



// Character counter for message textarea
const messageTextarea = document.getElementById('message');
const maxLength = 1000;

messageTextarea.addEventListener('input', function() {
    const currentLength = this.value.length;
    
    // Remove existing counter
    const existingCounter = this.parentNode.querySelector('.char-counter');
    if (existingCounter) {
        existingCounter.remove();
    }
    
    // Add character counter
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.textContent = `${currentLength}/${maxLength}`;
    counter.style.fontSize = '0.875rem';
    counter.style.color = currentLength > maxLength ? '#e74c3c' : '#666';
    counter.style.textAlign = 'right';
    counter.style.marginTop = '0.25rem';
    
    this.parentNode.appendChild(counter);
    
    // Limit length
    if (currentLength > maxLength) {
        this.value = this.value.substring(0, maxLength);
        counter.textContent = `${maxLength}/${maxLength}`;
        counter.style.color = '#e74c3c';
    }
});

// Auto-resize textarea
messageTextarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

// Enhanced newsletter form with validation
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    const button = this.querySelector('button');
    
    // Validate email
    if (!email || !emailPattern.test(email)) {
        emailInput.style.borderColor = '#e74c3c';
        emailInput.style.backgroundColor = '#fdf2f2';
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'newsletter-error';
        errorDiv.textContent = 'Please enter a valid email address';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.style.textAlign = 'center';
        
        // Remove existing error
        const existingError = this.querySelector('.newsletter-error');
        if (existingError) {
            existingError.remove();
        }
        
        this.appendChild(errorDiv);
        
        // Remove error after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
            emailInput.style.borderColor = '';
            emailInput.style.backgroundColor = '';
        }, 3000);
        
        return;
    }
    
    console.log('Newsletter subscription:', email);
    
    // Show success feedback
    const originalText = button.textContent;
    button.textContent = 'Subscribed!';
    button.style.background = '#4CAF50';
    button.disabled = true;
    
    // Reset button after 3 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '#B8860B';
        button.disabled = false;
        this.reset();
    }, 3000);
});

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // Submit form with Ctrl+Enter in textarea
    if (e.ctrlKey && e.key === 'Enter' && e.target.tagName === 'TEXTAREA') {
        const form = e.target.closest('form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
    
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to form elements
    const formElements = document.querySelectorAll('input, textarea, select');
    formElements.forEach(element => {
        const label = document.querySelector(`label[for="${element.id}"]`);
        if (label && !element.getAttribute('aria-label')) {
            element.setAttribute('aria-label', label.textContent);
        }
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #2D7D32';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll to top button visibility
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
    
    // Navbar background opacity
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}, 16); // 60fps

// Replace the existing scroll event listener with debounced version
window.removeEventListener('scroll', () => {}); // Remove if exists
window.addEventListener('scroll', debouncedScrollHandler);