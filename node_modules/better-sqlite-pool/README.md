# Better-SQLite-Pool

**A connection pool for the module**
**[better-sqlite3](https://github.com/JoshuaWise/better-sqlite3).**

Using this module to open pools and acquire connections, and `release` the 
connection once it has done its work.

## Example

```javascript
const { Pool } = require("better-sqlite-pool");

// Create a new pool:
var pool = new Pool("./example.db");

// use Promise:
pool.acquire().then(db => {
    var res = db.prepare("select * from users where id = 1").get();
    console.log(res);
    db.release();
});

// use async/await:
(async function() {
    var db = await pool.acquire();
    var res = db.prepare("select * from users where id = 2").get();
    console.log(res);
    db.release();
})();


setImmediate(() => {
    console.log(pool);
});
```

## API

### `new Pool(path: string, options:? object|boolean|number)`

**Creates a new pool to store database connections.**

- `path` A SQLite database file path, can be set to `:memory` to open a memory
    based database.
- `[options]` May contain any of these:
    - `readonly` Default is `false`.
    - `memory` Default is `false`.
    - `fileMustExist` Default is `false`.
    - `max` Max connections in the pool, default is `5`.
    
    If this argument is set to a `boolean`, it's equivalent to `readonly`, 
    if set to a number, it's equivalent to `max`.

### `pool.acquire(): Promise<Database>`

**Acquires a connection from the pool.**

The only argument pass to the callback of `Promise.then()` is the database connection retrieved.

### `pool.close()`

**Closes all connections in the pool.**

## Issues

### `node-gyp` error

If you have any problem of downloading and installing this module, it's most 
likely that you don't have a `node-gyp` installed, which is used to compile 
`better-sqlite3` binary files. so please install `node-gyp` first if this 
situation occurs to you.

### `VCBulid.exe` error

Another problem you may face is your computer throw an error that tells you 
the `VCBulid.exe` file is missing. This is probably you don't have a Visual 
Studio installed, install one with VC++ support, that will fix the problem.