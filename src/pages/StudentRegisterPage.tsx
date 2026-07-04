import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import toast from "react-hot-toast";

const StudentRegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    cgpa: "",
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
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "student",

        // Student Profile Data
        department: formData.department,
        cgpa: Number(formData.cgpa),
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
          Student Registration
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
          required
        />

        <input
          type="number"
          step="0.01"
          name="cgpa"
          placeholder="CGPA"
          value={formData.cgpa}
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
          className="w-full p-6 rounded-lg bg-slate-800 text-white mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition p-3 rounded-lg text-white font-semibold"
        >
          Register
        </button>

      </form>

    </div>
  );
};

export default StudentRegisterPage;