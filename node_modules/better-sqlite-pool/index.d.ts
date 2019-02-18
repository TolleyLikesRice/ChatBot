import { EventEmitter } from "events";
import Database = require("better-sqlite3");

export interface PoolConnection extends Database {
    /** Wheter the connection is available and can be acquired. */
    readonly available: boolean;

    /** Releases the connection. */
    release(): void;
}

export class Pool extends EventEmitter {
    readonly path: string;
    readonly memory: boolean;
    readonly fileMustExist: boolean;
    readonly max: number;
    protected connections: { [n: string]: PoolConnection }

    /**
     * Creates a new pool to store database connections.
     * 
     * @param path A SQLite database file path, can be set to 
     *  `:memory` to open a memory based database.
     * @param options If this argument is set to a boolean, it's equivalent to
     *  `readonly`, if set to a number, it's equivalent to `max`.
     * 
     * @see https://github.com/JoshuaWise/better-sqlite3/wiki/API#new-databasepath-options
     */
    constructor(path: string, options?: number | boolean | {
        /** Default is `false`. */
        readonly: boolean;
        /** Default is `false`. */
        memory: boolean;
        /** Default is `false`. */
        fileMustExist: boolean;
        /** Max connections in the pool, default is `5`. */
        max: number;
    });

    /**
     * Acquires a connection from the pool.
     * @see https://github.com/JoshuaWise/better-sqlite3/wiki/API#class-database
     */
    acquire(): Promise<PoolConnection>;

    /**
     * Closes all connections in the pool.
     * @see https://github.com/JoshuaWise/better-sqlite3/wiki/API#close---this
     */
    close(): void;
}

export default Pool;