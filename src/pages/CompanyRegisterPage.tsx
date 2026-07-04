import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import toast from "react-hot-toast";

const CompanyRegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    location: "",
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

      const res = await registerUser({

        name: formData.companyName,

        companyName: formData.companyName,

        email: formData.email,

        location: formData.location,

        password: formData.password,

        role: "company",

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
          Company Registration
        </h1>

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="HR Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Company Location"
          value={formData.location}
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
          className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded-lg text-white font-semibold"
        >
          Register
        </button>

      </form>

    </div>
  );
};

export default CompanyRegisterPage;