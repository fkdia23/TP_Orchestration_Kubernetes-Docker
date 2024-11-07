const express = require('express');
const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'mysql-service',  // Nom du service défini dans le YAML
  user: process.env.MYSQL_USER || 'root',           // Utilisateur MySQL
  password: process.env.MYSQL_PASSWORD || 'rootpassword', // Mot de passe MySQL
  database: process.env.MYSQL_DATABASE || 'mydatabase'  // Nom de la base de données
});


// Établir la connexion
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
    return;
  }
  console.log('Connecté à MySQL avec succès !');
});

// Initialiser Express
const app = express();
const port = 3003;

// Route pour récupérer tous les utilisateurs
app.get('/', (req, res) => {
  const query = 'SELECT * FROM users'; // Requête pour récupérer tous les utilisateurs

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête :', err);
      return res.status(500).send('Erreur de serveur');
    }
    res.json(results); // Renvoie les résultats au format JSON
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution à http://localhost:${port}`);
});

// Fermer la connexion lorsque le serveur s'arrête
process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Erreur lors de la fermeture de la connexion :', err);
    }
    console.log('Connexion MySQL fermée.');
    process.exit();
  });
});