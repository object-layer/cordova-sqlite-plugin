var exec = require('cordova/exec');

function SQLite(name) {
  this.name = name;
}

SQLite.prototype.open = function(callback) {
  var that = this;
  var options = {
    name: that.name,
    dblocation: 'nosync' // TODO: add alternative locations 'docs' and 'libs'
  };
  var success = function() {
    callback();
  };
  var error = function() {
    callback(new Error('SQLite Error: cannot open database \'' + that.name + '\''));
  };
  exec(success, error, 'SQLitePlugin', 'open', [options]);
};

SQLite.prototype.query = function(sql, values, callback) {
  var that = this;
  if (typeof values === 'function') {
    callback = values;
    values = [];
  }
  var query = {
    qid: 1111,
    sql: sql,
    params: values
  };
  var cb = function(results) {
    var result = results[0];
    var type = result.type;
    result = result.result;
    if (type === 'success') { // success
      if (result && 'rowsAffected' in result) {
        result.affectedRows = result.rowsAffected;
        delete result.rowsAffected;
      }
      callback(null, result);
    } else { // error
      var err;
      if (result && result.message) {
        err = new Error('SQLite Error: ' + result.message);
      } else {
        err = new Error('SQLite Error: unknown error');
      }
      if (result && result.code != null) err.code = result.code;
      callback(err);
    }
  };
  exec(cb, null, 'SQLitePlugin', 'backgroundExecuteSqlBatch', [{
    dbargs: { dbname: that.name },
    executes: [query]
  }]);
};

SQLite.prototype.close = function(callback) {
  var that = this;
  var success = function() {
    callback();
  };
  var error = function() {
    callback(new Error('SQLite Error: cannot close database \'' + that.name + '\''));
  };
  exec(success, error, 'SQLitePlugin', 'close', [{ path: that.name }]);
};

SQLite.deleteDatabase = function(name, callback) {
  var options = {
    path: name,
    dblocation: 'nosync' // TODO: add alternative locations 'docs' and 'libs'
  };
  var success = function() {
    callback();
  };
  var error = function() {
    callback(new Error('SQLite Error: cannot delete database \'' + name + '\''));
  };
  exec(success, error, 'SQLitePlugin', 'delete', [options]);
};

module.exports = SQLite;
