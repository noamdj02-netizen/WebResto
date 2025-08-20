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
    const planNameEl = document.getElementById('selectedPlanName');
    const planPriceEl = document.getElementById('selectedPlanPrice');
    const payAmountEl = document.getElementById('payAmount');
    if (planNameEl) planNameEl.textContent = `Plan ${planName}`;
    if (planPriceEl) planPriceEl.textContent = `${price}€/mois`;
    if (payAmountEl) payAmountEl.textContent = `${price}€`;
    
    // Fermer le modal des offres et ouvrir celui de paiement
    if (document.getElementById('offersModal')) closeOffersModal();
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
};

// Gestion du formulaire de paiement
function setupPaymentFormHandling() {
    const paymentForm = document.getElementById('paymentForm');
    if (!paymentForm) return;
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        processPayment();
    });
}

// Formatage automatique des champs de carte
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
    if (!payButton) return;
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
        const form = document.getElementById('paymentForm');
        if (form) form.reset();
    }, 2000);
}

// Init
window.addEventListener('DOMContentLoaded', function() {
    setupPaymentFormHandling();
    setupCardFormatting();
});