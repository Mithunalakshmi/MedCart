const db = require("../config/db");

const addToCart = (req, res) => {

    const user_id = req.user.id;
    const { product_id, quantity } = req.body;

    const checkSql =
        "SELECT * FROM cart WHERE user_id = ? AND product_id = ?";

    db.query(checkSql, [user_id, product_id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        if (result.length > 0) {

            const updateSql =
                "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?";

            db.query(updateSql, [quantity, user_id, product_id], (err) => {

                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }

                return res.status(200).json({
                    message: "Cart quantity updated successfully"
                });

            });

        } else {

            const insertSql =
                "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";

            db.query(insertSql, [user_id, product_id, quantity], (err) => {

                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }

                return res.status(201).json({
                    message: "Product added to cart successfully"
                });

            });

        }

    });

};

// View Cart
const getCartItems = (req, res) => {

    const user_id = req.user.id;

    const sql = `
        SELECT
            cart.id,
            cart.quantity,
            products.id AS product_id,
            products.name,
            products.description,
            products.price,
            products.stock
        FROM cart
        JOIN products
            ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `;

    db.query(sql, [user_id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.status(200).json(result);

    });

};
// Update Cart Quantity
const updateCartQuantity = (req, res) => {

    const user_id = req.user.id;
    const { id } = req.params;
    const { quantity } = req.body;

    const sql =
        "UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?";

    db.query(sql, [quantity, id, user_id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.status(200).json({
            message: "Cart quantity updated successfully"
        });

    });

};
// Remove Cart Item
const removeCartItem = (req, res) => {

    const user_id = req.user.id;
    const { id } = req.params;

    const sql = "DELETE FROM cart WHERE id = ? AND user_id = ?";

    db.query(sql, [id, user_id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.status(200).json({
            message: "Cart item removed successfully"
        });

    });

};

module.exports = {
    addToCart,
    getCartItems,
    updateCartQuantity,
    removeCartItem
};