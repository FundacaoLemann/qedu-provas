// server.js
var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('./mock/db.json');
var middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
// In this example, returned resources will be wrapped in a body property
router.render = function (req, res) {
  res.jsonp({
    data: res.locals.data
  })
};

server.listen(3000, function () {
  console.log('QEdu Provas Fake API running on: http://localhost:3000');
});
