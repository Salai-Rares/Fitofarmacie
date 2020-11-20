const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports.addProduct=(req,res,next) => {
    console.log('inside addProduct');
    var product = new Product();
    product.name=req.body.name;
    product.image=req.body.image;
    product.quantity=req.body.quantity;
    product.description=req.body.description;
    product.price=req.body.price;
    product.save((err,doc) => {
        if(!err)
            res.send(doc);
        else
            {
                if(err.code === 11000)
                res.status(422).send(['Duplicate product name']);
                else 
                return next(err);
            }
    });
};