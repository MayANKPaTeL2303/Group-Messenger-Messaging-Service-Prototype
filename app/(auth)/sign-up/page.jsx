//Sign-Up Page
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    formData.username.length > 0 &&
      formData.email.length > 0 &&
      formData.password.length > 0;
  }, formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/sign-up", formData);
      console.log("SignUp Done", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Failed to sign up the user", error.message);
    } finally {
      setLoading(false);
    }
  };
  console.log(formData);

  return (
    <div className="max-w-sm mx-auto mt-12 p-4 border bg-blue-950 border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-xl font-semibold text-center mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500  text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>
        {loading ? "Processing..." : "Free Sign Up"}
      </form>
    </div>
  );
};

export default SignUp;
