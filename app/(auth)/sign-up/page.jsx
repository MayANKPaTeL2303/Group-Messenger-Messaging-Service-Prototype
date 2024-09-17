'use client'
import { useState, useEffect } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
 


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const response = await signIn('credentials', {
      redirect: false,
      username: formData.username,
      password: formData.password,
    });

    if (response?.error) {
      alert('Error signing in');
    } else {
      router.push('/'); // Redirect to homepage or dashboard
    }

    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong!");
      } else {
        setSuccess("User created successfully!");
      }
    } catch (error) {
      setError("Error registering user");
    }
  };
  return (
    <div className="max-w-sm mx-auto mt-12">
      <h1 className="text-xl font-semibold text-center mb-6">Sign Up</h1>
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      {success && <div className="text-green-600 text-center mb-4">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}  

export default SignUp;
