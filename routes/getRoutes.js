const router = require("express").Router();
const prodCateController = require("../controllers/prodCategory")
const prodTags = require("../controllers/prodTags")


router.get("/prod/cat", prodCateController.getallProdCate);
router.get("/prod/cat/:id", prodCateController.getSingleProdCateById);
router.get("/prod/tag",prodTags.getAllTags)
router.get("/prod/tag/:id",prodTags.getSingleTag)

module.exports = router;