const db = require("../config/db");

// Add Review
const addReview = (req, res) => {

    const user_id = req.user.id;

const {
    product_id,
    rating,
    comment
} = req.body;

    const sql = `
        INSERT INTO reviews
        (user_id, product_id, rating, comment)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [user_id, product_id, rating, comment],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Review added successfully"
            });

        }
    );
};

// Get Reviews By Product
const getReviewsByProduct = (req, res) => {

    const { productId } = req.params;

    const sql =
        "SELECT * FROM reviews WHERE product_id = ?";

    db.query(sql, [productId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(result);

    });

};
// Get Average Rating
const getAverageRating = (req, res) => {

    const { productId } = req.params;

    const sql = `
        SELECT
            product_id,
            ROUND(AVG(rating), 1) AS average_rating
        FROM reviews
        WHERE product_id = ?
        GROUP BY product_id
    `;

    db.query(sql, [productId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(result[0]);

    });

};

module.exports = {
    addReview,
    getReviewsByProduct,
    getAverageRating
};