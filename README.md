# CordovaSQLitePlugin

Cordova SQLite plugin with a straightforward low-level API.

### Why this module?

To use a SQLite database from a Cordova app, there is the [cordova-sqlite-storage](https://www.npmjs.com/package/cordova-sqlite-storage) plugin. It is a good choice if you like the WebSQL API but in case you don't, there are not many options.

What's wrong with the WebSQL API? It is simply the worst API ever created throughout the history of computing. Jokes aside, in my opinion there is something fundamentally wrong: when we are in the middle of a transaction, there is no way to run something asynchronously.

This is why I created this module, I extracted all the good part (the native code) from [cordova-sqlite-storage](https://www.npmjs.com/package/cordova-sqlite-storage) and replaced the less good part (the JavaScript code implementing the WebSQL API) by a much simpler low-level API.

You can use this module directly but I would rather recommend to go with the [AnySQL](https://www.npmjs.com/package/anysql) module which is a slightly higher level API.

## Installation

With Cordova CLI tool:

```
cordova plugin add cordova-sqlite-plugin
```

## Usage

```js
var SQLite = window.cordova.require('cordova-sqlite-plugin.SQLite');

var sqlite = new SQLite('example');

sqlite.open(function(err) {
  if (err) throw err;
  sqlite.query('SELECT ? + ? AS solution', [2, 3], function(err, res) {
    if (err) throw err;
    console.log(res.rows[0].solution);
  });
});
```

## API

### `new SQLite(name)`

Create an instance of the SQLite database with the specified name.

#### Example

```javascript
var SQLite = window.cordova.require('cordova-sqlite-plugin.SQLite');

var sqlite = new SQLite('example');
```

### `sqlite.open(callback)`

Open the SQLite database.

```javascript
sqlite.open(function(err) {
  if (err) throw err;
  // ...
});
```

### `sqlite.query(sql, [values], callback)`

Query the SQLite database.

```javascript
sqlite.query('SELECT ? + ? AS solution', [2, 3], function(err, res) {
  if (err) throw err;
  console.log(res.rows[0].solution); // => 5
});
```

#### `sql`

A string containing the SQL query.

#### `values`

An optional array of values matching the `?` placeholders in the SQL query.

#### `callback`

A function with the following parameters:

- `error`: an instance of `Error` in case something wrong happens during the query.
- `result`: an object with the following properties:
  - `rows`: the rows returned by the query.
  - `affectedRows`: the number of affected rows by the query.
  - `insertId`: the auto-generated id by an INSERT query.

### `sqlite.close(callback)`

Close the SQLite database.

```javascript
sqlite.close(function(err) {
  if (err) throw err;
});
```

### `SQLite.deleteDatabase(name, callback)`

Delete the SQLite database with the specified name.

```javascript
SQLite.deleteDatabase('example', function(err) {
  if (err) throw err;
});
```

## License

MIT
