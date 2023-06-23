class Fetch {


    static get(url, params = {}){

        return Fetch.request('GET', url, params);
     

    }
    static post(url, params = {}){

        return Fetch.request('POST', url, params);
     

    }
    static delete(url, params = {}){

        return Fetch.request('DELETE', url, params);
     

    }
    static put(url, params = {}){

        return Fetch.request('PUT', url, params);
     

    }
     // função estatica de solicitação COM FETCH, a qual recebe o metodo e a rota no 3000, permitindo a alteração(get,post,del,put) comandada pela 4001(api restful) e sofrida pelo bancodeDados
    static request(method, url, params = {}){

        return new Promise((resolve, reject) => {

            let request;

            switch(method){
                case "GET":
                request = url
                break
                default:
                     request = new Request(url, {
                    method,
                    body: JSON.stringify(params),
                    headers: new Headers({
                       'Content-Type':'application/json'
                   })
               })
            }


            fetch(request).then(response =>{

                response.json().then(json =>{

                    resolve(json)

                }).catch(e =>{
                    reject(e)
                })

            }).catch(e =>{
                reject(e)
            })
        })
    }
}