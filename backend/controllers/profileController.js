const bcrypt = require("bcryptjs");
const db = require("../config/db");
const getProfile = (req, res) => {

    const id = req.user.id;

    const sql =
        "SELECT id, name, email, role FROM users WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(result[0]);

    });

};
// Update Profile
const updateProfile = (req, res) => {

    const id = req.user.id;
    const { name, email } = req.body;

    const sql =
        "UPDATE users SET name = ?, email = ? WHERE id = ?";

    db.query(sql, [name, email, id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json({
            message: "Profile updated successfully"
        });

    });

};
const changePassword = (req, res) => {

    const id = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const sql = "SELECT * FROM users WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        const isMatch = bcrypt.compareSync(
            oldPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Old password is incorrect"
            });
        }

        const hashedPassword =
            bcrypt.hashSync(newPassword, 10);

        const updateSql =
            "UPDATE users SET password = ? WHERE id = ?";

        db.query(
            updateSql,
            [hashedPassword, id],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.status(200).json({
                    message: "Password changed successfully"
                });

            }
        );

    });

};

module.exports = {
    getProfile,
    updateProfile,
    changePassword
};