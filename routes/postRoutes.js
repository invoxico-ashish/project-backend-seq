const express = require("express");
const postRouter = express.Router();
const Authentication = require("../middlewares/auth")
const adminController = require("../controllers/admin")
const prodCateController = require("../controllers/prodCategory")
const prodTags = require("../controllers/prodTags")
const { upload } = require("../helpers/imgHelper")


postRouter.post("/login/user", adminController.loginAdmin);
postRouter.post("/prod/cat", prodCateController.add_Update_Prodcate);
postRouter.post("/prod/tag", prodTags.addTag)

module.exports = postRouter;