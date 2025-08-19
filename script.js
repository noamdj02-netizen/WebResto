// WebResto - JavaScript Functionality

// Global variables
let selectedPlan = '';
let selectedPrice = 0;
let isPaymentProcessing = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupEventListeners();
    setupCardFormatting();
    setupPaymentMethods();
    setupAnimations();
    console.log('WebResto initialized successfully!');
}

// Setup all event listeners
function setupEventListeners() {
    // Modal event listeners
    setupModalListeners();
    
    // Form event listeners
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmit);
    }
    
    // Navigation smooth scrolling
    setupSmoothScrolling();
    
    // Window resize handler
    window.addEventListener('resize', handleWindowResize);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Modal functionality
function setupModalListeners() {
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const offersModal = document.getElementById('offersModal');
        const paymentModal = document.getElementById('paymentModal');
        
        if (event.target === offersModal) {
            closeOffersModal();
        }
        if (event.target === paymentModal) {
            closePaymentModal();
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Navigate to offers page
function goToOffers() {
    // Add loading animation
    document.body.classList.add('loading');
    
    setTimeout(() => {
        window.location.href = 'offers.html';
    }, 300);
}

// Open offers modal
function openOffersModal() {
    const modal = document.getElementById('offersModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        setTimeout(() => {
            modal.classList.add('modal-open');
        }, 10);
        
        // Focus management for accessibility
        const firstButton = modal.querySelector('button');
        if (firstButton) {
            firstButton.focus();
        }
    }
}

// Close offers modal
function closeOffersModal() {
    const modal = document.getElementById('offersModal');
    if (modal) {
        modal.classList.remove('modal-open');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Open payment modal
function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modal.classList.add('modal-open');
        }, 10);
        
        // Focus on first input
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    }
}

// Close payment modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.remove('modal-open');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Close all modals
function closeAllModals() {
    closeOffersModal();
    closePaymentModal();
}

// Select a plan
function selectPlan(planName, price) {
    selectedPlan = planName;
    selectedPrice = price;
    
    // Update payment modal information
    updatePaymentModalInfo(planName, price);
    
    // Close offers modal and open payment modal
    closeOffersModal();
    setTimeout(() => {
        openPaymentModal();
    }, 300);
    
    // Analytics tracking (simulation)
    trackEvent('plan_selected', {
        plan: planName,
        price: price
    });
}

// Update payment modal information
function updatePaymentModalInfo(planName, price) {
    const elements = {
        selectedPlanName: document.getElementById('selectedPlanName'),
        selectedPlanPrice: document.getElementById('selectedPlanPrice'),
        payAmount: document.getElementById('payAmount')
    };
    
    if (elements.selectedPlanName) {
        elements.selectedPlanName.textContent = `Plan ${planName}`;
    }
    if (elements.selectedPlanPrice) {
        elements.selectedPlanPrice.textContent = `${price}€/mois`;
    }
    if (elements.payAmount) {
        elements.payAmount.textContent = `${price}€`;
    }
}

// Setup card formatting
function setupCardFormatting() {
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    
    if (cardNumber) {
        cardNumber.addEventListener('input', formatCardNumber);
        cardNumber.addEventListener('keydown', handleCardNumberKeydown);
    }
    
    if (expiryDate) {
        expiryDate.addEventListener('input', formatExpiryDate);
    }
    
    if (cvv) {
        cvv.addEventListener('input', formatCVV);
    }
}

// Format card number
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    if (formattedValue.length > 19) {
        formattedValue = formattedValue.substr(0, 19);
    }
    e.target.value = formattedValue;
    
    // Card type detection
    detectCardType(value);
}

// Handle card number keydown for better UX
function handleCardNumberKeydown(e) {
    // Allow backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
        // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true)) {
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
}

// Detect card type
function detectCardType(number) {
    const cardTypes = {
        visa: /^4/,
        mastercard: /^5[1-5]/,
        amex: /^3[47]/,
        discover: /^6(?:011|5)/
    };
    
    let detectedType = 'unknown';
    for (const [type, pattern] of Object.entries(cardTypes)) {
        if (pattern.test(number)) {
            detectedType = type;
            break;
        }
    }
    
    // Update UI with card type (if you have card type indicators)
    updateCardTypeIndicator(detectedType);
}

// Update card type indicator
function updateCardTypeIndicator(type) {
    const indicator = document.querySelector('.card-type-indicator');
    if (indicator) {
        indicator.className = `card-type-indicator ${type}`;
    }
}

// Format expiry date
function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
}

// Format CVV
function formatCVV(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 3);
}

// Setup payment methods
function setupPaymentMethods() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove active class from all methods
            paymentMethods.forEach(m => m.classList.remove('active'));
            // Add active class to clicked method
            this.classList.add('active');
            
            // Show/hide payment sections based on selection
            const methodType = this.getAttribute('data-method');
            togglePaymentSection(methodType);
        });
    });
}

// Toggle payment section
function togglePaymentSection(methodType) {
    const cardPayment = document.getElementById('cardPayment');
    const paypalPayment = document.getElementById('paypalPayment');
    
    if (methodType === 'card') {
        if (cardPayment) cardPayment.style.display = 'block';
        if (paypalPayment) paypalPayment.style.display = 'none';
    } else if (methodType === 'paypal') {
        if (cardPayment) cardPayment.style.display = 'none';
        if (paypalPayment) paypalPayment.style.display = 'block';
    }
}

// Handle payment form submission
function handlePaymentSubmit(e) {
    e.preventDefault();
    
    if (isPaymentProcessing) {
        return;
    }
    
    // Validate form
    if (!validatePaymentForm()) {
        return;
    }
    
    // Process payment
    processPayment();
}

// Validate payment form
function validatePaymentForm() {
    const requiredFields = [
        'companyName', 'email', 'phone', 'cardNumber', 'expiryDate', 'cvv'
    ];
    
    let isValid = true;
    const errors = [];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            isValid = false;
            errors.push(`${getFieldLabel(fieldId)} est requis`);
            field.classList.add('error');
        } else if (field) {
            field.classList.remove('error');
        }
    });
    
    // Email validation
    const email = document.getElementById('email');
    if (email && email.value && !isValidEmail(email.value)) {
        isValid = false;
        errors.push('Email invalide');
        email.classList.add('error');
    }
    
    // Card number validation
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber && cardNumber.value && !isValidCardNumber(cardNumber.value)) {
        isValid = false;
        errors.push('Numéro de carte invalide');
        cardNumber.classList.add('error');
    }
    
    // Terms acceptance
    const terms = document.getElementById('terms');
    if (terms && !terms.checked) {
        isValid = false;
        errors.push('Vous devez accepter les conditions d\'utilisation');
    }
    
    if (!isValid) {
        showFormErrors(errors);
    }
    
    return isValid;
}

// Get field label for error messages
function getFieldLabel(fieldId) {
    const labels = {
        companyName: 'Nom du restaurant',
        email: 'Email',
        phone: 'Téléphone',
        cardNumber: 'Numéro de carte',
        expiryDate: 'Date d\'expiration',
        cvv: 'CVV'
    };
    return labels[fieldId] || fieldId;
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Basic card number validation (Luhn algorithm)
function isValidCardNumber(number) {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
        return false;
    }
    
    // Simple length check for demo
    return cleanNumber.length >= 15;
}

// Show form errors
function showFormErrors(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Create and show error container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.innerHTML = `
        <div class="error-content">
            <h4>❌ Erreurs de validation :</h4>
            <ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>
        </div>
    `;
    
    const form = document.getElementById('paymentForm');
    if (form) {
        form.insertBefore(errorContainer, form.firstChild);
    }
    
    // Scroll to errors
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Process payment
function processPayment() {
    isPaymentProcessing = true;
    const payButton = document.querySelector('.pay-button');
    const originalText = payButton.innerHTML;
    
    // Update button state
    payButton.innerHTML = '🔄 Traitement en cours...';
    payButton.disabled = true;
    payButton.classList.add('loading');
    
    // Simulate payment processing
    setTimeout(() => {
        // Simulate success/failure (90% success rate)
        const isSuccess = Math.random() > 0.1;
        
        if (isSuccess) {
            handlePaymentSuccess();
        } else {
            handlePaymentFailure();
        }
        
        // Reset button
        payButton.innerHTML = originalText;
        payButton.disabled = false;
        payButton.classList.remove('loading');
        isPaymentProcessing = false;
    }, 2500);
    
    // Track payment attempt
    trackEvent('payment_attempted', {
        plan: selectedPlan,
        amount: selectedPrice
    });
}

// Handle successful payment
function handlePaymentSuccess() {
    const successMessage = `
        ✅ Paiement réussi !
        
        Plan: ${selectedPlan}
        Montant: ${selectedPrice}€/mois
        
        Vous recevrez un email de confirmation dans quelques minutes.
        Votre accès sera activé sous 24h.
    `;
    
    showNotification(successMessage, 'success');
    
    // Reset form and close modal
    setTimeout(() => {
        document.getElementById('paymentForm').reset();
        closePaymentModal();
        
        // Redirect to success page or show next steps
        showSuccessModal();
    }, 2000);
    
    // Track successful payment
    trackEvent('payment_success', {
        plan: selectedPlan,
        amount: selectedPrice
    });
}

// Handle failed payment
function handlePaymentFailure() {
    const errorMessage = `
        ❌ Échec du paiement
        
        Votre paiement n'a pas pu être traité.
        Veuillez vérifier vos informations et réessayer.
        
        Si le problème persiste, contactez votre banque.
    `;
    
    showNotification(errorMessage, 'error');
    
    // Track failed payment
    trackEvent('payment_failed', {
        plan: selectedPlan,
        amount: selectedPrice
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <pre>${message}</pre>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds for non-error notifications
    if (type !== 'error') {
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Show success modal
function showSuccessModal() {
    const successModal = document.createElement('div');
    successModal.className = 'modal success-modal';
    successModal.innerHTML = `
        <div class="modal-content">
            <div class="success-content">
                <div class="success-icon">🎉</div>
                <h2>Bienvenue dans WebResto !</h2>
                <p>Votre abonnement <strong>${selectedPlan}</strong> a été activé avec succès.</p>
                <div class="next-steps">
                    <h3>Prochaines étapes :</h3>
                    <ul>
                        <li>📧 Vérifiez votre email de confirmation</li>
                        <li>📱 Téléchargez notre app mobile</li>
                        <li>🎯 Configurez votre restaurant</li>
                        <li>🚀 Commencez à vendre !</li>
                    </ul>
                </div>
                <button class="cta-button" onclick="this.closest('.modal').remove()">
                    Commencer maintenant
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(successModal);
    successModal.style.display = 'block';
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup animations
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card');
    animateElements.forEach(el => observer.observe(el));
}

// Handle window resize
function handleWindowResize() {
    // Adjust modal positioning if needed
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (modal.style.display === 'block') {
            // Recalculate modal position if needed
        }
    });
}

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
    // Handle tab navigation in modals
    const activeModal = document.querySelector('.modal[style*="block"]');
    if (activeModal && e.key === 'Tab') {
        trapFocus(activeModal, e);
    }
}

// Trap focus within modal
function trapFocus(modal, e) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
        if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
        }
    } else {
        if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
        }
    }
}

// Analytics tracking (simulation)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    
    // In a real application, you would send this to your analytics service
    // Example: gtag('event', eventName, properties);
    // Example: analytics.track(eventName, properties);
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Track error
    trackEvent('javascript_error', {
        message: e.error.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navLinks.classList.toggle('mobile-open');
    menuToggle.classList.toggle('active');
}

// Menu demo functionality
function showMenuCategory(category) {
    // Hide all menu categories
    const menuItems = document.querySelectorAll('.menu-items');
    menuItems.forEach(items => items.classList.add('hidden'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.menu-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected category
    const targetMenu = document.getElementById(`menu-${category}`);
    if (targetMenu) {
        targetMenu.classList.remove('hidden');
    }
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Animate statistics counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const options = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                        if (counter.getAttribute('data-target') === '98' || counter.getAttribute('data-target') === '35') {
                            counter.textContent = target + '%';
                        } else if (counter.getAttribute('data-target') === '500') {
                            counter.textContent = target + '+';
                        } else if (counter.getAttribute('data-target') === '1200000') {
                            counter.textContent = (target / 1000000).toFixed(1) + 'M';
                        }
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, options);
    
    counters.forEach(counter => observer.observe(counter));
}

// Contact form handling
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateContactForm(data)) {
        return;
    }
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '🔄 Envoi en cours...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('✅ Votre demande a été envoyée avec succès ! Nous vous recontacterons sous 24h.', 'success');
        e.target.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Track form submission
        trackEvent('contact_form_submitted', {
            restaurant: data.restaurant,
            source: 'homepage'
        });
    }, 1500);
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.firstName?.trim()) errors.push('Le prénom est requis');
    if (!data.lastName?.trim()) errors.push('Le nom est requis');
    if (!data.restaurant?.trim()) errors.push('Le nom du restaurant est requis');
    if (!data.email?.trim()) errors.push('L\'email est requis');
    else if (!isValidEmail(data.email)) errors.push('L\'email n\'est pas valide');
    if (!data.phone?.trim()) errors.push('Le téléphone est requis');
    if (!data.consent) errors.push('Vous devez accepter d\'être contacté');
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    return true;
}

// Add cart functionality for menu demo
function addToCart(itemName, price) {
    showNotification(`🛒 ${itemName} ajouté au panier (${price})`, 'success');
    
    // Track add to cart
    trackEvent('demo_add_to_cart', {
        item: itemName,
        price: price
    });
}

// Setup menu demo interactions
function setupMenuDemo() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h4').textContent;
            const price = menuItem.querySelector('.price').textContent;
            addToCart(itemName, price);
        });
    });
}

// Enhanced initialization
function initializeApp() {
    setupEventListeners();
    setupCardFormatting();
    setupPaymentMethods();
    setupAnimations();
    setupContactForm();
    setupMenuDemo();
    animateCounters();
    console.log('WebResto initialized successfully!');
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        selectPlan,
        validatePaymentForm,
        isValidEmail,
        isValidCardNumber,
        formatCardNumber,
        formatExpiryDate,
        formatCVV,
        showMenuCategory,
        validateContactForm,
        addToCart
    };
}