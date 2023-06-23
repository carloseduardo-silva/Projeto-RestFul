class User {

    constructor(name, gender, birth, country, email, password, photo, admin){

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }

    get id(){
        return this._id;
    }

    get register(){
        return this._register;
    }

    get name(){
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get birth() {
        return this._birth;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get photo() {
        return this._photo;
    }

    get password() {
        return this._password;
    }

    get admin() {
        return this._admin;
    }

    set photo(value){
        this._photo = value;
    }
    //transforma json em objeto
    loadFromJSON(json){

        for (let name in json){
            
            switch(name){

                case '_register':
                    this[name] = new Date(json[name]);
                break;

                default:
                if(name.substring(0, 1) === "_")  this[name] = json[name];

            }
            

        }

    }

   // acessando array por meio do loch4001 que puxou do neDB, utilizando solicitação ajax.
    static getUsersStorage() {

        return Fetch.get("/users")

    }


    //transforma  objeto em json
    toJSON(){

        let json = {};

        Object.keys(this).forEach(key =>{

           if(this[key] !== undefined) json[key] = this[key];
        })
        return json
    }

    //carregando dados e salvando diretamente no banco de dados.
    save(){
    
    return new Promise((resolve, reject) =>{

        let promisse;

        //caso ja houver id cadastrado
        if (this.id) {
                
            promisse = Fetch.put(`/users/${this.id}`, this.toJSON())
        } 

        //caso nao houver, cadastar 
        else{
    
            promisse = Fetch.post(`/users`, this.toJSON())
    
        }
    
         promisse.then(data => {

                this.loadFromJSON(data);

                resolve(this);

            })
            .catch(e=>{
                reject(e)
            })

    })


}

//solicitaçao do delete para remover usuario do server(remover do DataBase a partir da api restful)
remove(){

   return  Fetch.delete(`/users/${this.id}`)


}



}