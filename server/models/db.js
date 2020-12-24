//const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI;
const m_options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify:false
}
mongoose.connect(uri,m_options,function(err){
  if(!err){
    console.log(`MONGODB CONNECTION SUCCEEDED`);}
    else{
    console.log('Error in MongoDB connection : ' + JSON.stringify(err,undefined,2));
         }
})
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   console.log("Uri is : "+uri);
//   //const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   if(!err){
//   console.log(`MONGODB CONNECTION SUCCEEDED`);}
//   //client.close();
//   else{
//       console.log('Error in MongoDB connection : ' + JSON.stringify(err,undefined,2));
//   }
// });


require('./user.model');
require('./product.model');