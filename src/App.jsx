import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import AuthPage from "./pages/AuthPage";
import TermsPage from "./pages/TermsPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";
import { useEffect, useState } from "react";

const VITE_API_BASE_URL = "https://backend-ecom-gbzk.onrender.com";

// the banner is not shown at first
// it fetches the products immediately
// if products take longer than 1s to fetch it shows the banner
// once fetched the banner turns green and after 1s disappears

function App() {
  const [bStatus, setBStatus] = useState("unknown");
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    let showBannerTimeout;
    let hideBannerTimeout;
    let hasShownAsleepBanner = false;

    const awakenBackend = async () => {
      showBannerTimeout = setTimeout(() => {
        setBannerVisible(true);
        setBStatus("asleep");
        hasShownAsleepBanner = true;
      }, 1000);

      try {
        const response = await fetch(`${VITE_API_BASE_URL}/api/products`, {
          method: "GET",
        });
        const data = await response.json();

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
      } catch (error) {
        clearTimeout(showBannerTimeout);
        setBStatus("asleep");
        console.log("Backend is asleep");
      }
    };

    awakenBackend();

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
      </Routes>
    </Router>
  );
}

export default App;
