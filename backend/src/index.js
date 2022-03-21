import Express from "express";
import mongoose from "mongoose";
import auth from "./routes/authUser.js";
import user from "./routes/user.js";
import product from "./routes/product.js";
import order from "./routes/order.js";
import cart from "./routes/cart.js";
import cors from "cors";
const app = new Express();
const mdb = process.env.mdbURL;

console.log(mdb);

mongoose.connect(mdb,
{
     useNewUrlParser:true,
})
.then(() =>
{
  console.log("Mongodb is connected");
})
.catch((err) =>
{
  console.error(`An error happened, look ${err}`);
});

app.use(cors());
app.use(Express.json());
app.use("/api/users", user);
app.use("/api/auth", auth);
app.use("/api/products",product);
app.use("/api/orders", order);
app.use("/api/carts", cart);

app.listen(8000, () =>
{
  console.log("server is running");	
});
