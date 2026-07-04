import { useNavigate } from "react-router-dom";

const RegisterRolePage = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Student",
      description: "Apply for jobs and track your placements.",
      path: "/register/student",
      color: "from-indigo-600 to-purple-600",
      icon: "🎓",
    },
    {
      title: "Company",
      description: "Post jobs and manage applicants.",
      path: "/register/company",
      color: "from-green-600 to-emerald-600",
      icon: "🏢",
    },
    {
      title: "Admin",
      description: "Manage the placement portal.",
      path: "/register/admin",
      color: "from-red-600 to-pink-600",
      icon: "⚙️",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Choose Registration Type
          </h1>

          <p className="text-slate-400 text-lg">
            Select your role to continue registration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div
              key={role.title}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500 transition duration-300 hover:scale-105 cursor-pointer"
              onClick={() => navigate(role.path)}
            >
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center text-4xl mb-6 mx-auto`}
              >
                {role.icon}
              </div>

              <h2 className="text-3xl font-bold text-center mb-4">
                {role.title}
              </h2>

              <p className="text-slate-400 text-center mb-8">
                {role.description}
              </p>

              <button
                className={`w-full py-3 rounded-xl bg-gradient-to-r ${role.color} font-semibold`}
              >
                Register as {role.title}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-400 hover:text-indigo-300"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterRolePage;