const express = require('express');
const controller = require('../controller/controller')
const routes = express();





routes.get('/pokemon', controller.listagemPokemons);
routes.get('/pokemon/:id', controller.detalhePokemon);






module.exports = routes













