import LandingPage from "./pages/home/Home";
import CheckoutPage from "./pages/checkout/Checkout";
import LoginPage from "./pages/login/Login";
import AuthPage from "./pages/auth/Auth";
import TermsPage from "./pages/terms/Terms";
import ProfilePage from "./pages/profile/Profile";
import ErrorPage from "./pages/error/Error";
import Stripe from "./components/stripe/Stripe";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

const VITE_API_BASE_URL = "https://backend-ecom-gbzk.onrender.com";

function App() {
  const [bStatus, setBStatus] = useState("unknown");
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 0);
  }, []);

  useEffect(() => {
    let showBannerTimeout;
    let hideBannerTimeout;
    let hasShownAsleepBanner = false;

    const pingBackend = async (retries = 3, delay = 5000) => {
      showBannerTimeout = setTimeout(() => {
        setBannerVisible(true);
        setBStatus("asleep");
        hasShownAsleepBanner = true;
      }, 1000);

      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const res = await fetch(`${VITE_API_BASE_URL}/api/ping`);
          if (res.ok) {
            clearTimeout(showBannerTimeout);

            if (hasShownAsleepBanner) {
              setBStatus("awake");
              hideBannerTimeout = setTimeout(() => {
                setBannerVisible(false);
                setBStatus("unknown");
              }, 1000);
            } else {
              setBStatus("unknown");
            }

            return;
          }
        } catch (error) {
          console.warn(`Ping attempt ${attempt} failed`);
          if (attempt < retries) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }

      clearTimeout(showBannerTimeout);
      setBannerVisible(true);
      setBStatus("asleep");
      console.error("Backend did not respond after multiple attempts.");
    };

    pingBackend();

    return () => {
      clearTimeout(showBannerTimeout);
      clearTimeout(hideBannerTimeout);
    };
  }, []);

  return (
    <Router basename="/store">
      <div
        className={`asleepBackend ${bStatus === "awake" ? "awake" : ""} ${
          !bannerVisible ? "hidden" : ""
        }`}
      >
        <p>
          {bStatus === "asleep"
            ? "Backend is asleep. Wait ~ 20s."
            : bStatus === "awake"
            ? "Backend is now awake!"
            : ""}
        </p>
      </div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route
          path="/success"
          element={
            <Stripe
              h1="Purchase Was Successful"
              btnPath="/auth"
              textBtn="Go to login"
            />
          }
        />
        <Route
          path="/cancel"
          element={
            <Stripe h1="Purchase Was Canceled" btnPath="/" textBtn="Go back" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
