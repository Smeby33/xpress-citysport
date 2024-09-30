const mysql = require('mysql2');

// Création de la connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',      // L'adresse de ton serveur MySQL
  user: 'root',           // Ton nom d'utilisateur MySQL
  password: '',           // Le mot de passe de l'utilisateur MySQL (vide si pas de mot de passe)
  database: 'citysport'   // Le nom de ta base de données
});

// Connexion à MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err);
    return;
  }
  console.log('Connecté à MySQL avec succès.');
});

module.exports = connection;
