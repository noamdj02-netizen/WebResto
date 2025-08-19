const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/offers', (req, res) => {
    res.sendFile(path.join(__dirname, 'offers.html'));
});

// API Routes
app.post('/api/contact', (req, res) => {
    const { name, restaurant, email, phone, message } = req.body;
    
    // Simulation de traitement
    console.log('Nouveau contact reçu:', { name, restaurant, email, phone, message });
    
    // Ici vous pourriez ajouter l'envoi d'email, sauvegarde en base, etc.
    
    res.json({
        success: true,
        message: 'Votre message a été reçu. Nous vous recontacterons dans les 24h.'
    });
});

app.post('/api/payment', (req, res) => {
    const { plan, price, restaurantName, email, phone } = req.body;
    
    // Simulation de traitement de paiement
    console.log('Paiement reçu:', { plan, price, restaurantName, email, phone });
    
    // Ici vous pourriez intégrer Stripe, PayPal, etc.
    
    setTimeout(() => {
        res.json({
            success: true,
            message: 'Paiement traité avec succès ! Votre restaurant sera configuré dans les 24h.',
            transactionId: 'TXN_' + Date.now()
        });
    }, 2000);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Une erreur est survenue sur le serveur.'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Page non trouvée'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 WebResto server running on http://localhost:${PORT}`);
    console.log(`📱 Application ready for restaurant digital transformation!`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});