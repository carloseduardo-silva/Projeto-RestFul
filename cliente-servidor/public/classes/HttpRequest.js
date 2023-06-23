class HttpRequest {


    static get(url, params = {}){

        return HttpRequest.request('GET', url, params);
     

    }
    static post(url, params = {}){

        return HttpRequest.request('POST', url, params);
     

    }
    static delete(url, params = {}){

        return HttpRequest.request('DELETE', url, params);
     

    }
    static put(url, params = {}){

        return HttpRequest.request('PUT', url, params);
     

    }

    // função estatica de solicitação COM AJAX, a qual recebe o metodo e a rota no 3000, permitindo a alteração(get,post,del,put) comandada pela 4001(api restful) e sofrida pelo bancodeDados
    static request(method, url, params = {}){

        return new Promise((resolve, reject) => {

            let ajax = new XMLHttpRequest();

            ajax.open(method.toUpperCase(), url);
    
            ajax.onload = () => {
    
                let obj = {}
    
                try {
                   obj = JSON.parse(ajax.responseText)
                }
    
                catch(e){
                    reject(e)
                    console.error(e)
                }

                resolve(obj)
               }

            ajax.setRequestHeader("Content-Type", "application/json")
            ajax.send(JSON.stringify(params))




        })

      


    }

}