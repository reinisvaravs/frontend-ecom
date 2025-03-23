import css from "./CheckoutPage.module.css";
import { ImKey } from "react-icons/im";
import { FaCheckCircle, FaCheck } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { LuCreditCard } from "react-icons/lu";
import crypto from "../assets/crypto.svg";
import { IoIosArrowDown } from "react-icons/io";
import { IoSchool, IoSchoolOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const VITE_API_BASE_URL = "https://backend-ecom-gbzk.onrender.com";

const accessTo = [
  "Live calls and AMAs with Experts",
  "24/7 Support and on-demand guidance",
  "Over 18 Modern Wealth Creation Methods",
  "7+ Distinct Campuses",
  "1000+ Professionally made Video lessons",
];
const cadetFeat = [
  "Access to all RRV Campuses",
  "Daily live broadcasts",
  "Daily course updates",
];
const challengerFeat = [
  "All of Cadet",
  "Daily coin bonus",
  "Power level boost",
];
const heroFeat = [
  "Maximum daily coin bonus",
  "Big power level boost",
  "Exclusive chats and lessons",
];

function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPayOpt, setSelectedPayOpt] = useState(null);
  const [termsChecked, setTermsChecked] = useState(false);
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
    setSelectedPayOpt(null);
  };

  const handlePayment = (paymentOpt) => {
    if (selectedPayOpt === paymentOpt) {
      setSelectedPayOpt(null);
    } else {
      setSelectedPayOpt(paymentOpt);
    }
    setTermsChecked(false);
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
  }, [selectedPayOpt]);

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
    if (!termsChecked) {
      alert("⚠️ Please agree to the terms.");
      return;
    }

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
        `${VITE_API_BASE_URL}/api/stripe/create-checkout-session`,
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
      const response = await fetch(
        `${VITE_API_BASE_URL}/api/stripe/check-user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

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
    <main className={css.main}>
      <div className={css.info}>
        <IoSchool className={css.logo1} />
        <div className={css.infoHeader}>
          <ImKey className={css.imKey} />
          <h1>Unclock access to...</h1>
        </div>
        <div className={css.accessTo}>
          {accessTo.map((item, index) => (
            <div key={index} className={css.accessItem}>
              <FaCheck className={css.check} />
              <h3>{item}</h3>
            </div>
          ))}
        </div>
        <h2>An active community of like-minded, wealth-focused individuals.</h2>
      </div>
      <div className={css.checkout}>
        <div className={css.checkoutHeader}>
          <div>
            <IoSchoolOutline className={css.logo2} />
          </div>
          <div>
            <h1>Join the real code</h1>
            <h2>Escape the basement</h2>
          </div>
        </div>
        <div className={css.formHeader}>
          <FaCheckCircle className={css.checkMark} />
          <p>Personal information</p>
        </div>

        <div className={css.form}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            autoComplete="given-name"
            value={userData.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div className={css.form} style={{ marginTop: "10px" }}>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            autoComplete="family-name"
            value={userData.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div className={css.form} style={{ marginTop: "10px" }}>
          <label>Email address</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            autoComplete="email"
            value={userData.email}
            onChange={(e) => {
              handleInputChange(e);
              handleEmailChange(e);
            }}
          />
        </div>
        <div
          className={css.form}
          style={{ marginTop: "10px", marginBottom: "20px" }}
        >
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="new-password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className={css.formHeader}>
          <FaCheckCircle className={css.checkMark} />
          <p>SELECT PLAN</p>
        </div>
        <div
          className={`${css.planOption} ${
            selectedPlan === "cadet" && css.selectedPlan
          }`}
          onClick={() => handleSelected("cadet")}
        >
          <h1>
            $49.99<span> / monthly</span>
          </h1>
          <h2>Cadet</h2>
          <p>A first step towards breaking free</p>
          {cadetFeat.map((item, index) => (
            <div key={index} className={css.cadetItem}>
              <FaCheck className={css.checkFeat} />
              <p>{item}</p>
            </div>
          ))}
          <IoIosArrowDown
            className={`${css.arrow} ${
              selectedPlan === "cadet" && css.selectedArrow
            }`}
          />
        </div>
        <div
          className={`${css.planOption} ${
            selectedPlan === "challenger" && css.selectedPlan
          }`}
          onClick={() => handleSelected("challenger")}
        >
          <h1>
            $149<span> / 3 months</span>
          </h1>
          <h2>Challenger</h2>
          <p>Three months to test your limits</p>
          {challengerFeat.map((item, index) => (
            <div key={index} className={css.cadetItem}>
              <FaCheck className={css.checkFeat} />
              <p>{item}</p>
            </div>
          ))}
          <IoIosArrowDown
            className={`${css.arrow} ${
              selectedPlan === "challenger" && css.selectedArrow
            }`}
          />
          <div
            className={` ${
              selectedPlan === "challenger" ? css.activeTag : css.tag
            }`}
          >
            Most popular
          </div>
        </div>
        <div
          className={`${css.planOption} ${
            selectedPlan === "hero" && css.selectedPlan
          }`}
          style={{ background: "#282a33" }}
          onClick={() => handleSelected("hero")}
        >
          <h1>
            $479.88<span> / 1 year</span>
          </h1>
          <h2>Hero</h2>
          <p>One year to harness your power</p>
          {heroFeat.map((item, index) => (
            <div key={index} className={css.cadetItem}>
              <FaCheck className={css.checkFeat} />
              <p>{item}</p>
            </div>
          ))}
          <IoIosArrowDown
            className={`${css.arrow} ${
              selectedPlan === "hero" && css.selectedArrow
            }`}
          />
          <div className={css.activeTag}>Save $120</div>
        </div>
        {selectedPlan === null ? null : (
          <>
            <div className={css.formHeader}>
              <FaCheckCircle className={css.checkMark} />
              <p>Select payment</p>
            </div>
            <div className={css.payment} ref={paymentRef}>
              <button
                className={`${css.paymentOpt} ${
                  selectedPlan === "hero" ? css.disPayment : css.hoverPayOpt
                } ${selectedPayOpt === "card" && css.activePay}`}
                disabled={selectedPlan === "hero"}
                onClick={() => handlePayment("card")}
              >
                <LuCreditCard className={css.payImg} />
                <p>Join with Credit/Debit Card</p>
                <IoIosArrowDown className={css.arrowPay} />
              </button>
              <button
                className={`${css.paymentOpt} ${
                  selectedPlan === "cadet" ? css.disPayment : css.hoverPayOpt
                } ${selectedPayOpt === "crypto" && css.activePay}`}
                disabled={selectedPlan === "cadet"}
                onClick={() => handlePayment("crypto")}
              >
                <img src={crypto} className={css.payImg} />
                <p>Join with Crypto</p>
                <IoIosArrowDown className={css.arrowPay} />
              </button>
            </div>
          </>
        )}
        {selectedPayOpt === "card" && (
          <div className={css.cardCheckout}>
            <div className={css.terms}>
              <input
                type="checkbox"
                id="terms"
                checked={termsChecked}
                onChange={() => setTermsChecked(!termsChecked)}
                className={css.checkbox}
              />
              <label>
                I accept the{" "}
                <a href="/store/terms" target="_blank">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/store/terms" target="_blank">
                  Privacy Policy
                </a>
                , and agree to pay{" "}
                {selectedPlan === "cadet" && "$49.99 USD every month"}
                {selectedPlan === "challenger" &&
                  "$149 USD every 3 months"}{" "}
                until I cancel.
              </label>
            </div>
            <button onClick={handlePurchase} className={css.enterNow}>
              <LuCreditCard className={css.enterNowImg} />
              <h1 ref={submitBtn}>Join now</h1>
            </button>


            <div className={css.infoSmall}>
              <div className={css.infoHeader}>
                <ImKey className={css.imKey} />
                <h1>Unclock access to...</h1>
              </div>
              <div className={css.accessTo}>
                {accessTo.map((item, index) => (
                  <div key={index} className={css.accessItem}>
                    <FaCheck className={css.check} />
                    <h3>{item}</h3>
                  </div>
                ))}
              </div>
              <h2>
                An active community of like-minded, wealth-focused individuals.
              </h2>
            </div>

            
          </div>
        )}
        {selectedPayOpt === "crypto" && (
          <div className={css.cryptoCheckout}>
            <h1>Currently crypto payments are not available...</h1>
          </div>
        )}
      </div>
    </main>
  );
}

export default CheckoutPage;
