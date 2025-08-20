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

// Ouvrir/Fermer le modal des offres
function openOffersModal() {
	const modal = document.getElementById('offersModal');
	if (!modal) return;
	modal.style.display = 'block';
	document.body.style.overflow = 'hidden';
}

function closeOffersModal() {
	const modal = document.getElementById('offersModal');
	if (!modal) return;
	modal.style.display = 'none';
	document.body.style.overflow = 'auto';
}

// Sélection d'un plan depuis cartes ou modal
function selectPlan(planName, price) {
	selectedPlan = planName;
	selectedPrice = price;

	const planNameEl = document.getElementById('selectedPlanName');
	const planPriceEl = document.getElementById('selectedPlanPrice');
	const payAmountEl = document.getElementById('payAmount');

	if (planNameEl) planNameEl.textContent = `Plan ${planName}`;
	if (planPriceEl) planPriceEl.textContent = `${price}€/mois`;
	if (payAmountEl) payAmountEl.textContent = `${price}€`;

	closeOffersModal();
	openPaymentModal();
}

// Ouvrir/Fermer le modal de paiement
function openPaymentModal() {
	const modal = document.getElementById('paymentModal');
	if (!modal) return;
	modal.style.display = 'block';
	document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
	const modal = document.getElementById('paymentModal');
	if (!modal) return;
	modal.style.display = 'none';
	document.body.style.overflow = 'auto';
}

// Fermer les modals en cliquant à l'extérieur
window.addEventListener('click', (event) => {
	const offersModal = document.getElementById('offersModal');
	const paymentModal = document.getElementById('paymentModal');
	if (event.target === offersModal) {
		closeOffersModal();
	}
	if (event.target === paymentModal) {
		closePaymentModal();
	}
});

// Setup au chargement du DOM
function setupCardFormatting() {
	const cardNumber = document.getElementById('cardNumber');
	const expiryDate = document.getElementById('expiryDate');
	const cvv = document.getElementById('cvv');

	if (cardNumber) {
		cardNumber.addEventListener('input', (e) => {
			let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
			let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
			if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19);
			e.target.value = formattedValue;
		});
	}

	if (expiryDate) {
		expiryDate.addEventListener('input', (e) => {
			let value = e.target.value.replace(/\D/g, '');
			if (value.length >= 2) {
				value = value.substring(0, 2) + '/' + value.substring(2, 4);
			}
			e.target.value = value;
		});
	}

	if (cvv) {
		cvv.addEventListener('input', (e) => {
			e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 3);
		});
	}
}

function processPayment() {
	const payButton = document.querySelector('.pay-button');
	if (!payButton) return;
	const originalHTML = payButton.innerHTML;

	payButton.innerHTML = '🔄 Traitement...';
	payButton.disabled = true;

	setTimeout(() => {
		alert(`✅ Paiement réussi pour le plan ${selectedPlan} (${selectedPrice}€/mois)!\n\nVous recevrez un email de confirmation.`);
		payButton.innerHTML = originalHTML;
		payButton.disabled = false;
		closePaymentModal();
		const paymentForm = document.getElementById('paymentForm');
		if (paymentForm) paymentForm.reset();
	}, 1500);
}

function setupPaymentFormHandler() {
	const paymentForm = document.getElementById('paymentForm');
	if (!paymentForm) return;
	paymentForm.addEventListener('submit', (e) => {
		e.preventDefault();
		processPayment();
	});
}

// Offers page: toggle payment method
function setupPaymentMethodToggle() {
	const methods = document.querySelectorAll('.payment-method');
	if (!methods.length) return;
	methods.forEach((el) => {
		el.addEventListener('click', () => {
			methods.forEach((m) => m.classList.remove('active'));
			el.classList.add('active');
			const method = el.getAttribute('data-method');
			const cardSection = document.getElementById('cardPayment');
			if (cardSection) {
				cardSection.style.display = method === 'card' ? 'block' : 'none';
			}
		});
	});
}

// DOM ready
window.addEventListener('DOMContentLoaded', () => {
	setupCardFormatting();
	setupPaymentFormHandler();
	setupPaymentMethodToggle();
});
</script>
</body>
</html>