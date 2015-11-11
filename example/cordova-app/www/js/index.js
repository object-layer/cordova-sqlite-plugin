var log = window.log = function(message) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(message));
    document.body.appendChild(div);
};

log('SQLite Example');

window.addEventListener('error', function(err) {
  log(err.message);
}, false);

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  log('1');
  connect();
}

var connection;

function connect() {
  console.log('1');
  var sqlite = window.cordova.require('cordova-sqlite-plugin');
  console.log('2');
  connection = sqlite.createConnection('example');
  connection.connect(function(err) {
    if (err) throw err;
    run();
  });
}

function run() {
  log(connection);
}
