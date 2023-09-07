let produtos = require('../bancodedados/produtos');
let {getStateFromZipcode} = require('utils-playground')


const listagemProdutos = (req,res) =>{
    return res.json({produtos})
}

const produtoId = (req,res) =>{
        const {idProduto} = req.params;

        const produto = produtos.find((produto)=>{
           return produto.id === parseInt(idProduto)
        })


        return res.json({produto})
}


const calculoFrete = async (req, res) => {
    const { idProduto, cep } = req.params;

    try{

    let produto = produtos.find((produto) => {
        return produto.id === parseInt(idProduto);
    });

    if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const estadoCep = await getStateFromZipcode(cep);

    

    let porcentagemPadrao = 12 / 100;

    if (['BA', 'SE', 'AL', 'PE', 'PB'].includes(estadoCep)) {
        porcentagemPadrao = 10 / 100;
    } else if (['RJ', 'SP'].includes(estadoCep)) {
        porcentagemPadrao = 15 / 100;
    }

    const valorFrete = produto.valor * porcentagemPadrao;

    produto = {
        ...produto,
        estado: estadoCep,
        frete: valorFrete
    };

    return res.json({ produto });

} catch(error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
}

};



module.exports = {
    listagemProdutos,
    produtoId,
    calculoFrete
}