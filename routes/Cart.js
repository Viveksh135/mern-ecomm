const express=require('express');
const { addToCart, fetchCartByUSer, deleteFromCart, updateCart } = require('../controller/Cart');
const router = express.Router();
// /products is already added in base path
router.post('/',addToCart).get('/',fetchCartByUSer).delete('/:id',deleteFromCart).patch('/:id',updateCart);

exports.router=router;