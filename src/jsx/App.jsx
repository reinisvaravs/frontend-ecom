import CheckoutPage from "./Checkout";
import LoginPage from "./Login";
import AuthPage from "./Auth";
import ProfilePage from "./Profile";
import ErrorPage from "./Error";
import Stripe from "./Stripe";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        background: "white",
        color: "black",
        lineHeight: 1.5,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth" element={<AuthPage />} />
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
              <Stripe
                h1="Purchase Was Canceled"
                btnPath="/"
                textBtn="Go back"
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
