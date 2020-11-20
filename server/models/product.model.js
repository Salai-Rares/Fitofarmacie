const mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:'Name field can\'t be empty',
        unique:true
    },
    image: {
        type:String
    },
    quantity: {
        type : Number,
        required:'Quantity field can\'t be empty',
        min:[0,"Minimum value of quantity must be 0"]
    },
    description: {
        type :String,
        required:'Description field can\'t be empty'
    },
    price:{
        type:Number,
        required:'Price field can\'t be empty',
        min:[0,'Minimum value of price must be 0']
    }
    
});


mongoose.model('Product',productSchema);
