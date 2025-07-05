import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "./Header";
import BACKEND_URL from "../config/globalVar";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("Token");
      navigate("/login");
      return;
    }

    fetch(`${BACKEND_URL}/api/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => console.error("❌ Error fetching profile:", err));
  }, []);

  // ✅ Function to calculate subscription end date
  const getSubscriptionDates = () => {
    if (!user?.subscribed_at || !user?.plan)
      return { start: "No active subscription", end: "No active subscription" };

    const startDate = new Date(user.subscribed_at); // ✅ Gets UTC timestamp from NeonDB
    let monthsToAdd = 0;

    switch (user.plan.toLowerCase()) {
      case "cadet":
        monthsToAdd = 1;
        break;
      case "challenger":
        monthsToAdd = 3;
        break;
      case "hero":
        monthsToAdd = 12;
        break;
      default:
        return { start: "Unknown subscription", end: "Unknown subscription" };
    }

    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + monthsToAdd);

    // ✅ Convert UTC to local time using toLocaleString
    const formatDate = (date) =>
      date.toLocaleString("en-GB", {
        // Change "en-GB" to match preferred locale
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // ✅ Auto-detects user's time zone
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

    return { start: formatDate(startDate), end: formatDate(endDate) };
  };

  if (!user)
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          textAlign: "center",
        }}
      >
        Loading...
      </div>
    );
  const { start, end } = getSubscriptionDates();

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Welcome, {user.first_name}!
      </h1>
      <div style={{ marginBottom: "20px" }}>
        <p>Email: {user.email}</p>
        <p>Subscription: {user.plan || "No active plan"}</p>
        <p>Subscription Start: {start}</p>
        <p>Subscription End: {end}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
