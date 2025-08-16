// Navigation vers la page des offres
function goToOffers() {
    window.location.href = 'offers.html';
}

// Variables globales pour le paiement
let selectedPlan = null;
let selectedPrice = 0;

// Sélection d'un plan
function selectPlan(planName, price) {
    selectedPlan = planName;
    selectedPrice = price;
    
    // Mettre à jour le modal avec les informations du plan
    document.getElementById('selectedPlanName').textContent = `Plan ${planName.charAt(0).toUpperCase() + planName.slice(1)}`;
    document.getElementById('selectedPlanPrice').textContent = `${price}€/mois`;
    document.getElementById('payAmount').textContent = `${price}€`;
    
    // Ouvrir le modal de paiement
    openPaymentModal();
}

// Gestion du modal de paiement
function openPaymentModal() {
    document.getElementById('paymentModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fermer le modal en cliquant à l'extérieur
window.onclick = function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target === modal) {
        closePaymentModal();
    }
}

// Gestion des méthodes de paiement
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des méthodes de paiement
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            const methodType = this.dataset.method;
            togglePaymentSection(methodType);
        });
    });
    
    // Formatage automatique des champs
    setupCardFormatting();
    
    // Gestion du formulaire de paiement
    setupPaymentForm();
});

function togglePaymentSection(method) {
    const cardSection = document.getElementById('cardPayment');
    
    if (method === 'card') {
        cardSection.style.display = 'block';
    } else {
        cardSection.style.display = 'none';
    }
}

function setupCardFormatting() {
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    
    // Formatage du numéro de carte
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19);
        e.target.value = formattedValue;
    });
    
    // Formatage de la date d'expiration
    expiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
    
    // Limitation du CVV
    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 4);
    });
}

function setupPaymentForm() {
    const form = document.getElementById('paymentForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        processPayment();
    });
}

function processPayment() {
    const form = document.getElementById('paymentForm');
    const payButton = form.querySelector('.pay-button');
    const originalText = payButton.innerHTML;
    
    // Validation des champs requis
    if (!validateForm()) {
        return;
    }
    
    // Animation de chargement
    payButton.innerHTML = '<span>🔄 Traitement en cours...</span>';
    payButton.disabled = true;
    form.classList.add('loading');
    
    // Simulation du traitement de paiement
    setTimeout(() => {
        // Simulation d'un paiement réussi
        showPaymentSuccess();
        
        // Réinitialiser le bouton après succès
        setTimeout(() => {
            payButton.innerHTML = originalText;
            payButton.disabled = false;
            form.classList.remove('loading');
            closePaymentModal();
        }, 3000);
        
    }, 2000);
}

function validateForm() {
    const requiredFields = ['companyName', 'email', 'phone', 'cardNumber', 'expiryDate', 'cvv'];
    const termsCheckbox = document.getElementById('terms');
    
    let isValid = true;
    
    // Vérifier les champs requis
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    // Vérifier les conditions d'utilisation
    if (!termsCheckbox.checked) {
        showMessage('Veuillez accepter les conditions d\'utilisation', 'error');
        isValid = false;
    }
    
    // Validation de l'email
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        document.getElementById('email').style.borderColor = '#e74c3c';
        showMessage('Veuillez entrer une adresse email valide', 'error');
        isValid = false;
    }
    
    // Validation du numéro de carte
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    if (cardNumber && cardNumber.length < 13) {
        document.getElementById('cardNumber').style.borderColor = '#e74c3c';
        showMessage('Numéro de carte invalide', 'error');
        isValid = false;
    }
    
    return isValid;
}

function showMessage(text, type) {
    // Supprimer les anciens messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Créer le nouveau message
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Insérer le message au début du formulaire
    const form = document.querySelector('.payment-details');
    form.insertBefore(message, form.firstChild);
    
    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        message.remove();
    }, 5000);
}

function showPaymentSuccess() {
    const planName = selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1);
    showMessage(`🎉 Paiement réussi ! Bienvenue dans le plan ${planName}. Vous recevrez un email de confirmation sous peu.`, 'success');
    
    // Envoyer les données (simulation)
    console.log('Données de commande:', {
        plan: selectedPlan,
        price: selectedPrice,
        companyName: document.getElementById('companyName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        timestamp: new Date().toISOString()
    });
}

// Gestion du clavier (Escape pour fermer le modal)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePaymentModal();
    }
});

// Animation au scroll pour la page d'accueil
function setupScrollAnimations() {
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
    
    // Observer les cartes de fonctionnalités
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Initialiser les animations au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupScrollAnimations);
} else {
    setupScrollAnimations();
}