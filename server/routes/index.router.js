const express = require('express');
const router = express.Router();
const storage = require('../helpers/storage');

//controllers router 
const ctrlUser = require('../controllers/user.controller');
const ctrlProduct = require('../controllers/product.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.post('/addproduct',storage,ctrlProduct.addProduct);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);
router.get('/getproducts',ctrlProduct.getProducts);
router.get('/getproducts/:id',ctrlProduct.getProductById);
router.put('/getproducts/:id',ctrlProduct.updateProductById);
router.delete('/getproducts/:id',ctrlProduct.deleteProductById);
module.exports = router;