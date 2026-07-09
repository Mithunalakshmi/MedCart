const express = require("express");
const router = express.Router();

const {
    addToWishlist,
    getWishlistItems,
    removeWishlistItem
} = require("../controllers/wishlistController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/add", verifyToken, addToWishlist);
router.get("/", verifyToken, getWishlistItems);
router.delete("/remove/:id", verifyToken, removeWishlistItem);

module.exports = router;