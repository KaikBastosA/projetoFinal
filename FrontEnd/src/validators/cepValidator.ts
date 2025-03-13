import cep from "../types/cep";

export default async function isValidCEP(cep: string){
    
    var cepRegex = /^\d{8}$/
    if(!cepRegex.test(cep)){
        return false;
    }
    
    try{
        var resp = await fetch(`http://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET'
        })

        const data = await resp.json() as cep;
        console.log(data.bairro)
        if(data.bairro != undefined){
            return true
        }else{
            return false
        }
    
        
    }catch(err){
        console.log(err)
    }
    
}