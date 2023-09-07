const express = require('express');
const {listarPokemons,detalharPokemon} = require('utils-playground');



const listagemPokemons = async (req, res) => {
    try {

    if (typeof listarPokemons === 'function') {
        const pokemons = await listarPokemons();
        return res.json({ pokemons });
    } else {
    
        return res.status(500).json({ error: 'A função listarPokemons não está definida' });
    }
    } catch (error) {
    
    console.error('Erro ao listar pokemons:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };

const detalhePokemon = async (req,res) =>{
    const {id} = req.params;
    const {name} = req.params;
   
    try{
    const pokemon = await detalharPokemon(id || name);

    const pokemonDetalhe = {
        id:pokemon.id,
        name:pokemon.name,
        height:pokemon.height,
        weight:pokemon.weight,
        base_experience:pokemon.base_experience,
        forms:pokemon.forms,
        abilities:pokemon.abilities,
        species:pokemon.species
    }

    return res.json({pokemonDetalhe})
} catch(error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
}
}



module.exports = {
    listagemPokemons,
    detalhePokemon
}