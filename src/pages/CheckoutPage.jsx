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
  "Access to all TRW Campuses",
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

  const handleSelected = (plan) => {
    setSelectedPlan(plan);
  };

  const paymentRef = useRef(null);

  useEffect(() => {
    if (paymentRef.current) {
      paymentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedPlan]);

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
        <div className={css.form} style={{ marginTop: "20px" }}>
          <label>First Name</label>
          <input type="text" placeholder="First Name" />
        </div>
        <div
          className={css.form}
          style={{ marginTop: "20px", marginBottom: "20px" }}
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
            selectedPlan === "cadet" ? css.selectedPlan : ""
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
              selectedPlan === "cadet" ? css.selectedArrow : ""
            }`}
          />
        </div>
        <div
          className={`${css.planOption} ${
            selectedPlan === "challenger" ? css.selectedPlan : ""
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
              selectedPlan === "challenger" ? css.selectedArrow : ""
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
            selectedPlan === "hero" ? css.selectedPlan : ""
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
              selectedPlan === "hero" ? css.selectedArrow : ""
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
                  selectedPlan === "hero" ? css.disPayment : ""
                }`}
                disabled={selectedPlan === "hero"}
              >
                <LuCreditCard className={css.payImg} />
                <p>Join with Credit/Debit Card</p>
                <IoIosArrowDown className={css.arrowPay} />
              </button>
              <button
                className={`${css.paymentOpt} ${
                  selectedPlan === "cadet" ? css.disPayment : ""
                }`}
                disabled={selectedPlan === "cadet"}
              >
                <img src={crypto} className={css.payImg} />
                <p>Join with Crypto</p>
                <IoIosArrowDown className={css.arrowPay} />
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default CheckoutPage;
