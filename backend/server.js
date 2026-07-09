const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Database connection
const db = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const profileRoutes = require("./routes/profileRoutes");
const addressRoutes = require("./routes/addressRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/dashboard",dashboardRoutes);
// Home Route
app.get("/", (req, res) => {
    res.send("MedCart Backend Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});