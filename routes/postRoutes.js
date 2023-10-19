const express = require("express");
const postRouter = express.Router();
const Authentication = require("../middlewares/auth")
const adminController = require("../controllers/admin")
const prodCateController = require("../controllers/prodCategory")

postRouter.post("/login/user", adminController.loginAdmin);
postRouter.post("/prod/cat", prodCateController.add_Update_Prodcate);


module.exports = postRouter;