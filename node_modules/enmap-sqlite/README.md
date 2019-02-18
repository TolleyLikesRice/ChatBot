# Enmap-SQLite

Enmap-SQLite is a provider for the [Enmap](https://www.npmjs.com/package/enmap) module. 

## Installation

To install Enmap-SQLite simply run `npm i enmap-sqlite`.

## Usage

```js
// Load Enmap
const Enmap = require('enmap');
 
// Load EnmapSQLite
const EnmapSQLite = require('enmap-sqlite');
 
// Initialize the provider
const provider = new EnmapSQLite({ name: 'test' });
 
// Initialize the Enmap with the provider instance.
const myColl = new Enmap({ provider: provider });
```

Shorthand declaration: 

```js
const Enmap = require('enmap');
const EnmapSQLite = require('enmap-sqlite');
const myColl = new Enmap({ provider: new EnmapSQLite({ name: 'test' }); });
```

## Options

```js
// Example with all options.
const level = new EnmapSQLite({ 
  name: "test",
  dataDir: './data'
});
```

### name

Defines the `name` of the table saved in sqlite. 

### dataDir 

Indicates the relative or absolute directory where to hold the sqlite file. If multiple enmap use the same file, a new table is created for each. The filename is always `enmap.sqlite`.
