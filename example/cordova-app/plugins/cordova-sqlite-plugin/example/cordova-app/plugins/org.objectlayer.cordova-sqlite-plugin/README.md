# CordovaSQLitePlugin

Cordova SQLite plugin.

### Why this module?

To use a SQLite database from a Cordova app, there is the [cordova-sqlite-storage](https://www.npmjs.com/package/cordova-sqlite-storage) plugin. It is a good choice if you like the WebSQL API. In case you don't, there are not many options.

What's wrong with the WebSQL API? It is simply the worst API ever created throughout the history of computing. Jokes aside, there is something fundamentally wrong in my opinion: there is no way to run an asynchronous task in the middle of a transaction.

This is why I created this module, I took all the good part of [cordova-sqlite-storage](https://www.npmjs.com/package/cordova-sqlite-storage) (the native code) and replaced the less good part (the JavaScript code implementing the WebSQL API) by a much simpler low-level API.

You can use this module directly, but I would rather recommend to go with the [AnySQL](https://www.npmjs.com/package/anysql) module which is a slightly higher level API.

## Installation

With Cordova CLI tool:

```
cordova plugin add cordova-sqlite-plugin
```

## Usage

```js
// TODO
```
