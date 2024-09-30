const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/test', (req, res) => {
    res.send('Test de la route API réussie !');
  });

// Route pour obtenir toutes les marques
router.get('/marques', (req, res) => {
  db.query('SELECT * FROM marques', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Route pour obtenir toutes les pointures
router.get('/pointures', (req, res) => {
  db.query('SELECT * FROM pointures', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Route pour obtenir tous les modèles
router.get('/models', (req, res) => {
  db.query('SELECT * FROM models', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Route pour rechercher un modèle spécifique
router.get('/search', (req, res) => {
  const { query } = req.query; // Obtient la requête de recherche
  db.query('SELECT * FROM models WHERE model LIKE ? OR id_marque IN (SELECT id_marque FROM marques WHERE marque LIKE ?)', [`%${query}%`, `%${query}%`], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Route pour supprimer tous les modèles
router.delete('/models', (req, res) => {
    const sql = 'DELETE FROM models';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Tous les modèles ont été supprimés.' });
    });
  });
  
  // Route pour supprimer toutes les marques
  router.delete('/marques', (req, res) => {
    const sql = 'DELETE FROM marques';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Toutes les marques ont été supprimées.' });
    });
  });
  
  // Route pour supprimer toutes les pointures
  router.delete('/pointures', (req, res) => {
    const sql = 'DELETE FROM pointures';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Toutes les pointures ont été supprimées.' });
    });
  });
  
  // Route pour rechercher et supprimer un modèle spécifique
  router.delete('/models/:id', (req, res) => {
    const modelId = req.params.id;
    const sql = 'DELETE FROM models WHERE id_model = ?';
    db.query(sql, [modelId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Modèle non trouvé.' });
      }
      res.json({ message: `Modèle avec l'ID ${modelId} supprimé.` });
    });
  });

  // Route pour ajouter un modèle
router.post('/models', (req, res) => {
    const { model, id_marque, pointure, textphoto, couleur } = req.body;
    const sql = 'INSERT INTO models (model, id_marque, pointure, textphoto, couleur) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [model, id_marque, pointure, textphoto, couleur], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Modèle ajouté avec succès.', id: results.insertId });
    });
  });
  
  // Route pour rechercher un modèle par ID
  router.get('/models/:id', (req, res) => {
    const modelId = req.params.id;
    const sql = 'SELECT * FROM models WHERE id_model = ?';
    db.query(sql, [modelId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Modèle non trouvé.' });
      }
      res.json(results[0]);
    });
  });
  
  // Route pour modifier un modèle
  router.put('/models/:id', (req, res) => {
    const modelId = req.params.id;
    const { model, id_marque, pointure, textphoto, couleur } = req.body;
    const sql = 'UPDATE models SET model = ?, id_marque = ?, pointure = ?, textphoto = ?, couleur = ? WHERE id_model = ?';
    db.query(sql, [model, id_marque, pointure, textphoto, couleur, modelId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Modèle non trouvé.' });
      }
      res.json({ message: 'Modèle mis à jour avec succès.' });
    });
  });
  
  // Route pour ajouter une marque
  router.post('/marques', (req, res) => {
    const { marque } = req.body;
    const sql = 'INSERT INTO marques (marque) VALUES (?)';
    db.query(sql, [marque], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Marque ajoutée avec succès.', id: results.insertId });
    });
  });
  
  // Route pour ajouter une pointure
  router.post('/pointures', (req, res) => {
    const { pointure } = req.body;
    const sql = 'INSERT INTO pointures (pointure) VALUES (?)';
    db.query(sql, [pointure], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Pointure ajoutée avec succès.' });
    });
  });

  
  

module.exports = router;
