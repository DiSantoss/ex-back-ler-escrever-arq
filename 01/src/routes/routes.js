const express = require('express');
const controller = require('../controller/controllers');


const routes = express();


routes.get('/produtos' , controller.listagemProdutos)
routes.get('/produtos/:idProduto', controller.produtoId)
routes.get('/produtos/:idProduto/frete/:cep', controller.calculoFrete)


module.exports = routes