//Login Page
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setLoading(true);
      const response = await signIn("credentials", {
        redirect: false, // Prevent automatic redirection
        identifier: formData.identifier,
        password: formData.password,
      });
      if (response.error) {
        // If there's an error, display it
        setError(response.error || "Login failed!");
      } else {
        // If successful, redirect to the home page or dashboard
        setSuccess("Login successful!");
        router.push("/");
      }
      if (!response.ok) {
        setError(data.message || "Login failed!");
      } 
      else {
        setSuccess("Login Successfully");
      }
    } 
    catch (error) 
    {
      setError("Error logging in");
    } 
    finally { //To set loading
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Login</h1>
          <p className="text-gray-600 mb-6">Sign in to continue</p>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && (
          <div className="text-green-600 text-center mb-4">{success}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm text-gray-700">
              Email/Username
            </label>
            <input
              type="text"
              name="identifier"
              onChange={handleChange}
              className="w-full text-black p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full p-2 text-black border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
