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

// Smooth scrolling for anchor links
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

// Navbar opacity on scroll
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Copy account details functionality
function copyAccountDetails(element) {
    const accountDetails = element.closest('.donation-card').querySelector('.account-details');
    const details = [];
    
    accountDetails.querySelectorAll('.account-row').forEach(row => {
        const label = row.querySelector('.account-label').textContent;
        const value = row.querySelector('.account-value').textContent;
        details.push(`${label}: ${value}`);
    });
    
    const textToCopy = details.join('\n');
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        element.textContent = 'Copied!';
        element.classList.add('copied');
        
        setTimeout(() => {
            element.textContent = 'Copy Account Details';
            element.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        element.textContent = 'Copied!';
        element.classList.add('copied');
        
        setTimeout(() => {
            element.textContent = 'Copy Account Details';
            element.classList.remove('copied');
        }, 2000);
    });
}

// Quick amount selection
function selectAmount(button, amount) {
    // Remove active class from all buttons
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Store selected amount (you can use this for payment processing)
    window.selectedAmount = amount;
    
    // Show payment form or next step
    showPaymentForm(amount);
}

// Show payment form
function showPaymentForm(amount) {
    // Create or show payment form
    let paymentForm = document.querySelector('.payment-form');
    
    if (!paymentForm) {
        paymentForm = document.createElement('div');
        paymentForm.className = 'payment-form';
        paymentForm.innerHTML = `
            <div class="payment-modal">
                <div class="payment-content">
                    <h3>Complete Your Donation</h3>
                    <p>Amount: $${amount}</p>
                    <form id="donationForm">
                        <div class="form-group">
                            <label for="donorName">Full Name</label>
                            <input type="text" id="donorName" name="donorName" required>
                        </div>
                        <div class="form-group">
                            <label for="donorEmail">Email Address</label>
                            <input type="email" id="donorEmail" name="donorEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="donorPhone">Phone Number</label>
                            <input type="tel" id="donorPhone" name="donorPhone">
                        </div>
                        <div class="form-buttons">
                            <button type="button" class="btn-secondary" onclick="closePaymentForm()">Cancel</button>
                            <button type="submit" class="btn-primary">Donate Now</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(paymentForm);
        
        // Add form submission handler
        document.getElementById('donationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            processDonation(amount);
        });
    }
    
    paymentForm.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close payment form
function closePaymentForm() {
    const paymentForm = document.querySelector('.payment-form');
    if (paymentForm) {
        paymentForm.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Process donation (simulate payment)
function processDonation(amount) {
    // Show loading state
    const submitBtn = document.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        closePaymentForm();
        showDonationSuccess(amount);
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

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
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.impact-card, .donation-card, .stat-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Trigger counter animations when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target') || counter.textContent.replace(/,/g, ''));
                animateCounter(counter, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.donation-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form validation for custom donation amounts
function validateCustomAmount(input) {
    const amount = parseFloat(input.value);
    const errorMsg = input.parentNode.querySelector('.error-message');
    
    if (errorMsg) {
        errorMsg.remove();
    }
    
    if (isNaN(amount) || amount <= 0) {
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = 'Please enter a valid amount';
        error.style.color = '#e74c3c';
        error.style.fontSize = '0.9rem';
        input.parentNode.appendChild(error);
        return false;
    }
    
    if (amount < 5) {
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = 'Minimum donation amount is $5';
        error.style.color = '#e74c3c';
        error.style.fontSize = '0.9rem';
        input.parentNode.appendChild(error);
        return false;
    }
    
    return true;
}

// Enhanced payment form with better UX
function createPaymentModal(amount) {
    const modal = document.createElement('div');
    modal.className = 'payment-modal-overlay';
    modal.innerHTML = `
        <div class="payment-modal">
            <div class="modal-header">
                <h3>Complete Your Donation</h3>
                <button class="close-modal" onclick="closePaymentForm()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="donation-summary">
                    <h4>Donation Amount: $${amount}</h4>
                    <p>Your contribution will help us continue our mission to serve the community.</p>
                </div>
                <form id="donationForm" class="donation-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">First Name *</label>
                            <input type="text" id="firstName" name="firstName" required>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name *</label>
                            <input type="text" id="lastName" name="lastName" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone">
                    </div>
                    <div class="form-group">
                        <label for="message">Message (Optional)</label>
                        <textarea id="message" name="message" rows="3" placeholder="Leave a message of support..."></textarea>
                    </div>
                    <div class="form-group checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="newsletter" name="newsletter">
                            <span class="checkmark"></span>
                            Subscribe to our newsletter for updates
                        </label>
                    </div>
                    <div class="form-buttons">
                        <button type="button" class="btn btn-secondary" onclick="closePaymentForm()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Donate $${amount}</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    return modal;
}

// Show donation success message
function showDonationSuccess(amount) {
    const successModal = document.createElement('div');
    successModal.className = 'success-modal-overlay';
    successModal.innerHTML = `
        <div class="success-modal">
            <div class="success-content">
                <div class="success-icon">✓</div>
                <h3>Thank You for Your Donation!</h3>
                <p>Your generous contribution of <strong>$${amount}</strong> has been received.</p>
                <p>You will receive a confirmation email shortly with your donation receipt.</p>
                <button class="btn btn-primary" onclick="closeSuccessModal()">Continue</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(successModal);
    document.body.style.overflow = 'hidden';
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeSuccessModal();
    }, 5000);
}

// Close success modal
function closeSuccessModal() {
    const successModal = document.querySelector('.success-modal-overlay');
    if (successModal) {
        successModal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Custom donation amount input
function createCustomAmountInput() {
    const customInput = document.createElement('div');
    customInput.className = 'custom-amount-input';
    customInput.innerHTML = `
        <label for="customAmount">Enter Custom Amount ($)</label>
        <div class="input-group">
            <span class="input-prefix">$</span>
            <input type="number" id="customAmount" min="5" step="0.01" placeholder="0.00">
            <button type="button" class="btn btn-primary" onclick="selectCustomAmount()">Donate</button>
        </div>
    `;
    
    return customInput;
}

// Select custom amount
function selectCustomAmount() {
    const customInput = document.getElementById('customAmount');
    const amount = parseFloat(customInput.value);
    
    if (validateCustomAmount(customInput)) {
        showPaymentForm(amount);
    }
}

// Donation progress tracker
function updateDonationProgress(current, goal) {
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    
    if (progressBar && progressText) {
        const percentage = Math.min((current / goal) * 100, 100);
        progressBar.style.width = percentage + '%';
        progressText.textContent = `$${current.toLocaleString()} raised of $${goal.toLocaleString()} goal`;
    }
}

// Initialize testimonial slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    
    if (testimonials.length > 1) {
        setInterval(() => {
            testimonials[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % testimonials.length;
            testimonials[currentSlide].classList.add('active');
        }, 5000);
    }
}

// Newsletter signup functionality
function initNewsletterSignup() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            subscribeToNewsletter(email);
        });
    }
}

// Subscribe to newsletter
function subscribeToNewsletter(email) {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate subscription
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    
    // Clear the form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.reset();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        closePaymentForm();
        closeSuccessModal();
    }
    
    // Quick amount selection with number keys
    if (e.key >= '1' && e.key <= '9') {
        const amountButtons = document.querySelectorAll('.amount-btn');
        const index = parseInt(e.key) - 1;
        if (amountButtons[index]) {
            amountButtons[index].click();
        }
    }
});

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialSlider();
    initNewsletterSignup();
    
    // Set up stat counters with data attributes
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const value = stat.textContent.replace(/,/g, '');
        stat.setAttribute('data-target', value);
        stat.textContent = '0';
    });
    
    console.log('Donate page initialized successfully');
});