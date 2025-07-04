import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BACKEND_URL from "../config/globalVar.js";

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
      fetch(`${BACKEND_URL}/api/stripe/update-subscription`, {
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
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>{h1}</h1>
      {isUpdating && (
        <p style={{ marginBottom: "20px" }}>
          Updating your subscription details...
        </p>
      )}
      {error && <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>}
      <button
        onClick={() => navigate(`${btnPath}`)}
        style={{
          background: "none",
          border: "1px solid black",
          padding: "8px 16px",
          cursor: "pointer",
          fontSize: "14px",
        }}
        onMouseOver={(e) => {
          e.target.style.background = "black";
          e.target.style.color = "white";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "none";
          e.target.style.color = "black";
        }}
      >
        {textBtn}
      </button>
    </div>
  );
}

export default Success;
