"use strict";

const EventEmitter = require("events").EventEmitter;
const Database = require("better-sqlite3");

/**
 * A connection pool for the module `better-sqlite3`.
 * 
 * Using this module to open pools and acquire connections, and `release` the 
 * connection once it has done its work.
 */
class Pool extends EventEmitter {
    /**
     * Creates a new pool to store database connections.
     * 
     * @param {string} path A SQLite database file path, can be set to 
     *  `:memory` to open a memory based database.
     * @param {object|boolean|number} options May contain any of these:
     *  - `readonly` Default is `false`.
     *  - `memory` Default is `false`.
     *  - `fileMustExist` Default is `false`.
     *  - `max` Max connections in the pool, default is `5`.
     * 
     *  If this argument is set to a boolean, it's equivalent to `readonly`, 
     *  if set to a number, it's equivalent to `max`.
     * 
     * @see https://github.com/JoshuaWise/better-sqlite3/wiki/API#new-databasepath-options
     */
    constructor(path, options = {}) {
        super();
        this.path = path;
        this.readonly = typeof options === "boolean" ? options : (options.readonly || false);
        this.memory = options.memory || this.path === ":memory";
        this.fileMustExist = options.fileMustExist || false;
        this.max = typeof options === "number" ? options : (options.max || 5);
        this.connections = {};
    }

    /**
     * Acquires a connection from the pool.
     * @see https://github.com/JoshuaWise/better-sqlite3/wiki/API#class-database
     * @returns {Promise<Database>} 
     */
    acquire() {
        var ids = Object.keys(this.connections),
            db = null,
            poolId = 0;

        for (let id of ids) {
            if (this.connections[id].available && this.connections[id].open) {
                poolId = id;
                db = this.connections[id];
                db.available = false;
                break;
            }
        }

        if (db) {
            return new Promise(resolve => {
                resolve(db);
            });
        } else {
            if (ids.length < this.max) {
                poolId = ids.length + 1;

                db = new Database(this.path, {
                    memory: this.memory,
                    readonly: this.readonly,
                    fileMustExist: this.fileMustExist,
                });

                db.available = false;
                db.release = () => {
                    if (db.open && db.inTransaction) {
                        db.exec("rollback");
                    }
                    db.available = db.open && true;
                    this.emit("release");
                };

                this.connections[poolId] = db;

                return new Promise(resolve => {
                    resolve(db);
                });
            } else {
                return new Promise(resolve => {
                    this.once("release", () => {
                        resolve(this.acquire());
                    });
                });
            }
        }
    }

    /**
     * Closes all connections in the pool.
     * @see https://github.com/JoshuaWise/better-sqlite3/wiki/API#close---this
     */
    close() {
        for (let id in this.connections) {
            if (this.connections[id].open)
                this.connections[id].close();
        }
    }
}
exports.default = exports.Pool = Pool;