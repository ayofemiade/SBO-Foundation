// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.querySelector('.scroll-to-top');

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

// Loading Animation
window.addEventListener('load', () => {
    document.querySelectorAll('.loading').forEach(element => {
        element.classList.add('loaded');
    });
});

// Modal Handling
const modals = document.querySelectorAll('.modal');
const modalTriggers = document.querySelectorAll('[data-modal]');
const closeButtons = document.querySelectorAll('.close');

// Open modal
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Form Submissions

// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        
        // Simulate form submission
        alert(`Thank you for subscribing with email: ${email}`);
        newsletterForm.reset();
    });
}

// RSVP Form
const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(rsvpForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        alert(`RSVP submitted for ${data.name}. We'll send confirmation to ${data.email}`);
        rsvpForm.reset();
        document.getElementById('rsvp-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Event Registration Form
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        alert(`Registration submitted for ${data.name}. Confirmation sent to ${data.email}`);
        registerForm.reset();
        document.getElementById('register-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Memorial Form
const memorialForm = document.getElementById('memorial-form');
if (memorialForm) {
    memorialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(memorialForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        alert(`Memorial tribute submitted for ${data.honoree_name}. Thank you for your contribution.`);
        memorialForm.reset();
        document.getElementById('memorial-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Volunteer Form
const volunteerForm = document.getElementById('volunteer-form');
if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(volunteerForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        alert(`Volunteer application submitted for ${data.name}. We'll contact you at ${data.email}`);
        volunteerForm.reset();
        document.getElementById('volunteer-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Smooth Scrolling for Internal Links
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

// Animation Delays for Event Cards
document.addEventListener('DOMContentLoaded', () => {
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
    
    const pastEventCards = document.querySelectorAll('.past-event-card');
    pastEventCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
});

// Navbar Opacity on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Keyboard Navigation for Modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Focus Management for Accessibility
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const modalId = trigger.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            setTimeout(() => {
                const firstInput = modal.querySelector('input, textarea, select, button');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);
        }
    });
});

// Error Handling for External Links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add any external link tracking or validation here
        console.log('External link clicked:', link.href);
    });
});

// Image Preloading
const preloadImages = () => {
    const imageUrls = [
        // Add any image URLs that need preloading
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
};

// Initialize preloading when page loads
window.addEventListener('load', preloadImages);

// Form Validation Enhancement
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePhone = (phone) => {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
};

// Add real-time validation to forms
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !validateEmail(input.value)) {
            input.style.borderColor = '#D32F2F';
            input.setCustomValidity('Please enter a valid email address');
        } else {
            input.style.borderColor = '';
            input.setCustomValidity('');
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !validatePhone(input.value)) {
            input.style.borderColor = '#D32F2F';
            input.setCustomValidity('Please enter a valid phone number');
        } else {
            input.style.borderColor = '';
            input.setCustomValidity('');
        }
    });
});

// Dynamic Event Status Updates
const updateEventStatus = () => {
    const eventCards = document.querySelectorAll('.event-card');
    const now = new Date();
    
    eventCards.forEach(card => {
        const dateElement = card.querySelector('.event-date-badge');
        if (dateElement) {
            const eventDate = new Date(dateElement.textContent);
            const statusElement = card.querySelector('.event-status');
            
            if (eventDate < now) {
                if (statusElement) {
                    statusElement.textContent = 'Past Event';
                    statusElement.className = 'event-status status-past';
                }
            }
        }
    });
};

// Update event status on page load
document.addEventListener('DOMContentLoaded', updateEventStatus);