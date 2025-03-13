export default async function isValidCEP(cep: string){
    console.log('oiii')
    await fetch(`viacep.com.br/ws/${cep}/json/`, {
        method: 'GET'
    }).then((resp) => {
        if(resp.status == 200){
            console.log(resp)
            return true
        }else{
            return false
        }

    }).catch(() => {
        return false
    })

}