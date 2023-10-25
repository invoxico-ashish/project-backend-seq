const express = require("express");
const postRouter = express.Router();
const Authentication = require("../middlewares/auth")
const adminController = require("../controllers/admin")
const prodCateController = require("../controllers/prodCategory")
const prodTags = require("../controllers/prodTags")
const { upload } = require("../helpers/imgHelper")


postRouter.post("/login/user", adminController.loginAdmin);
postRouter.post("/prod/cat", prodCateController.add_Update_Prodcate);
postRouter.post("/filter/prod/cat/name", prodCateController.filterCategoryByName);
postRouter.post("/filter/prod/cat/status", prodCateController.filterCategoryByStatus);
postRouter.post("/prod/tag", prodTags.addTag)
postRouter.post("/find/tag/name", prodTags.filterTagByName)
postRouter.post("/filter/tag/status", prodTags.filterTagByStatus)

module.exports = postRouter;