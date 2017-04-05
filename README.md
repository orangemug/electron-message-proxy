# electron-message-proxy
An event proxy for electron where contextIsolation is enabled and nodeIntegration disabled

[![stability-unstable](https://img.shields.io/badge/stability-unstable-yellow.svg)][stability]
[![Build Status](https://circleci.com/gh/orangemug/electron-message-proxy.png?style=shield)][circleci]
[![Dependency Status](https://david-dm.org/orangemug/electron-message-proxy.svg)][dm-prod]
[![Dev Dependency Status](https://david-dm.org/orangemug/electron-message-proxy/dev-status.svg)][dm-dev]

[stability]:   https://github.com/orangemug/stability-badges#unstable
[circleci]:    https://circleci.com/gh/orangemug/electron-message-proxy
[dm-prod]:     https://david-dm.org/orangemug/electron-message-proxy
[dm-dev]:      https://david-dm.org/orangemug/electron-message-proxy#info=devDependencies


It can send message from `host -> preload -> renderer` and back again, via a simple event API.



## Install
To install

```
npm install orangemug/electron-message-proxy
```


## Usage

```js
// main.js
var proxy = require("electron-message-proxy/main")(browserWin);

proxy.on("bar", function(args) {
  console.log("received: foo", args);
});

proxy.send("foo", {
  message: "hello from main"
});
```

The module will proxy message through the preload

```js
// preload.js
require("electron-message-proxy/preload");
```

We're assuming renderer is compiled by webpack / browserify

```js
// renderer.js
var proxy = require("electron-message-proxy/renderer")();

proxy.on("foo", function(args) {
  console.log("received: foo", args);
});

proxy.send("bar", {
  message: "hello from renderer"
});
```

## License
[MIT](LICENSE)

