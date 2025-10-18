const { MongoClient } = require('mongodb');

let _client;
let _db;

async function connect(uri, dbName) {
  if (_db) return _db;
  _client = new MongoClient(uri);
  await _client.connect();
  _db = _client.db(dbName);
  return _db;
}

function db() {
  if (!_db) throw new Error('DB not initialized. Call connect() first.');
  return _db;
}

async function close() {
  if (_client) await _client.close();
}

module.exports = { connect, db, close };