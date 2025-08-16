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
// Navigation vers la page des offres
function goToOffers() {
    window.location.href = 'offers.html';
}

// Variables pour le système de paiement
let selectedPlan = '';
let selectedPrice = 0;

// Ouvrir le modal des offres
function openOffersModal() {
    document.getElementById('offersModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fermer le modal des offres
function closeOffersModal() {
    document.getElementById('offersModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Sélectionner un plan
function selectPlan(planName, price) {
    selectedPlan = planName;
    selectedPrice = price;
    
    // Mettre à jour les informations dans le modal de paiement
    document.getElementById('selectedPlanName').textContent = `Plan ${planName}`;
    document.getElementById('selectedPlanPrice').textContent = `${price}€/mois`;
    document.getElementById('payAmount').textContent = `${price}€`;
    
    // Fermer le modal des offres et ouvrir celui de paiement
    closeOffersModal();
    openPaymentModal();
}

// Ouvrir le modal de paiement
function openPaymentModal() {
    document.getElementById('paymentModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fermer le modal de paiement
function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
    document.body.style.overflow = 'auto';
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

// Gestion du formulaire de paiement
document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('paymentForm');
    
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processPayment();
        });
    }
    
    // Formatage automatique des champs de carte
    setupCardFormatting();
});

function setupCardFormatting() {
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19);
            e.target.value = formattedValue;
        });
    }
    
    if (expiryDate) {
        expiryDate.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    if (cvv) {
        cvv.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 3);
        });
    }
}

function processPayment() {
    const payButton = document.querySelector('.pay-button');
    const originalText = payButton.innerHTML;
    
    // Animation de chargement
    payButton.innerHTML = '🔄 Traitement...';
    payButton.disabled = true;
    
    // Simulation du paiement
    setTimeout(() => {
        alert(`✅ Paiement réussi pour le plan ${selectedPlan} (${selectedPrice}€/mois)!\n\nVous recevrez un email de confirmation.`);
        
        // Réinitialiser
        payButton.innerHTML = originalText;
        payButton.disabled = false;
        closePaymentModal();
        
        // Réinitialiser le formulaire
        document.getElementById('paymentForm').reset();
    }, 2000);
}
</script>
</body>
</html>