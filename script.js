<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebResto - Accueil</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="nav-brand">
                <h1>🍽️ WebResto</h1>
            </div>
            <ul class="nav-links">
                <li><a href="#accueil">Accueil</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main class="main">
        <section class="hero">
            <div class="hero-content">
                <h1>Votre Restaurant en Ligne</h1>
                <p>Découvrez nos solutions digitales pour transformer votre restaurant</p>
                <button class="cta-button" onclick="goToOffers()">
                    Découvrir nos Offres
                </button>
                <button class="cta-button" onclick="openOffersModal()" style="margin-left: 1rem; background: #27ae60;">
                    Voir les Tarifs
                </button>
            </div>
        </section>

        <section class="features">
            <div class="container">
                <h2>Pourquoi choisir WebResto ?</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">📱</div>
                        <h3>Application Mobile</h3>
                        <p>Une app native pour vos clients</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🛒</div>
                        <h3>Commande en Ligne</h3>
                        <p>Système de commande intégré</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📊</div>
                        <h3>Analytics</h3>
                        <p>Suivez vos performances</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Modal des Offres -->
    <div id="offersModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeOffersModal()">&times;</span>
            <div class="offers-content">
                <h2>Nos Offres WebResto</h2>
                <div class="pricing-grid">
                    <!-- Offre Starter -->
                    <div class="pricing-card">
                        <div class="pricing-header">
                            <h3>Starter</h3>
                            <div class="price">29€<span>/mois</span></div>
                        </div>
                        <ul class="features-list">
                            <li>✅ Site web responsive</li>
                            <li>✅ Menu digital</li>
                            <li>✅ Réservations en ligne</li>
                            <li>❌ Application mobile</li>
                        </ul>
                        <div class="availability available">✅ Disponible</div>
                        <button class="select-btn" onclick="selectPlan('Starter', 29)">Choisir</button>
                    </div>

                    <!-- Offre Professional -->
                    <div class="pricing-card featured">
                        <div class="popular-badge">Populaire</div>
                        <div class="pricing-header">
                            <h3>Professional</h3>
                            <div class="price">79€<span>/mois</span></div>
                        </div>
                        <ul class="features-list">
                            <li>✅ Tout du plan Starter</li>
                            <li>✅ Application mobile</li>
                            <li>✅ Commandes en ligne</li>
                            <li>✅ Paiement intégré</li>
                        </ul>
                        <div class="availability limited">⚠️ 3 places restantes</div>
                        <button class="select-btn" onclick="selectPlan('Professional', 79)">Choisir</button>
                    </div>

                    <!-- Offre Enterprise -->
                    <div class="pricing-card">
                        <div class="pricing-header">
                            <h3>Enterprise</h3>
                            <div class="price">199€<span>/mois</span></div>
                        </div>
                        <ul class="features-list">
                            <li>✅ Tout du plan Professional</li>
                            <li>✅ Multi-restaurants</li>
                            <li>✅ Analytics avancées</li>
                            <li>✅ Support 24/7</li>
                        </ul>
                        <div class="availability available">✅ Sur demande</div>
                        <button class="select-btn" onclick="selectPlan('Enterprise', 199)">Choisir</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de Paiement -->
    <div id="paymentModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closePaymentModal()">&times;</span>
            <div class="payment-form">
                <h2>Finaliser votre Commande</h2>
                <div class="order-summary">
                    <div class="selected-plan">
                        <span id="selectedPlanName">Plan Professional</span>
                        <span id="selectedPlanPrice">79€/mois</span>
                    </div>
                </div>
                
                <form id="paymentForm">
                    <div class="form-group">
                        <label for="restaurantName">Nom du Restaurant *</label>
                        <input type="text" id="restaurantName" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Téléphone *</label>
                        <input type="tel" id="phone" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="cardNumber">Numéro de carte *</label>
                        <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="expiryDate">Expiration *</label>
                            <input type="text" id="expiryDate" placeholder="MM/AA" required>
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV *</label>
                            <input type="text" id="cvv" placeholder="123" required>
                        </div>
                    </div>
                    
                    <button type="submit" class="pay-button">
                        Payer <span id="payAmount">79€</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
    <script>
// Variables globales
let selectedPlan = null;
let selectedPrice = 0;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('WebResto initialisé');
    initializeAnimations();
    setupFormValidation();
});

// Fonction pour aller vers la page des offres
function goToOffers() {
    window.location.href = 'offers.html';
}

// Fonction pour ouvrir le modal des offres
function openOffersModal() {
    const modal = document.getElementById('offersModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        animateModalOpen();
    }
}

// Fonction pour fermer le modal des offres
function closeOffersModal() {
    const modal = document.getElementById('offersModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Fonction pour sélectionner un plan
function selectPlan(planName, price) {
    selectedPlan = planName;
    selectedPrice = price;
    
    // Mettre à jour le modal de paiement
    document.getElementById('selectedPlanName').textContent = planName;
    document.getElementById('selectedPlanPrice').textContent = price + '€/mois';
    document.getElementById('payAmount').textContent = price + '€';
    
    // Fermer le modal des offres et ouvrir celui du paiement
    closeOffersModal();
    openPaymentModal();
}

// Fonction pour ouvrir le modal de paiement
function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        animateModalOpen();
    }
}

// Fonction pour fermer le modal de paiement
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Animation d'ouverture des modals
function animateModalOpen() {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8) translateY(-50px)';
        
        setTimeout(() => {
            modalContent.style.transition = 'all 0.3s ease';
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'scale(1) translateY(0)';
        }, 10);
    }
}

// Fermer les modals en cliquant à l'extérieur
window.onclick = function(event) {
    const offersModal = document.getElementById('offersModal');
    const paymentModal = document.getElementById('paymentModal');
    
    if (event.target === offersModal) {
        closeOffersModal();
    }
    if (event.target === paymentModal) {
        closePaymentModal();
    }
}

// Fermer les modals avec la touche Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeOffersModal();
        closePaymentModal();
    }
});

// Validation du formulaire de paiement
function setupFormValidation() {
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmit);
        
        // Validation en temps réel des champs
        const inputs = paymentForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// Validation d'un champ individuel
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Supprimer les anciens messages d'erreur
    clearFieldError(event);
    
    // Validation selon le type de champ
    switch(field.type) {
        case 'email':
            if (!value || !isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Veuillez entrer une adresse email valide';
            }
            break;
        case 'tel':
            if (!value || !isValidPhone(value)) {
                isValid = false;
                errorMessage = 'Veuillez entrer un numéro de téléphone valide';
            }
            break;
        case 'text':
            if (!value) {
                isValid = false;
                errorMessage = 'Ce champ est obligatoire';
            }
            break;
    }
    
    // Afficher l'erreur si nécessaire
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Afficher une erreur de champ
function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#e74c3c';
}

// Effacer l'erreur d'un champ
function clearFieldError(event) {
    const field = event.target;
    const errorDiv = field.parentNode.querySelector('.field-error');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    if (field.style.borderColor === 'rgb(231, 76, 60)') {
        field.style.borderColor = '#e9ecef';
    }
}

// Validation de l'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validation du téléphone
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Gestion de la soumission du formulaire de paiement
function handlePaymentSubmit(event) {
    event.preventDefault();
    
    // Valider tous les champs
    const form = event.target;
    const inputs = form.querySelectorAll('input');
    let allValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            allValid = false;
        }
    });
    
    if (!allValid) {
        showNotification('Veuillez corriger les erreurs dans le formulaire', 'error');
        return;
    }
    
    // Simuler le traitement du paiement
    showPaymentProcessing();
    
    setTimeout(() => {
        hidePaymentProcessing();
        showPaymentSuccess();
    }, 3000);
}

// Afficher le traitement du paiement
function showPaymentProcessing() {
    const payButton = document.querySelector('.pay-button');
    if (payButton) {
        payButton.innerHTML = '<span class="spinner"></span> Traitement...';
        payButton.disabled = true;
    }
}

// Masquer le traitement du paiement
function hidePaymentProcessing() {
    const payButton = document.querySelector('.pay-button');
    if (payButton) {
        payButton.innerHTML = `Payer <span id="payAmount">${selectedPrice}€</span>`;
        payButton.disabled = false;
    }
}

// Afficher le succès du paiement
function showPaymentSuccess() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.innerHTML = `
            <div class="modal-content">
                <div class="payment-success">
                    <div class="success-icon">✅</div>
                    <h2>Paiement Réussi !</h2>
                    <p>Votre commande a été confirmée. Nous vous contacterons dans les 24h pour finaliser la configuration.</p>
                    <div class="success-details">
                        <p><strong>Plan sélectionné :</strong> ${selectedPlan}</p>
                        <p><strong>Montant :</strong> ${selectedPrice}€/mois</p>
                    </div>
                    <button class="cta-button" onclick="closePaymentModal()">Fermer</button>
                </div>
            </div>
        `;
        
        // Ajouter les styles pour le succès
        const successStyles = `
            <style>
                .payment-success {
                    text-align: center;
                    padding: 3rem 2rem;
                }
                .success-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }
                .success-details {
                    background: #f8f9fa;
                    padding: 1.5rem;
                    border-radius: 15px;
                    margin: 2rem 0;
                    text-align: left;
                }
                .success-details p {
                    margin: 0.5rem 0;
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', successStyles);
    }
}

// Afficher une notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles de la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Couleur selon le type
    if (type === 'error') {
        notification.style.background = '#e74c3c';
    } else if (type === 'success') {
        notification.style.background = '#27ae60';
    } else {
        notification.style.background = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Animations au scroll
function initializeAnimations() {
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
    
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Animation des cartes au survol
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Smooth scroll pour les liens de navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Gestion du responsive pour la navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '☰';
    navToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    nav.insertBefore(navToggle, navLinks);
    
    // Afficher le bouton sur mobile
    function checkMobile() {
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'block';
            navLinks.style.display = 'none';
        } else {
            navToggle.style.display = 'none';
            navLinks.style.display = 'flex';
        }
    }
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Toggle de la navigation mobile
    navToggle.addEventListener('click', function() {
        if (navLinks.style.display === 'none' || navLinks.style.display === '') {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(102, 126, 234, 0.95)';
            navLinks.style.padding = '1rem';
            navLinks.style.borderRadius = '0 0 15px 15px';
        } else {
            navLinks.style.display = 'none';
        }
    });
});

// Ajout de styles CSS pour les animations
const animationStyles = `
    <style>
        .feature-card, .pricing-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .feature-card.animate-in, .pricing-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
            margin-right: 0.5rem;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .nav-toggle {
            display: none;
        }
        
        @media (max-width: 768px) {
            .nav-toggle {
                display: block;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', animationStyles);
</script>
</body>
</html>