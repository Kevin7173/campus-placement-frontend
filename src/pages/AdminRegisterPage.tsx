import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import toast from "react-hot-toast";

const AdminRegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    secretKey: "",
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

    if (formData.secretKey !== "ADMIN123") {

      toast.error("Invalid Admin Secret Key");
      return;
    }

    try {
      const res = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "admin",
      });


      toast.success(res.data.message);
      navigate("/login");
    } catch (error: any) {
      
      toast.error(
  error.response?.data?.message ||
  "Registration failed."
);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-10 rounded-2xl w-[500px]"
      >
        <h1 className="text-3xl font-bold text-white mb-8">
          Admin Registration
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Admin Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
          required
        />

        <input
          type="text"
          name="secretKey"
          placeholder="Secret Key"
          value={formData.secretKey}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 p-3 rounded-lg text-white font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegisterPage;