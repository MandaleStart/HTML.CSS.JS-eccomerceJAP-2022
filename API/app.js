const express = require('express');
const fs = require('fs');

const app = express();
let cors = require('cors');
app.use(cors());

app.listen(3000, ()=>{console.log('Servidor montado en el puerto 3000')});

//raiz
app.get('/', function(req,res){
    res.send(
    `Rutas posibles:
    todas las categorias: /cats/cat
    productos por ID de categoria: /categories/:id
    productos por ID  : /products/:prodid
    comentarios de productos por ID  : /products_comments/:prodid
    carrito por Usuario: /user/:user
    mensajes publicar venta: /publish_msg
    mensajes compras: /buy_msg`)
})

//todas las categorias juntas
app.get('/cats/cat', function(req,res){
    res.sendFile('./emercado-api/cats/cat.json', {root: __dirname})
})

//pack de productos por ID decategoria
app.get('/categories/:id', function(req,res){
    CatID = req.params.id
    res.sendFile(`./emercado-api/cats_products/${CatID}.json`, {root: __dirname})
})

//productos por ID 
app.get('/products/:prodid', function(req,res){
    id = req.params.prodid
    res.sendFile(`./emercado-api/products/${id}.json`, {root: __dirname})
})

//comentarios de productos por ID 
app.get('/products_comments/:prodid', function(req,res){
    id = req.params.prodid
    res.sendFile(`./emercado-api/products_comments/${id}.json`, {root: __dirname})
})

//carrito por Usuario
app.get('/user/:user', function(req,res){
    user = req.params.user
    res.sendFile(`./emercado-api/user_cart/${user}.json`, {root: __dirname})
})

//msg buy
app.get('/buy_msg', function(req,res){
    res.sendFile('./emercado-api/cart/buy.json', {root: __dirname})
})

//msg publicar venta
app.get('/publish_msg', function(req,res){
    res.sendFile('./emercado-api/sell/publish.json', {root: __dirname})
})

//desafiate
