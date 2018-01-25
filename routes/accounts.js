var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://localhost:5432/jobrieniii');

var Account = sequelize.define('account', {
  accountDescription: {
    type: Sequelize.STRING,
    field: 'account_description'
  },
  currencySymbol: {
    type: Sequelize.STRING,
    field: 'currency_symbol'
  },
  accountType: {
    type: Sequelize.STRING,
    field: 'account_type'
  }
}, {
  freezeTableName: true,
  timestamps: true
});

router.post('/init', function(req, res, next) {
  Account.sync({force: true}).then(function () {
    res.send('table created');
  });
});

router.post('/', function(req, res, next) {
  Account.create(req.body).then(function(response) {
    res.status(200).json(response);
  });
});

router.get('/', function(req, res, next) {
  Account.findAll({}).then(function(response) {
    res.status(200).json(response);
  });
});

router.get('/:id', function(req, res, next) {
  Account.findOne({where: {id: req.params.id}}).then(function(response) {
    res.status(200).json(response);
  });
});

router.delete('/:id', function(req, res, next) {
  Account.findOne({where: {id: req.params.id}}).then(function(instance) {
    instance.destroy().then(function() {
      res.status(204).send();
    });
  });
});

router.put('/:id', function(req, res, next) {
  Account.update({where: {id: req.params.id}}).then(function(response) {
    Account.update(req.body).then(function(response) {
      res.status(200).json(response);
    });
  });
});

module.exports = router;
