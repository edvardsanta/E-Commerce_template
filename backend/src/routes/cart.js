import Express from "express";
import Cart from "../models/Cart.js";
import { verifyToken, verifyToken_Authorization, verifyToken_Admin,} from "./vToken.js";

const route = Express.Router();

//GET USER CART
route.get("/find/:userId", verifyToken_Authorization, async (req, res) => 
{
  try 
  {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } 
  catch (err) 
  {
    res.status(500).json(err);
  }
});

//CREATE
route.post("/", verifyToken, async (req, res) => 
{
  const newCart = new Cart(req.body);
  try 
  {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } 
  catch (err) 
  {
    res.status(500).json(err);
  }
});

//DELETE
route.delete("/:id", verifyToken_Authorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
export default route;
