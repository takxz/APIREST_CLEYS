const path = require('path');
const { DatabaseSync } = require('node:sqlite');

module.exports = new DatabaseSync(path.join(__dirname, '..', '..', 'data', 'database.sqlite'));
