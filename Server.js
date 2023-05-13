const express = require('express');
const app = express();
const port=5000;
const mongoose = require("mongoose")

async function connectDb()
{
    try{
      await mongoose.connect("mongodb+srv://tauseefakbar2:Cl%40ss%21c123@cluster0.hyzcdxm.mongodb.net/",{
           useNewUrlParser: true
      });
        console.log("Database connected successfully")
    } catch(error){
        console.log(error);
    }
}

connectDb()

const ProductSchema = new mongoose.Schema({
    ProductName:String,
    ProductType:String,
    Price:Number
})

const Product = mongoose.model('Products', ProductSchema)

app.post('/create', async(req,res)=>{
    const {ProductName,ProductType,Price} = req.body
    const product = new Product({
        ProductName,ProductType,Price
    })
    await product.save()
    res.status(200).json(product)
})

app.get('/getProduct', async(req,res)=>{
     const product = await Product.find()
     res.status(200).json(product)
})

app.listen(port,() => {
   console.log('Application Listen on Port')
})

app.put('/update/:id',async(req,res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id,{ProductName,ProductType,Price},{new:true})
    res.json(product)
})

app.delete('/delete/:id',async(req,res)=>{
    const product = await Product.findByIdAndDelete(req.params.id,{ProductName,ProductType,Price},{new:true})
    res.json(product)
})
