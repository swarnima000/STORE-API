import express from "express"
import 'dotenv/config';
import dbConnect from "./dbConnect.js";
import notFound from "./middleware/notFound.js";
import productRoutes from "./routes/productRoutes.js";
import "express-async-errors";
import errorHandler from "./middleware/errorHandler.js";

const app=express();
const port= process.env.PORT || 5000;
app.use(express.json())

app.get("/",(req,res)=>{
  res.send("<h1>Store API</h1>");
});

app.use("/api/v1/products",productRoutes)
app.use(notFound);
app.use(errorHandler)

;
(async()=>{
  try{
  await dbConnect(process.env.MONGO_URL)
  console.log("database connected...")
  app.listen( port,console.log("Server started...",port));
}catch(error){
  console.log(error);
}})();