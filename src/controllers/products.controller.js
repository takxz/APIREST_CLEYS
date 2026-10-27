const db = require('../config/db');

exports.list = (req, res) => {
    const products = db.prepare('SELECT * FROM products').all();
    res.json(products);
};

exports.getById = (req, res) => {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ erreur: 'Produit non trouvé' });
    }
};

exports.create = (req, res) => {
    const { nom, prix, description, categorie } = req.body;
    const product = db.prepare('INSERT INTO products (nom, prix, description, categorie) VALUES (?, ?, ?, ?)').run(nom, prix, description, categorie);
    res.status(201).json({ id: Number(product.lastInsertRowid) });
};

exports.remove = (req, res) => {
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    if (result.changes > 0) {
        res.status(204).send();
    } else {
        res.status(404).json({ erreur: 'Produit non trouvé' });
    }
};

exports.replace = (req, res) => {
    const { nom, prix, description, categorie } = req.body;
    const result = db.prepare('UPDATE products SET nom = ?, prix = ?, description = ?, categorie = ? WHERE id = ?')
        .run(nom ? nom : null, prix ? prix : null, description ? description : null, categorie ? categorie : null, req.params.id);
    if (result.changes > 0) {
        res.status(200).json({ message: 'Produit mis à jour avec succès' });
    } else {
        res.status(404).json({ erreur: 'Produit non trouvé' });
    }
};

exports.update = (req, res) => {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);

    if (!product) {
        return res.status(404).json({ erreur: 'Produit non trouvé' });
    }

    const nom = req.body.nom ?? product.nom;
    const prix = req.body.prix ?? product.prix;
    const description = req.body.description ?? product.description;
    const categorie = req.body.categorie ?? product.categorie;

    const result = db.prepare('UPDATE products SET nom = ?, prix = ?, description = ?, categorie = ? WHERE id = ?')
        .run(nom, prix, description, categorie, req.params.id);

    if (result.changes > 0) {
        res.status(200).json({ message: 'Produit mis à jour avec succès' });
    }
};
