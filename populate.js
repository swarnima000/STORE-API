//script to add data in schema ek saath instead of one by one
//routes nahi bana rahe iss baar
import dbConnect from "./dbConnect.js";
import 'dotenv/config'
import { Product } from "./models/productModel.js";
import productData from './products.json' assert {type:'json'}; //json export nahi karna padta, kyuki data file hai

;
(async()=>{
  try {
    await dbConnect(process.env.MONGO_URL)
    console.log('database connection established...');
    await Product.deleteMany() //agar populate.js multiple times chala de, populate chalane pe purana data delete hoga and new aega. duplicates nahi bante
    console.log('all records deleted');
    await Product.create(productData)
    console.log('product data imported...');
    process.exit(0); //normal termination

  } catch (error) {
    console.log(error);
    process.exit(1); //abnormal termination, background process exit karta hai
  }
})();