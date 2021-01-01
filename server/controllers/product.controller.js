const mongoose = require('mongoose');
const _ =require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;

const Product = mongoose.model('Product');

module.exports.getProducts=async (req,res)=>{
   const products = await Product.find();
   res.status(200).json({products});
}
/*module.exports.getProductById = (req,res,next)=>{
    Product.findOne({_id:req.params.id},
        (err,product)=> {
            if(!product)
                return res.status(404).json({status:false,message:'User record not found'});
            else 
                return res.status(200).json({status:true,product:_.pick(product,['name','price','description','image','quantity','_id'])});
        })
}
*/
module.exports.getProductById=async( req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
}

    module.exports.updateProductById=async (req,res)=>{
        if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
        if(req.file){
            var pro = {
                name:req.body.name,
                price:req.body.price,
                quantity:req.body.quantity,
                description:req.body.description,
                image:'http://localhost:3000/images/'+req.file.filename
            };
        }
        else{
        var pro = {
            name:req.body.name,
            price:req.body.price,
            quantity:req.body.quantity,
            description:req.body.description,
            
        };
    }
        Product.findByIdAndUpdate(req.params.id, {$set:pro}, {new:true} , (err,doc)=>{
            if(!err) {res.send(doc) ;}
            else {console.log('Error in product update'+ JSON.stringify(err,undefined,2));}
        })
    }

    module.exports.deleteProductById=async (req,res)=>{
        if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Product.findByIdAndDelete(req.params.id,(err,doc)=>{
            if(!err) {res.send(doc);}
            else {console.log('Error in product update'+ JSON.stringify(err,undefined,2));}
        });
    }



module.exports.addProduct=(req,res,next) => {
    console.log('inside addProduct');
    var product = new Product();
    product.name=req.body.name;
    console.log(product.name);
    product.image='http://localhost:3000/images/'+req.file.filename;
    product.quantity=req.body.quantity;
    console.log(product.quantity)
    product.description=req.body.description;
    console.log(product.description);
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