const { Pool } = require('better-sqlite-pool');
const path = require('path');
const fs = require('fs');

class EnmapProvider {

  constructor(options) {
    this.defer = new Promise((resolve) => {
      this.ready = resolve;
    });

    if (!options.name) throw new Error('Must provide options.name');
    this.name = options.name;

    this.validateName();
    this.dataDir = path.resolve(process.cwd(), options.dataDir || 'data');
    if (!options.dataDir) {
      if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
      }
    }
  }

  /**
   * Internal method called on persistent Enmaps to load data from the underlying database.
   * @param {Map} enmap In order to set data to the Enmap, one must be provided.
   * @returns {Promise} Returns the defer promise to await the ready state.
   */
  async init(enmap) {
    this.pool = new Pool(`${this.dataDir}${path.sep}enmap.sqlite`);
    this.db = await this.pool.acquire();
    this.enmap = enmap;
    const table = this.db.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name = '${this.name}';`).get();
    if (!table['count(*)']) {
      this.db.prepare(`CREATE TABLE ${this.name} (key text PRIMARY KEY, value text)`).run();
      this.db.pragma('synchronous = 1');
      this.db.pragma('journal_mode = wal');
    }
    if (this.fetchAll) {
      await this.fetchEverything();
    }
    this.ready();
    return this.defer;
  }

  /**
   * Shuts down the underlying persistent enmap database.
   * @return {Promise<*>} The promise of the database closing operation.
   */
  close() {
    return Promise.resolve(this.db.close());
  }

  /**
   * Fetches a specific key or array of keys from the database, adds it to the EnMap object, and returns its value.
   * @param {(string|number)} key The key to retrieve from the database.
   * @return {Promise<*>} The value obtained from the database.
   */
  fetch(key) {
    const row = this.db.prepare(`SELECT * FROM ${this.name} WHERE key = ?;`).get(key);
    if (row) Map.prototype.set.call(this.enmap, key, row.value);
    return Promise.resolve(row.data);
  }

  /**
   * Fetches all non-cached values from the database, and adds them to the enmap.
   * @return {Promise<Map>} The promise of a cached Enmap.
  */
  fetchEverything() {
    const rows = this.db.prepare(`SELECT * FROM ${this.name};`).all();
    for (const row of rows) {
      let parsedValue = row.value;
      if (row.value[0] === '[' || row.value[0] === '{') {
        parsedValue = JSON.parse(row.value);
      }
      Map.prototype.set.call(this.enmap, row.key, parsedValue);
    }
    return Promise.resolve(this);
  }

  /**
   * Set a value to the Enmap.
   * @param {(string|number)} key Required. The key of the element to add to the EnMap object.
   * If the EnMap is persistent this value MUST be a string or number.
   * @param {*} val Required. The value of the element to add to the EnMap object.
   * If the EnMap is persistent this value MUST be stringifiable as JSON.
   * @return {Promise<*>} Promise returned by the database after insertion.
   */
  set(key, val) {
    if (!key || !['String', 'Number'].includes(key.constructor.name)) {
      throw new Error('SQLite require keys to be strings or numbers.');
    }
    const insert = typeof val === 'object' ? JSON.stringify(val) : val;
    return Promise.resolve(this.db.prepare(`INSERT OR REPLACE INTO ${this.name} (key, value) VALUES (?, ?);`).run(key, insert));
  }

  /**
   * Delete an entry from the Enmap.
   * @param {(string|number)} key Required. The key of the element to delete from the EnMap object.
   * @param {boolean} bulk Internal property used by the purge method.
   * @return {Promise<*>} Promise returned by the database after deletion
   */
  delete(key) {
    return Promise.resolve(this.db.prepare(`DELETE FROM ${this.name} WHERE key = '${key}'`).run());
  }

  hasAsync(key) {
    return Promise.resolve(this.db.prepare(`SELECT key FROM ${this.name} WHERE key = ?`).get(key));
  }

  /**
   * Deletes all entries in the database.
   * @return {Promise<*>} Promise returned by the database after deletion
   */
  bulkDelete() {
    return Promise.resolve(this.db.prepare(`DELETE FROM ${this.name};`).run());
  }

  /**
   * Internal method used to validate persistent enmap names (valid Windows filenames)
   * @private
   */
  validateName() {
    this.name = this.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  }

}

module.exports = EnmapProvider;
