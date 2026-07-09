const db = require("../config/db");

// Add Product
const addProduct = (req, res) => {

    const { name, description, price, stock, image } = req.body;

    const sql =
        "INSERT INTO products (name, description, price, stock, image) VALUES (?, ?, ?, ?, ?)";

    db.query(
        sql,
        [name, description, price, stock, image],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Product added successfully"
            });
        }
    );
};


// Get All Products
const getProducts = (req, res) => {

    const sql = "SELECT * FROM products";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(result);

    });

};
// Search Product
const searchProducts = (req, res) => {

    const { keyword } = req.query;

    const sql =
        "SELECT * FROM products WHERE name LIKE ?";

    db.query(
        sql,
        [`%${keyword}%`],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(200).json(result);
        }
    );
};
// Filter Products by Price
const filterProducts = (req, res) => {

    const { minPrice, maxPrice } = req.query;

    const sql =
        "SELECT * FROM products WHERE price BETWEEN ? AND ?";

    db.query(
        sql,
        [minPrice, maxPrice],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(200).json(result);
        }
    );
};
// Get Product by ID
const getProductById = (req, res) => {

    const id = req.params.id;

    const sql = "SELECT * FROM products WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(result[0]);

    });

};
// Update Product
const updateProduct = (req, res) => {

    const id = req.params.id;

    const {
        name,
        description,
        price,
        stock,
        image
    } = req.body;

    const sql = `
        UPDATE products
        SET name = ?, description = ?, price = ?, stock = ?, image = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [name, description, price, stock, image, id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(200).json({
                message: "Product updated successfully"
            });

        }
    );
};
// Delete Product
const deleteProduct = (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM products WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    });

};
module.exports = {
    addProduct,
    getProducts,
    searchProducts,
    filterProducts,
    getProductById,
    updateProduct,
    deleteProduct
};