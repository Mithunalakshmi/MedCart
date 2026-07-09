const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {

    placeOrder,

    getOrders

} = require("../controllers/orderController");

router.post("/place", verifyToken, placeOrder);

router.get("/", verifyToken, getOrders);

module.exports = router;