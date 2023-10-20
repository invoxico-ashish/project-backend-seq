const express = require("express");
const postRouter = express.Router();
const Authentication = require("../middlewares/auth")
const adminController = require("../controllers/admin")
const prodCateController = require("../controllers/prodCategory")
const { upload } = require("../helpers/imgHelper")


postRouter.post("/login/user", adminController.loginAdmin);
postRouter.post("/prod/cat", prodCateController.add_Update_Prodcate);
// postRouter.post("/test", upload.single('uploaded_file'), prodCateController.test);

module.exports = postRouter;