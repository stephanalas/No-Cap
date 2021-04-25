const Sequelize = require('sequelize');
const { db } = require('../index');

const Cart=db.define('cart')

module.exports=Cart