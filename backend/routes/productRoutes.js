const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
    addProduct,
    getProducts,
    searchProducts,
    filterProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

router.post("/add", verifyToken, addProduct);
router.get("/", verifyToken, getProducts);
router.get("/search", verifyToken, searchProducts);
router.get("/filter", verifyToken, filterProducts);
router.get("/:id", verifyToken, getProductById);
router.put("/update/:id", verifyToken, updateProduct);
router.delete("/delete/:id", verifyToken, deleteProduct);

module.exports = router;