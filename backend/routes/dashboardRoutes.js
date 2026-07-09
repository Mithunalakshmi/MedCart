const express=require("express");

const router=express.Router();

const verifyToken=require("../middleware/authMiddleware");

const{

getRevenueGraph,
getSalesGraph

}=require("../controllers/dashboardController");

router.get("/revenue",verifyToken,getRevenueGraph);

router.get("/sales",verifyToken,getSalesGraph);

module.exports=router;