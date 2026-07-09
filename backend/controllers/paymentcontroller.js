const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay Order
const createOrder = async (req, res) => {

    try {

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: "receipt_" + Date.now()
        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Unable to create Razorpay order"
        });

    }

};

// Verify Payment
const verifyPayment = async (req, res) => {
 console.log("✅ Verify Payment API Called");
    try {

        const {

            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature

        } = req.body;

        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {

            return res.json({
                success: true,
                message: "Payment Verified"
            });

        }

        res.status(400).json({
            success: false,
            message: "Payment Verification Failed"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

module.exports = {

    createOrder,
    verifyPayment

};