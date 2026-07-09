const db = require("../config/db");

// Add to Wishlist
const addToWishlist = (req, res) => {

    const user_id = req.user.id;
    const { product_id } = req.body;

    const sql =
        "INSERT INTO wishlist(user_id,product_id) VALUES(?,?)";

    db.query(sql, [user_id, product_id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Product added to wishlist"
        });

    });

};

// View Wishlist
const getWishlistItems = (req, res) => {

    const user_id = req.user.id;

    const sql = `

    SELECT

        wishlist.id,

        products.id AS product_id,

        products.name,

        products.description,

        products.price,

        products.stock

    FROM wishlist

    JOIN products

    ON wishlist.product_id = products.id

    WHERE wishlist.user_id = ?

    `;

    db.query(sql, [user_id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.status(200).json(result);

    });

};

// Remove Wishlist Item
const removeWishlistItem = (req, res) => {

    const user_id = req.user.id;

    const { id } = req.params;

    const sql =
        "DELETE FROM wishlist WHERE id=? AND user_id=?";

    db.query(sql, [id, user_id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.status(200).json({

            message: "Wishlist item removed successfully"

        });

    });

};

module.exports = {

    addToWishlist,

    getWishlistItems,

    removeWishlistItem

};