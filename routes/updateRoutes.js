const express = require("express");
const putRouter = express.Router();
const Authentication = require("../middlewares/auth")
const prodCateController = require("../controllers/prodCategory")


putRouter.put("/prod/cate/status/:id", prodCateController.updateStatusSingleById);
putRouter.post("/multiple/prod/cate/active", prodCateController.updateMultipleActiveById)

module.exports = putRouter;