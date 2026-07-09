import { Link } from "react-router-dom";
import "../styles/PaymentSuccess.css";

function PaymentSuccess() {

    const orderId =
        "MC" + Math.floor(Math.random() * 100000);

    return (

        <div className="payment-success">

            <div className="success-card">

                <h1>✅ Payment Successful</h1>

                <h2>{orderId}</h2>

                <p>

                    Thank you for shopping with MedCart.

                </p>

                <div className="success-buttons">

                    <Link to="/products">

                        <button>

                            Continue Shopping

                        </button>

                    </Link>

                    <Link to="/orders">

                        <button>

                            View Orders

                        </button>

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default PaymentSuccess;