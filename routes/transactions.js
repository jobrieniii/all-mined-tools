var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://localhost:5432/jobrieniii');

var Transaction = sequelize.define('transaction', {
  type: { // mining_revenue
    type: Sequelize.STRING,
    field: 'type'
  },
  description: {
    type: Sequelize.STRING,
    field: 'description'
  },
  note: {
    type: Sequelize.STRING,
    field: 'note'
  },
  debitAccount: { // debit (increase) asset
    type: Sequelize.INTEGER,
    field: 'debit_account'
  },
  creditAccount: { // credit (increase) revenue
    type: Sequelize.INTEGER,
    field: 'credit_account'
  },
  amount: {
    type: Sequelize.DECIMAL,
    field: 'amount'
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


/*
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
*/
module.exports = router;
