import mongoose from "mongoose";

const productSchema= mongoose.Schema({
  name:{
    type:String,
    required:[true,"please enter product name"],
    trim:true,
    maxlength:[20,"name cannot be more than 20 char"],
  },

  price:{
    type: Number,
    required:[true,"please enter product price"]
  },

  company:{
    type:String,
    enum:{
      values:['ikea','nilkamal','pepperfry','durian'],
      message:'{VALUE} not supported as company name'
    }

  },

  rating:{
    type:Number,
    default:4.5

  },

  featured:{
    type:Boolean,
    default:false
  },

  createdAt:{ //kis time pe product added to system
    type:Date,
    default:Date.now(),
  },

});

export const Product=mongoose.model('Product',productSchema) //product is table ka naam, isme add product.json ka data