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

// Timeline Animation on Scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

timelineItems.forEach(item => {
    observer.observe(item);
});

// Quotes Slider
const quoteCards = document.querySelectorAll('.quote-card');
const quoteNavBtns = document.querySelectorAll('.quote-nav-btn');
let currentQuote = 0;

function showQuote(index) {
    // Hide all quote cards
    quoteCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    quoteNavBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected quote and activate corresponding nav button
    quoteCards[index].classList.add('active');
    quoteNavBtns[index].classList.add('active');
    
    currentQuote = index;
}

// Quote navigation button click handlers
quoteNavBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        showQuote(index);
    });
});

// Auto-advance quotes every 5 seconds
setInterval(() => {
    currentQuote = (currentQuote + 1) % quoteCards.length;
    showQuote(currentQuote);
}, 5000);

// Scroll to Top Button
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

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for page header
window.addEventListener('scroll', () => {
    const pageHeader = document.querySelector('.page-header');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (pageHeader) {
        pageHeader.style.transform = `translateY(${rate}px)`;
    }
});

// Enhanced hover effects for timeline items
timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Keyboard navigation for quotes
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        currentQuote = currentQuote > 0 ? currentQuote - 1 : quoteCards.length - 1;
        showQuote(currentQuote);
    } else if (e.key === 'ArrowRight') {
        currentQuote = (currentQuote + 1) % quoteCards.length;
        showQuote(currentQuote);
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #2D7D32';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});

// Preload images for better performance
const imagesToPreload = [
    // Add any image URLs here if you have actual images
];

imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Error handling for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
        try {
            // Track external link clicks if analytics is implemented
            console.log('External link clicked:', link.href);
        } catch (error) {
            console.error('Error tracking external link:', error);
        }
    });
});