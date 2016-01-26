var express = require('express');
var scraper = require('./scraper');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/product', function (req, res) {

  var query = req.query,
      product = query.product,
      src = query.src,
      retailer = query.retailer;

  res.set({ 'content-type': 'application/json; charset=utf-8' })

  scraper.search(res, product, src, retailer);
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

})
