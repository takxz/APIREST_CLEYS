const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync(path.join(__dirname, '..', '..', 'data', 'database.sqlite'));

// Migration des bases créées avant l'ajout des rôles
function addColumnIfMissing(table, column, definition) {
    const columns = db.prepare(`PRAGMA table_info(${table})`).all();
    if (!columns.some((c) => c.name === column)) {
        db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
    }
}

addColumnIfMissing('users', 'role', "TEXT NOT NULL DEFAULT 'client'");
addColumnIfMissing('products', 'created_by', 'INTEGER');

module.exports = db;
