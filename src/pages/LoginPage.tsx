import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      toast.success("Login Successful");

      if (res.data.role === "student") {
        navigate("/student");
      } else if (res.data.role === "company") {
        navigate("/company");
      } else if (res.data.role === "admin") {
        navigate("/admin");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 p-10 rounded-2xl w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-6 outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 p-3 rounded-lg hover:bg-indigo-500 transition text-white font-semibold"
        >
          Login
        </button>

      </form>

      {/* Footer */}

      <div className="mt-8 text-center">

        <Link
          to="/"
          className="text-indigo-400 hover:text-indigo-300 font-medium transition"
        >
          ← Back to Home
        </Link>

        <p className="text-slate-500 text-sm mt-4">
          © 2026 Campus Placement Portal. All rights reserved.
        </p>

      </div>

    </div>
  );
};

export default LoginPage;