const express = require('express');
const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('./data/database.sqlite');
const app = express();

app.use(express.json());

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

app.get('/products', (req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ erreur: 'Produit non trouvé' });
  }
});

app.post('/products', (req, res) => {
    const product = db.prepare('INSERT INTO products (nom, prix, description, categorie) VALUES (?, ?, ?, ?)').run(req.body.nom, req.body.prix, req.body.description, req.body.categorie);
    res.status(201).json({ id: Number(product.lastInsertRowid) });
})

app.delete('/products/:id', (req, res) => {
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    if (result.changes > 0) {
        res.status(204).send();
    } else {
        res.status(404).json({ erreur: 'Produit non trouvé' });
    }
})

app.put('/products/:id', (req, res) => {
    const result = db.prepare('UPDATE products SET nom = ?, prix = ?, description = ?, categorie = ? WHERE id = ?').run(req.body.nom ? req.body.nom : null, req.body.prix ? req.body.prix : null, req.body.description ? req.body.description : null, req.body.categorie ? req.body.categorie : null, req.params.id);
    if (result.changes > 0) {
        res.status(200).json({ message: 'Produit mis à jour avec succès' });
    } else {
        res.status(404).json({ erreur: 'Produit non trouvé' });
    }
})

app.patch('/products/:id', (req, res) => {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    
    if (!product) {
        return res.status(404).json({ erreur: 'Produit non trouvé' });
    }

    const updatedProduct = {
        nom: req.body.nom ?? product.nom,
        prix: req.body.prix ?? product.prix,
        description: req.body.description ?? product.description,
        categorie: req.body.categorie ?? product.categorie
    };

    const result = db.prepare('UPDATE products SET nom = ?, prix = ?, description = ?, categorie = ? WHERE id = ?').run(updatedProduct.nom, updatedProduct.prix, updatedProduct.description, updatedProduct.categorie, req.params.id);
    
    if (result.changes > 0) {
        res.status(200).json({ message: 'Produit mis à jour avec succès' });
    } 
});