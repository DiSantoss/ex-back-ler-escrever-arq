const express = require('express');
const routes = express.Router();
const controller = require('../controller/controller')


routes.get('/enderecos' , controller.enderecos)
routes.get('/enderecos/:cep' , controller.enderecosCep)




module.exports = routes





