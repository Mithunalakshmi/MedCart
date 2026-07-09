const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    addToCart,
    getCartItems,
    updateCartQuantity,
    removeCartItem
} = require("../controllers/cartController");

router.post("/add", verifyToken, addToCart);
router.get("/", verifyToken, getCartItems);
router.put("/update/:id", verifyToken, updateCartQuantity);
router.delete("/remove/:id", verifyToken, removeCartItem);

module.exports = router;