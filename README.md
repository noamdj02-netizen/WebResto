# 🍽️ WebResto - Solutions Digitales pour Restaurants

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-14.0.0+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-blue.svg)](https://expressjs.com/)

**WebResto** est une plateforme complète de transformation digitale pour restaurants, offrant des solutions web, mobiles et de gestion en ligne.

## ✨ Fonctionnalités Principales

- 🖥️ **Site Web Responsive** - Design moderne et adaptatif
- 📱 **Application Mobile Native** - iOS et Android personnalisés
- 🛒 **Commande en Ligne** - Système de commande intégré
- 💳 **Paiement Sécurisé** - Multiples moyens de paiement
- 📊 **Analytics Avancées** - Tableaux de bord détaillés
- 🎯 **Marketing Automatisé** - Campagnes intelligentes
- 🔧 **Support 24/7** - Accompagnement continu

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 14.0.0 ou supérieur
- npm ou yarn

### Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/webresto/webresto-app.git
   cd webresto-app
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer l'application**
   ```bash
   # Mode développement
   npm run dev
   
   # Mode production
   npm start
   ```

4. **Ouvrir votre navigateur**
   ```
   http://localhost:3000
   ```

## 🏗️ Architecture

```
webresto/
├── index.html          # Page principale
├── style.css           # Styles CSS
├── script.js           # Logique JavaScript
├── server.js           # Serveur Express
├── package.json        # Dépendances et scripts
└── README.md           # Documentation
```

## 💰 Plans et Tarifs

| Plan | Prix | Fonctionnalités |
|------|------|-----------------|
| **Starter** | 29€/mois | Site web, menu digital, réservations |
| **Professional** | 79€/mois | + App mobile, commandes, paiement |
| **Enterprise** | 199€/mois | + Multi-restaurants, analytics, support 24/7 |

## 🛠️ Technologies Utilisées

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: Node.js, Express.js
- **Design**: CSS Grid, Flexbox, Animations CSS
- **Responsive**: Mobile-first design
- **Performance**: Lazy loading, optimisations

## 📱 Fonctionnalités Détaillées

### Application Mobile
- Design personnalisé aux couleurs du restaurant
- Navigation intuitive et moderne
- Notifications push pour les promotions
- Mode hors ligne pour les menus

### Commande en Ligne
- Menu dynamique avec photos
- Gestion des stocks en temps réel
- Suivi des commandes
- Historique des commandes

### Paiement Sécurisé
- Cartes bancaires (Visa, Mastercard)
- Paiement mobile (Apple Pay, Google Pay)
- Cryptomonnaies acceptées
- Sécurité de niveau bancaire

### Analytics et Reporting
- Ventes en temps réel
- Analyse des clients
- Prévisions intelligentes
- Rapports automatisés

## 🔌 API Endpoints

### Contact
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Nom du contact",
  "restaurant": "Nom du restaurant",
  "email": "contact@restaurant.fr",
  "phone": "+33123456789",
  "message": "Description des besoins"
}
```

### Paiement
```http
POST /api/payment
Content-Type: application/json

{
  "plan": "Professional",
  "price": 79,
  "restaurantName": "Le Petit Bistrot",
  "email": "contact@bistrot.fr",
  "phone": "+33123456789"
}
```

## 🎨 Personnalisation

### Couleurs
Les couleurs principales peuvent être modifiées dans `style.css` :
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #27ae60;
}
```

### Logo et Images
- Remplacer les emojis par vos propres icônes
- Ajouter votre logo dans le header
- Personnaliser les images de fond

## 📱 Responsive Design

L'application est entièrement responsive et s'adapte à tous les écrans :
- **Desktop** : Layout en grille avec sidebar
- **Tablet** : Adaptation des colonnes
- **Mobile** : Navigation hamburger, layout vertical

## 🚀 Déploiement

### Heroku
```bash
heroku create webresto-app
git push heroku main
```

### Vercel
```bash
npm i -g vercel
vercel
```

### Docker
```bash
docker build -t webresto .
docker run -p 3000:3000 webresto
```

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Tests en mode watch
npm run test:watch
```

## 📊 Performance

- **Lighthouse Score** : 95+
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1

## 🔒 Sécurité

- Validation des entrées utilisateur
- Protection CSRF
- Headers de sécurité
- Validation des paiements
- Chiffrement des données sensibles

## 🤝 Contribution

Nous acceptons les contributions ! Voici comment procéder :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

- **Email** : support@webresto.fr
- **Téléphone** : +33 1 23 45 67 89
- **Documentation** : [docs.webresto.fr](https://docs.webresto.fr)
- **Chat** : Disponible sur le site

## 🙏 Remerciements

- [Express.js](https://expressjs.com/) - Framework web
- [Inter Font](https://rsms.me/inter/) - Typographie
- [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) - Layout moderne

---

**WebResto** - Transformons ensemble votre restaurant en succès digital ! 🚀