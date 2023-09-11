const data = require('../data/data');
const {buscarEndereco} = require('utils-playground');
const fs = require('fs/promises')



const enderecos = (req,res)=>{
        

        
        return res.json(data)


}

const enderecosCep = async (req,res)=>{
            const {cep} = req.params; 
    
            
        const enderecosCep = data.find((endereco)=>{
            const cepSemTraco = cep.replace('-', ''); // Remova o traço, se presente
        const enderecoCepSemTraco = endereco.cep.replace('-', ''); // Remova o traço do CEP no banco de dados

        return enderecoCepSemTraco === cepSemTraco;
        })
        

        if(enderecosCep) {
            const json = await fs.readFile('./src/enderecos.json');
            const jsonObjeto = JSON.parse(json);

            jsonObjeto.push(enderecosCep);

            
           

            const jsonStringify = JSON.stringify(jsonObjeto);

            await fs.writeFile('./src/enderecos.json', jsonStringify);

            res.json(jsonObjeto)
        } else {
         
            const jsonLido = await fs.readFile('./src/enderecos.json');
            const jsonObjeto = JSON.parse(jsonLido)

            const enderecoUtils = await buscarEndereco(cep);
            jsonObjeto.push(enderecoUtils)

            const enderecoString = JSON.stringify(jsonObjeto);



            await fs.writeFile('./src/enderecos.json', enderecoString);

            res.json(jsonObjeto);
           
        }

      
        

}


module.exports = {
    enderecos,
    enderecosCep
}