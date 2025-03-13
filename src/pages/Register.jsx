import React from "react";
import "../App.css";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-lg shadow-xl border border-base-300">
        <h1 className="text-3xl font-semibold text-center mb-6 text-primary">Register</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-sm font-medium text-base-content">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              placeholder="Enter your First Name"
              className="input input-bordered w-full mt-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="last_name" className="block text-sm font-medium text-base-content">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              placeholder="Enter your Last Name"
              className="input input-bordered w-full mt-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-base-content">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="input input-bordered w-full mt-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-base-content">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="input input-bordered w-full mt-2"
            />
          </div>

          <div className="mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
