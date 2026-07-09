const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    addReview,
    getReviewsByProduct,
    getAverageRating
} = require("../controllers/reviewController");

router.post("/add", verifyToken, addReview);
router.get("/product/:productId", getReviewsByProduct);
router.get("/rating/:productId", getAverageRating);

module.exports = router;