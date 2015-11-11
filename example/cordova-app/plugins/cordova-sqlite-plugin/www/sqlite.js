var exec = require('cordova/exec');

var Connection = function(name) {
  this.name = name;
};

Connection.prototype.connect = function(callback) {
  var options = {
    name: this.name,
    dblocation: 'nosync' // TODO: add alternative locations 'docs' and 'libs'
  };
  var success = function() {
    callback();
  };
  var error = function() {
    callback(new Error('SQLite Error: cannot open database \'' + this.name + '\''));
  }
  exec(success, error, 'SQLitePlugin', 'open', [options]);
};

Connection.prototype.end = function(callback) {
  var success = function() {
    callback();
  };
  var error = function() {
    callback(new Error('SQLite Error: cannot close database \'' + this.name + '\''));
  }
  exec(success, error, 'SQLitePlugin', 'close', [{ path: this.name }]);
};

Connection.prototype.query = function(sql, values, callback) {
  if (typeof values === 'function') {
    callback = values;
    values = [];
  }
  var query = {
    qid: 1111,
    sql: sql,
    params: values
  };
  var success = function(result) {
    callback(null, result);
  };
  var error = function(result) {
    var err;
    if (result && result.message) {
      err = new Error('SQLite Error: ' + result.message);
    } else {
      err = new Error('SQLite Error: unknown error');
    }
    if (result && result.code != null) err.code = result.code;
    callback(err);
  };
  exec(success, error, 'SQLitePlugin', 'backgroundExecuteSql', [{
    dbargs: { dbname: this.name },
    ex: query
  }]);
};

var SQLite = function() {};

SQLite.prototype.createConnection = function(name) {
  return new Connection(name);
};

module.exports = new SQLite();
