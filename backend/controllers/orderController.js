const db = require("../config/db");

const placeOrder = (req, res) => {

    const user_id = req.user.id;

    // Get all items from user's cart
    const cartSql = `
        SELECT
            cart.product_id,
            cart.quantity,
            products.price
        FROM cart
        JOIN products
        ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `;

    db.query(cartSql, [user_id], (err, cartItems) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        if (cartItems.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        // Calculate total
        let total = 0;

        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });

        // Create order
        const orderSql =
            "INSERT INTO orders(user_id,total_price,status) VALUES(?,?,?)";

        db.query(

            orderSql,

            [user_id, total, "Paid"],

            (err, result) => {

                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }

                const orderId = result.insertId;

                // Insert order items
                const values = cartItems.map(item => [

                    orderId,

                    item.product_id,

                    item.quantity,

                    item.price

                ]);

                const itemSql =

                    "INSERT INTO order_items(order_id,product_id,quantity,price) VALUES ?";

                db.query(itemSql, [values], (err) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json(err);

                    }

                    // Clear cart
                    db.query(

                        "DELETE FROM cart WHERE user_id=?",

                        [user_id],

                        (err) => {

                            if (err) {

                                console.log(err);

                                return res.status(500).json(err);

                            }

                            res.json({

                                message: "Order placed successfully"

                            });

                        }

                    );

                });

            }

        );

    });

};

const getOrders = (req, res) => {

    const user_id = req.user.id;

    db.query(

        "SELECT * FROM orders WHERE user_id=?",

        [user_id],

        (err, result) => {

            if (err)

                return res.status(500).json(err);

            res.json(result);

        }

    );

};

module.exports = {

    placeOrder,

    getOrders

};