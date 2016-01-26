var mnsScraper = require('./scrapers/mns');

var Scraper = {

  scrapeOptions: {},

  search: function(res, product, src, retailer) {

    Scraper.scrapeOptions.product = product;
    Scraper.scrapeOptions.src = src;
    Scraper.scrapeOptions.res = res;

    if (retailer === 'mns') {
      return mnsScraper.search(Scraper.scrapeOptions);
    }

  }

};

module.exports = {
  search: Scraper.search
};
