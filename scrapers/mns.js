var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');

var MnsScraper = {

  productUrl: null,
  options: null,

  search: function(options) {

    MnsScraper.options = options;

    if (MnsScraper.options.src === 'URL') {

      MnsScraper.productUrl = MnsScraper.options.product;

      request({
        uri: MnsScraper.options.product
      }, MnsScraper.scrapeMNS);

    }

  },

  scrapeMNS: function(error, response, body) {
    var $ = cheerio.load(body),
        js = '',
        itemStock = '',
        productDetails = {};

    productDetails["name"] = $('.product-title h1').text().trim();
    productDetails["productCode"] = $('input[name="productCode"]').attr('value');
    productDetails["productID"] = $('.information .code').text().trim();
    productDetails["price"] = $('.pricing .price1 span').text().trim();
    productDetails["colours"] = [];

    // get colours
    $('.swatch-container .swatches li input').each(function(i, swatch) {
      var prod = {
        id: $(swatch).attr('value'),
        name: $(swatch).next().data('swatch-name'),
        image: $(swatch).data('image-set')
      };

      productDetails["colours"].push(prod);
    });

    // get sizes
    js = $('script:contains("itemStockDetailsMap")').text();
    js = js.split("var itemStockDetailsMap_" + productDetails["productCode"] + " = ")[1].split("var")[0].split(";")[0];
    productDetails["sizes"] = JSON.parse(js);

    MnsScraper.options.res.end( JSON.stringify(productDetails) );
  }

};

module.exports = {
  search: MnsScraper.search
};
