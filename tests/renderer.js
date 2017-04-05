var proxy = require("../renderer")();

proxy.on("client-action", function(args) {
  var newArgs = Object.assign({
    client: "ok"
  }, args);

  proxy.send("host-action", newArgs);
});
