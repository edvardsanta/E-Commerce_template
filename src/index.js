import Express from "express";
import mongoose from "mongoose";
import auth from "./routes/authUser.js";
import user from "./routes/user.js";
import product from "./routes/product.js";
import order from "./routes/order.js";

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

app.use(user);
app.use(auth);
app.use(product);

app.listen(8000, () =>
{
  console.log("server is running");	
});
