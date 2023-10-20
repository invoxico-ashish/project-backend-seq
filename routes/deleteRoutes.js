const express = require("express");
const deleteRouter = express.Router();
const prodCateController = require("../controllers/prodCategory")



deleteRouter.put("/single/prod/cat/:id", prodCateController.deleteProdCateById)
deleteRouter.post("/delete/multiple/prod/cat", prodCateController.deleteMultipleCateById)


module.exports = deleteRouter;