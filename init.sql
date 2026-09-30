CREATE TABLE IF NOT EXISTS products (
  id          INTEGER PRIMARY KEY,
  nom         TEXT NOT NULL,
  description TEXT,
  prix        REAL NOT NULL,
  categorie   TEXT
);

-- Chargement initial depuis product.json (uniquement si la table est vide)
INSERT INTO products (id, nom, description, prix, categorie)
SELECT
  json_extract(value, '$.id'),
  json_extract(value, '$.nom'),
  json_extract(value, '$.description'),
  json_extract(value, '$.prix'),
  json_extract(value, '$.categorie')
FROM json_each(readfile('/seed/product.json'))
WHERE NOT EXISTS (SELECT 1 FROM products);
