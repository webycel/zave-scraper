var express = require('express');

var app = express();

var scraper = require('./scraper');

app.get('/product', function (req, res) {

  var query = req.query,
      product = query.product,
      src = query.src,
      retailer = query.retailer;

  res.set({ 'content-type': 'application/json; charset=utf-8' })

  scraper.search(res, product, src, retailer);

  //  console.log(output);

  //  res.end( output );
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

})
