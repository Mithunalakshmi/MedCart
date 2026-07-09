const express = require("express");

const router = express.Router();

const {

    getAnalytics,
    getAllUsers,
    getAllOrders,
    getTotalSales,
    getLowStockProducts,
    getOutOfStockProducts,
    getTopSellingProducts

} = require("../controllers/adminController");

router.get("/analytics", getAnalytics);

router.get("/users", getAllUsers);

router.get("/orders", getAllOrders);

router.get("/sales", getTotalSales);

router.get("/low-stock", getLowStockProducts);

router.get("/out-of-stock", getOutOfStockProducts);

router.get("/top-selling", getTopSellingProducts);

module.exports = router;