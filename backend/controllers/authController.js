const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// REGISTER
const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    const checkSql = "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length > 0) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const insertSql =
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        db.query(insertSql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "User registered successfully"
            });
        });
    });
};
const loginUser = (req, res) => {

    console.log("===== LOGIN REQUEST =====");
console.log(req.body);

    const { email, password } = req.body;
console.log("Searching:", email);
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, result) => {

        console.log("DB Query Executed");

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        console.log("Users Found:", result.length);

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        console.log("Stored Hash:", user.password);
console.log("Stored Hash:", user.password);
console.log("Entered Password:", password);
        const isMatch = bcrypt.compareSync(password, user.password);
console.log("Password Match:", isMatch);
    

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    });

};

// IMPORTANT EXPORT (THIS IS THE FIX)
module.exports = {
    registerUser,
    loginUser
};