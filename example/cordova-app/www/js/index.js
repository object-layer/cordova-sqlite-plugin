var log = window.log = function(message) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(message));
  document.body.appendChild(div);
};

window.addEventListener('error', function(err) {
  log(err.message);
}, false);

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  log('SQLite Example');
  var SQLite = window.cordova.require('cordova-sqlite-plugin.SQLite');
  var sqlite = new SQLite('example');
  sqlite.open(function(err) {
    log('Connection opened');
    if (err) throw err;
    sqlite.query('SELECT ? + ? AS solution', [2, 3], function(err, res) {
      if (err) throw err;
      log(JSON.stringify(res));
      // log(res.rows[0].solution);
      sqlite.close(function(err) {
        if (err) throw err;
        log('Connection closed');
        SQLite.deleteDatabase('example', function(err) {
          if (err) throw err;
          log('Database deleted');
        });
      });
    });
  });
}
