import Express from "express";
import Product from "../models/Product.js";
import { verifyToken, verifyToken_Authorization, verifyToken_Admin, } from "./vToken.js";

const route = Express.Router();

//GET PRODUCT
route.get("/find/:id", async (req, res) => 
{
  try 
  {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } 
  catch (err) 
  {
    res.status(500).json(err);
  }
});

//CREATE
route.post("/", verifyToken_Admin, async (req, res) => 
{
  const newProduct = new Product(req.body);

  try 
  {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } 
  catch (err) 
  {
    res.status(500).json(err);
  }
});

export default route;
