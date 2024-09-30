const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour analyser le corps des requêtes JSON
app.use(express.json());

// Importation des routes
const routes = require('./route'); // Importation des routes
app.use('/api', routes); // Préfixe de l'API

// Démarre le serveur et écoute sur le port 3000
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
