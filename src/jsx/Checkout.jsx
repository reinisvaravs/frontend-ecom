import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../config/globalVar";
import { BackButton } from "./Navbar";

function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleSelected = (plan) => {
    setSelectedPlan(plan);
  };

  const paymentRef = useRef(null);
  const submitBtn = useRef(null);

  useEffect(() => {
    if (paymentRef.current) {
      paymentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (submitBtn.current) {
      submitBtn.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      if (name === "firstName") updatedData.first_name = value;
      if (name === "lastName") updatedData.last_name = value;

      return updatedData;
    });
  };

  const handlePurchase = async () => {
    // Checks if any input is empty before sending request
    if (
      !userData.first_name ||
      !userData.last_name ||
      !userData.email ||
      !userData.password
    ) {
      alert("⚠️ Please fill in all fields before proceeding.");
      return;
    }

    const requestBody = {
      plan: selectedPlan,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      password: userData.password,
    };

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("🔴 Checkout Error:", data);

        if (data.redirect) {
          navigate(`${data.redirect}`);
          alert("You already have an account.");
          return;
        }

        // **Handle Validation Errors Properly**
        if (data.errors) {
          const errorMessages = data.errors
            .map((err) => `⚠️ ${err.msg}`)
            .join("\n");
          alert(errorMessages);
        } else {
          alert(
            "⚠️ " + (data.message || "An error occurred. Please try again.")
          );
        }

        return;
      }

      window.location.href = data.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("❌ Network Error:", error.message);
      alert("❌ Something went wrong. Please try again later.");
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value.trim();

    // Clears any previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Sets a new timeout (wait 500ms after last keystroke)
    const newTimeout = setTimeout(() => {
      checkUserExists(email);
    }, 500);

    setTypingTimeout(newTimeout);
  };

  const checkUserExists = async (email) => {
    if (email.length === 0) return; // Don't check if empty

    try {
      const response = await fetch(`${BACKEND_URL}/api/stripe/check-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success && data.redirect) {
        alert("You already have an account. Redirecting to login.");
        setTimeout(() => {
          navigate(`${data.redirect}?email=${encodeURIComponent(email)}`);
        }, 500);
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <BackButton />
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Subscribe</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={userData.first_name}
          onChange={handleInputChange}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            fontSize: "14px",
            width: "100%",
            marginBottom: "20px",
          }}
        />
        <br />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={userData.last_name}
          onChange={handleInputChange}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            fontSize: "14px",
            width: "100%",
            marginBottom: "20px",
          }}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => {
            handleInputChange(e);
            handleEmailChange(e);
          }}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            fontSize: "14px",
            width: "100%",
            marginBottom: "20px",
          }}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleInputChange}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            fontSize: "14px",
            width: "100%",
            marginBottom: "20px",
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Select Plan</h3>
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => handleSelected("cadet")}
            style={{
              background: "none",
              border: "1px solid black",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "14px",
              marginBottom: "20px",
              width: "100%",
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
            Cadet - $49.99/month
          </button>
          <br />
          <button
            onClick={() => handleSelected("challenger")}
            style={{
              background: "none",
              border: "1px solid black",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "14px",
              marginBottom: "20px",
              width: "100%",
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
            Challenger - $149/3 months
          </button>
        </div>
      </div>

      {selectedPlan && (
        <div style={{ marginBottom: "20px" }} ref={paymentRef}>
          <h3>Payment Method</h3>
          <p style={{ marginBottom: "20px" }}>Credit/Debit Card</p>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={handlePurchase}
              ref={submitBtn}
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
              Subscribe
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
