const db = require("../config/db");

// Add Address
const addAddress = (req, res) => {

    const user_id = req.user.id;

const {
    full_name,
        phone,
        address_line,
        city,
        state,
        pincode
    } = req.body;

    const sql = `
        INSERT INTO addresses
        (user_id, full_name, phone, address_line, city, state, pincode)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [user_id, full_name, phone, address_line, city, state, pincode],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Address added successfully"
            });
        }
    );
};

// View Addresses
const getAddresses = (req, res) => {

    const user_id = req.user.id;

const sql = "SELECT * FROM addresses WHERE user_id=?";

    db.query(sql, [user_id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(result);
    });
};

// Update Address
const updateAddress = (req, res) => {

    const user_id = req.user.id;
    const { id } = req.params;

    const {
        full_name,
        phone,
        address_line,
        city,
        state,
        pincode
    } = req.body;

    const sql = `
        UPDATE addresses
        SET full_name = ?,
            phone = ?,
            address_line = ?,
            city = ?,
            state = ?,
            pincode = ?
        WHERE id = ? AND user_id = ?
    `;

    db.query(
        sql,
        [full_name, phone, address_line, city, state, pincode, id, user_id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(200).json({
                message: "Address updated successfully"
            });
        }
    );
};

// Delete Address
const deleteAddress = (req, res) => {

    const user_id = req.user.id;
    const { id } = req.params;

    const sql = "DELETE FROM addresses WHERE id = ? AND user_id = ?";

    db.query(sql, [id, user_id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json({
            message: "Address deleted successfully"
        });
    });
};

module.exports = {
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress
};