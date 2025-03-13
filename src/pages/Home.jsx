import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-lg shadow-xl border border-base-300 text-center">
        <h1 className="text-3xl font-semibold text-primary mb-6">Hello</h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/login")}
            className="btn btn-secondary"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/register")}
            className="btn btn-primary"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
