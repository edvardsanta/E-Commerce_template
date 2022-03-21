import Express from "express";
import Order from "../models/Order.js";
import {verifyToken, verifyToken_Authorization, verifyToken_Admin, } from "./vToken.js";
const route = Express.Router();

//CREATE

route.post("/", verifyToken, async (req, res) => 
{
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE
route.delete("/:id", verifyToken_Admin, async (req, res) => 
{
  try 
  {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
route.get("/find/:userId", verifyToken_Authorization, async (req, res) => 
{
  try 
  {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
})
export default route;
