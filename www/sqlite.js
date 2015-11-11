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
  }
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
  var success = function(result) {
    if (result && 'rowsAffected' in result) {
      result.affectedRows = result.rowsAffected;
      delete result.rowsAffected;
    }
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
    dbargs: { dbname: that.name },
    ex: query
  }]);
};

SQLite.prototype.close = function(callback) {
  var that = this;
  var success = function() {
    callback();
  };
  var error = function() {
    callback(new Error('SQLite Error: cannot close database \'' + that.name + '\''));
  }
  exec(success, error, 'SQLitePlugin', 'close', [{ path: that.name }]);
};

module.exports = SQLite;
