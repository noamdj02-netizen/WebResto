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
    console.log('WebResto initialisé avec succès !');
    
    // Ajouter des animations d'entrée
    animateOnScroll();
    
    // Initialiser les tooltips et interactions
    initializeInteractions();
});

// Fonction pour aller vers la page des offres
function goToOffers() {
    // Scroll vers la section des offres
    const offersSection = document.querySelector('.features');
    if (offersSection) {
        offersSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Fonction pour ouvrir le modal des offres
function openOffersModal() {
    const modal = document.getElementById('offersModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animation d'entrée
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        modal.querySelector('.modal-content').style.opacity = '0';
        
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
            modal.querySelector('.modal-content').style.opacity = '1';
        }, 100);
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
    
    // Mettre à jour l'affichage du modal de paiement
    document.getElementById('selectedPlanName').textContent = planName;
    document.getElementById('selectedPlanPrice').textContent = price + '€/mois';
    document.getElementById('payAmount').textContent = price + '€';
    
    // Fermer le modal des offres
    closeOffersModal();
    
    // Ouvrir le modal de paiement
    openPaymentModal();
    
    // Animation de sélection
    showSelectionAnimation(planName);
}

// Fonction pour ouvrir le modal de paiement
function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animation d'entrée
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        modal.querySelector('.modal-content').style.opacity = '0';
        
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
            modal.querySelector('.modal-content').style.opacity = '1';
        }, 100);
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

// Fonction pour gérer la soumission du formulaire de paiement
function handlePaymentSubmission(event) {
    event.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = new FormData(event.target);
    const restaurantName = document.getElementById('restaurantName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    // Validation basique
    if (!restaurantName || !email || !phone) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    // Simuler le traitement du paiement
    showPaymentProcessing();
    
    setTimeout(() => {
        // Simuler une réponse de succès
        showPaymentSuccess();
        
        // Réinitialiser le formulaire
        event.target.reset();
        
        // Fermer le modal après un délai
        setTimeout(() => {
            closePaymentModal();
        }, 3000);
    }, 2000);
}

// Fonction pour afficher le traitement du paiement
function showPaymentProcessing() {
    const payButton = document.querySelector('.pay-button');
    const originalText = payButton.innerHTML;
    
    payButton.innerHTML = '<span class="spinner"></span> Traitement...';
    payButton.disabled = true;
    
    // Ajouter la classe de style pour le spinner
    payButton.classList.add('processing');
}

// Fonction pour afficher le succès du paiement
function showPaymentSuccess() {
    const payButton = document.querySelector('.pay-button');
    
    payButton.innerHTML = '✅ Paiement réussi !';
    payButton.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
    
    showNotification('Paiement traité avec succès ! Votre restaurant sera configuré dans les 24h.', 'success');
}

// Fonction pour afficher les notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Ajouter au body
    document.body.appendChild(notification);
    
    // Animation d'entrée
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-suppression après 5 secondes
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Fonction pour afficher l'animation de sélection
function showSelectionAnimation(planName) {
    const notification = document.createElement('div');
    notification.className = 'selection-notification';
    notification.innerHTML = `
        <div class="selection-content">
            <span class="selection-icon">🎯</span>
            <span class="selection-text">Plan ${planName} sélectionné !</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 2000);
}

// Fonction pour les animations au scroll
function animateOnScroll() {
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
    animatedElements.forEach(el => observer.observe(el));
}

// Fonction pour initialiser les interactions
function initializeInteractions() {
    // Gestionnaire pour le formulaire de paiement
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmission);
    }
    
    // Fermeture des modals en cliquant à l'extérieur
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
    
    // Fermeture des modals avec la touche Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeOffersModal();
            closePaymentModal();
        }
    });
    
    // Validation en temps réel des champs de carte
    initializeCardValidation();
}

// Fonction pour initialiser la validation des cartes
function initializeCardValidation() {
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            value = value.replace(/\D/g, '');
            value = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = value.substring(0, 19);
        });
    }
    
    if (expiryDate) {
        expiryDate.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value.substring(0, 5);
        });
    }
    
    if (cvv) {
        cvv.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
        });
    }
}

// Fonction pour le smooth scroll
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Fonction pour ajouter des effets de parallaxe
function addParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Fonction pour initialiser les compteurs animés
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
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
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Fonction pour gérer la navigation mobile
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Initialisation des fonctionnalités avancées
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter l'effet de parallaxe
    addParallaxEffect();
    
    // Initialiser les compteurs
    initializeCounters();
    
    // Ajouter des styles CSS dynamiques pour les notifications
    addDynamicStyles();
});

// Fonction pour ajouter des styles CSS dynamiques
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification-success {
            border-left: 4px solid #27ae60;
        }
        
        .notification-error {
            border-left: 4px solid #e74c3c;
        }
        
        .notification-info {
            border-left: 4px solid #3498db;
        }
        
        .notification-content {
            padding: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .selection-notification {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            z-index: 3000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .selection-notification.show {
            opacity: 1;
        }
        
        .selection-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Export des fonctions pour utilisation externe
window.WebResto = {
    openOffersModal,
    closeOffersModal,
    selectPlan,
    openPaymentModal,
    closePaymentModal,
    smoothScrollTo,
    toggleMobileMenu
};
</script>
</body>
</html>