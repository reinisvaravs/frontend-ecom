import css from "./CheckoutPage.module.css";
import logo from "../assets/trw.svg";
import logo2 from "../assets/trw2.svg";
import { ImKey } from "react-icons/im";
import { FaCheckCircle, FaCheck } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { LuCreditCard } from "react-icons/lu";
import crypto from "../assets/crypto.svg";
import { IoIosArrowDown } from "react-icons/io";

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
  const payDetailsRef = useRef(null);

  useEffect(() => {
    if (paymentRef.current) {
      paymentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (payDetailsRef.current) {
      payDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedPayOpt]);

  const handleChange = (event) => {
    setTermsChecked(event.target.checked);
  };

  const handlePurchase = () => {
    if (!termsChecked) {
      alert("Please agree to the terms.");
    }
  };

  return (
    <main>
      <div className={css.info}>
        <img src={logo} alt="Logo" />
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
            <img src={logo2} alt="Logo" />
          </div>
          <div>
            <h1>Join the real world</h1>
            <h2>Escape the matrix</h2>
          </div>
        </div>
        <div className={css.formHeader}>
          <FaCheckCircle className={css.checkMark} />
          <p>Personal information</p>
        </div>
        <div className={css.form}>
          <label>Email address</label>
          <input type="text" placeholder="example@gmail.com" />
        </div>
        <div className={css.form} style={{ marginTop: "10px" }}>
          <label>First Name</label>
          <input type="text" placeholder="First Name" />
        </div>
        <div
          className={css.form}
          style={{ marginTop: "10px", marginBottom: "20px" }}
        >
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" />
        </div>
        <div className={css.formHeader}>
          <FaCheckCircle className={css.checkMark} />
          <p>Personal information</p>
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
          <>
            <div className={css.formHeader} ref={payDetailsRef}>
              <FaCheckCircle className={css.checkMark} />
              <p>Enter credit card</p>
            </div>
            <div className={css.form}>
              <label>Card number</label>
              <div style={{ position: "relative", width: "100%" }}>
                <LuCreditCard
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#b7b7b7",
                    fontSize: "30px",
                  }}
                />
                <input
                  type="tel"
                  placeholder="xxxx xxxx xxxx xxxx"
                  autoComplete="cc-number"
                  style={{
                    width: "100%",
                    padding: "10px",
                    paddingLeft: "52px",
                    height: "50px",
                  }}
                />
              </div>
            </div>
            <div className={css.form} style={{ marginTop: "10px" }}>
              <label>Expiration Date</label>
              <input type="text" placeholder="MM/YY" autoComplete="cc-exp" />
            </div>
            <div className={css.form} style={{ marginTop: "10px" }}>
              <label>CVC</label>
              <input type="text" placeholder="x x x" autoComplete="cc-csc" />
            </div>
            <div className={css.form} style={{ marginTop: "10px" }}>
              <label>Billing Address</label>
              <input
                type="text"
                placeholder="Billing Address"
                autoComplete="off"
              />
            </div>
            {selectedPlan === null ? (
              ""
            ) : (
              <>
                <div className={css.checkoutFooter}>
                  {selectedPlan === "cadet" && (
                    <h1>
                      $49.99<span> / Monthly</span>
                    </h1>
                  )}
                  {selectedPlan === "challenger" && (
                    <h1>
                      $149<span> / 3 months</span>
                    </h1>
                  )}
                  <div className={css.checkbox}>
                    <input type="checkbox" onChange={handleChange} />
                    <p>
                      {selectedPlan === "cadet" &&
                        "I accept the Terms and Conditions and Privacy Policy, and agree to pay $49.99 USD every month until I cancel."}
                      {selectedPlan === "challenger" &&
                        "I accept the Terms and Conditions and Privacy Policy, and agree to pay $149 USD every 3 months until I cancel."}
                    </p>
                  </div>
                </div>
                <button
                  className={css.enterNow}
                  style={
                    termsChecked
                      ? {
                          boxShadow: "0 0 30px 5px rgba(239, 175, 24, 0.5)",
                          transition: "box-shadow 0.1s ease",
                        }
                      : {}
                  }
                  onClick={handlePurchase}
                >
                  <LuCreditCard className={css.enterNowImg} />
                  <h1>Enter now</h1>
                </button>
              </>
            )}
          </>
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
