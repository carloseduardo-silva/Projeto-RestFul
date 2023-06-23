var express = require('express');
var router = express.Router();
var restify = require('restify-clients');

//utilização do framework RESTIFY para o consumo de dados do servidor-cliente(localH3000) na API REST (loch4001), o qual esta consultando um banco de dados nativo do JS nedb.
var client = restify.createJsonClient({
  url: 'http://127.0.0.1:4001'
});


//acessando todos os usuarios 
router.get('/', function(req, res, next) {

  client.get('/users', function(err, request, response, obj) {
    if(err) console.log(err);
  
    res.json(obj)
  });


  // 
});
//acessando usuario de determinado id
router.get('/:id', function(req, res, next) {

  client.get(`/users/${req.params.id}`, function(err, request, response, obj) {
    if(err) console.log(err);
  
    res.json(obj)
  });

});
//adicionando user
router.post('/', function(req, res, next) {

  client.post('/users', req.body, function(err, request, response, obj) {
    if(err) console.log(err);
  
    res.json(obj)
  });

});
//editando usuario de determinado id
router.put('/:id', function(req, res, next) {

  client.put(`/users/${req.params.id}`, req.body, function(err, request, response, obj) {
    if(err) console.log(err);
  
    res.json(obj)
  });

});
//excluindo usuario de determinado id
router.delete('/:id', function(req, res, next) {

  client.del(`/users/${req.params.id}`, function(err, request, response, obj) {
    if(err) console.log(err);
  
    res.json(obj)
  });

});


module.exports = router;
