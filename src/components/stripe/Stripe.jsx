import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import css from "./Stripe.module.css";

const VITE_API_BASE_URL = "https://backend-ecom-p2f3.onrender.com";

function Success({ h1, btnPath, textBtn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get subscription details from URL parameters
    const params = new URLSearchParams(location.search);
    const email = params.get("email");
    const subscriptionId = params.get("subscription_id");
    const plan = params.get("plan");

    // If we have all the required parameters, update the subscription
    if (email && subscriptionId && plan) {
      setIsUpdating(true);

      // Call the backend to update subscription details
      fetch(`${VITE_API_BASE_URL}/api/stripe/update-subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          subscriptionId,
          plan,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Subscription update result:", data);
          setIsUpdating(false);
          if (!data.success) {
            setError(data.message || "Failed to update subscription");
          }
        })
        .catch((err) => {
          console.error("Error updating subscription:", err);
          setIsUpdating(false);
          setError("Failed to update subscription. Please contact support.");
        });
    }
  }, [location]);

  return (
    <div className={css.container}>
      <h1>{h1}</h1>
      {isUpdating && <p>Updating your subscription details...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button className={css.joinBtn} onClick={() => navigate(`${btnPath}`)}>
        {textBtn}
      </button>
    </div>
  );
}

export default Success;
