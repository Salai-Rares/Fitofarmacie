const express = require('express');
const router = express.Router();
const storage = require('../helpers/storage');

//controllers router 
const ctrlUser = require('../controllers/user.controller');
const ctrlProduct = require('../controllers/product.controller');
const ctrlCart= require('../controllers/cart.controller')
const ctrlOrder= require('../controllers/order.controller')

const jwtHelper = require('../config/jwtHelper');

router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.post('/addproduct',storage,ctrlProduct.addProduct);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);
router.get('/getproducts',ctrlProduct.getProducts);
router.get('/getproducts/:id',ctrlProduct.getProductById);
router.put('/getproducts/:id',storage,ctrlProduct.updateProductById);
router.delete('/getproducts/:id',ctrlProduct.deleteProductById);
router.post('/cartadd',ctrlCart.addItemToCart);
router.post('/cartremove',ctrlCart.removeItemToCart);
router.get('/getcart',ctrlCart.getCart);
router.delete('/deletecart',ctrlCart.emptyCart);
router.post('/checkout',ctrlCart.checkOut);
router.get('/orders',ctrlOrder.getProducts);

module.exports = router;