import {Product} from "../models/productModel.js"

// export const getAllProduct = (req,res)=>{
//   res.send("get all products")
// };

export const getAllProduct = async(req,res)=>{
  console.log(req.query);
  const{featured,rating,company,name,sort,fields}=req.query;
  const myQuery={};

  if(featured){
    myQuery.featured=featured==='true' //?true:false; //=== data type bhi same hone chahiye  //featured property hai to update kardo, nahi hai to add kardo
  }
  if(company){
    myQuery.company={$regex:company,$options:"i"};
  }
  if(rating){
    myQuery.rating=Number(rating);
  }
  if(name){
    myQuery.name={$regex:name,$options:'i'}
  }

  let result= Product.find(myQuery)

  if(sort){
    let sortByfields=sort.split(",");
    console.log(sortByfields);
    sortByfields=sortByfields.map((field)=> trim(field));
    console.log(sortByfields);
    sortByfields=sortByfields.join(" ")
    result=result.sort(sortByfields);



    //const fields=sort.split(',').join(' ');
    //result = result.sort(fields)
  }
  else{
    result=result.sort("createdAt");
  }

  const products= await result;


  console.log("myQuery:",myQuery)
  //const products=await Product.find(myQuery); //(req.query) tha pehle
  res.status(200).json({nbHits:products.length,products});
};


// export const getAllProductTest = (req,res)=>{
//   res.send("get all products test")
// };

export const getAllProductTest = async(req,res)=>{
  //const products=await Product.find({features:true});
  // const products=await Product.find({name:{$regex:"vase",$options:"i"},
  // });

  // const products=await Product.find().sort("name -price");
  // const products=await Product.find().select("name price rating");
  const products=await Product.find().select("name price rating");
  res.status(200).json({nbHits:products.length,products})
};

