var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/cryptocompare/pricehistorical', function(req, res, next) {
  var fsym = req.query.fsym;
  var tsyms = req.query.tsyms;
  var ts = req.query.ts;
  var e = req.query.e;

  var lkpUrl = 'https://min-api.cryptocompare.com/data/pricehistorical?fsym=' + fsym;
      lkpUrl = lkpUrl + '&tsyms=' + tsyms;
      lkpUrl = lkpUrl + '&ts=' + ts;
      lkpUrl = lkpUrl + '&e=' + e;
      lkpUrl = lkpUrl + '&extraParams=allminedco';

  request(lkpUrl, function (error, response, body) {
    console.log('REQUEST:');
    console.log(req.query);

    console.log('CRYPTOCOMPARE URL / RESPONSE:');
    console.log(lkpUrl);
    console.log(response.body);

    console.log('-----');
    res.setHeader('Content-Type', 'application/json');
    res.json(JSON.parse(response.body));
  });

});


module.exports = router;
