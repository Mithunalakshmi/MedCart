const db = require("../config/db");

// Dashboard Analytics
const getAnalytics = (req, res) => {

    const analytics = {};

    db.query(
        "SELECT IFNULL(SUM(total_price),0) AS totalRevenue, COUNT(*) AS totalOrders FROM orders",
        (err, orders) => {

            if (err) return res.status(500).json(err);

            analytics.totalRevenue = orders[0].totalRevenue;
            analytics.totalOrders = orders[0].totalOrders;

            db.query(
                "SELECT COUNT(*) AS totalProducts FROM products",
                (err, products) => {

                    if (err) return res.status(500).json(err);

                    analytics.totalProducts = products[0].totalProducts;

                    db.query(
                        "SELECT COUNT(*) AS totalUsers FROM users",
                        (err, users) => {

                            if (err) return res.status(500).json(err);

                            analytics.totalUsers = users[0].totalUsers;

                            res.json(analytics);

                        }
                    );

                }
            );

        }
    );

};

// Get All Users
const getAllUsers = (req, res) => {

    db.query(
        "SELECT id,name,email,role FROM users",
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);

        }
    );

};

// Get All Orders
const getAllOrders = (req, res) => {

    db.query(
        "SELECT * FROM orders",
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);

        }
    );

};

// Get Total Sales
const getTotalSales = (req, res) => {

    db.query(
        "SELECT IFNULL(SUM(total_price),0) AS total_sales FROM orders",
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result[0]);

        }
    );

};

// Low Stock
const getLowStockProducts = (req, res) => {

    db.query(
        "SELECT * FROM products WHERE stock < 10",
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);

        }
    );

};

// Out of Stock
const getOutOfStockProducts = (req, res) => {

    db.query(
        "SELECT * FROM products WHERE stock=0",
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);

        }
    );

};

// Top Selling Products
const getTopSellingProducts = (req, res) => {

    const sql = `
    SELECT
        products.name,
        SUM(order_items.quantity) AS total_sold
    FROM order_items
    JOIN products
    ON order_items.product_id = products.id
    GROUP BY products.name
    ORDER BY total_sold DESC
    LIMIT 5
    `;

    db.query(sql, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);

    });

};

module.exports = {

    getAnalytics,
    getAllUsers,
    getAllOrders,
    getTotalSales,
    getLowStockProducts,
    getOutOfStockProducts,
    getTopSellingProducts

};