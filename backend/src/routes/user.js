import Express from "express"
import User from "../models/User.js"
import { verifyToken, verifyToken_Authorization, verifyToken_Admin,} from "./vToken.js";
const route = Express.Router();

//UPDATE
route.put("/:id", verifyToken_Authorization, async (req, res) => 
{
  if (req.body.password) 
  {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try 
  {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } 
  catch (err) 
  {
    res.status(500).json(err);
  }
});
export default route;
