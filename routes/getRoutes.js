const router = require("express").Router();
const prodCateController = require("../controllers/prodCategory")


router.get("/prod/cat", prodCateController.getallProdCate);
router.get("/prod/cat/:id", prodCateController.getSingleProdCateById);

module.exports = router;