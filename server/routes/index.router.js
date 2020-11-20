const express = require('express');
const router = express.Router();
//controllers router
const ctrlUser = require('../controllers/user.controller');
const ctrlProduct = require('../controllers/product.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.post('/addproduct',ctrlProduct.addProduct);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);
module.exports = router;