var Order = require('../models/order');
module.exports.getProducts=async (req,res)=>{
    const orders = await Order.find();
    res.status(200).json(orders);
 }