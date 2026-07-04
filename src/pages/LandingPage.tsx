import { ArrowRight, Briefcase, Building2, Users } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800">

        <div className="text-3xl font-bold text-indigo-400">
          CPP
        </div>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="px-5 py-2 rounded-lg hover:bg-slate-800 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-500 transition"
          >
            Register
          </Link>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="text-center">

          <span className="bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm">
            Smart Campus Recruitment Platform
          </span>

          <h1 className="text-6xl font-bold mt-8 leading-tight">

            Find Jobs.

            <br />

            Connect Talent.

            <br />

            Build Careers.

          </h1>

          <p className="text-slate-400 text-lg mt-8 max-w-2xl mx-auto">

            A modern placement management system connecting
            students, recruiters, and placement officers
            through one intelligent platform.

          </p>

          <div className="flex justify-center gap-4 mt-10">

            <Link
              to="/register"
              className="flex items-center gap-2 bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-500 transition"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <button
              className="border border-slate-700 px-6 py-3 rounded-xl hover:bg-slate-900 transition"
            >
              Learn More
            </button>

          </div>

        </div>

      </section>

      {/* Stats Section */}

      <section className="max-w-6xl mx-auto px-8">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">

            <Users
              size={40}
              className="text-indigo-400"
            />

            <h2 className="text-4xl font-bold mt-4">
              5000+
            </h2>

            <p className="text-slate-400 mt-2">
              Registered Students
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">

            <Building2
              size={40}
              className="text-green-400"
            />

            <h2 className="text-4xl font-bold mt-4">
              300+
            </h2>

            <p className="text-slate-400 mt-2">
              Recruiting Companies
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">

            <Briefcase
              size={40}
              className="text-yellow-400"
            />

            <h2 className="text-4xl font-bold mt-4">
              1200+
            </h2>

            <p className="text-slate-400 mt-2">
              Successful Placements
            </p>

          </div>

        </div>

      </section>

      {/* Recruiters Section */}

      <section className="max-w-6xl mx-auto px-8 py-24">

        <h2 className="text-4xl font-bold text-center mb-12">
          Top Recruiters
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {[
            "Google",
            "Microsoft",
            "Amazon",
            "Infosys",
            "TCS",
            "Wipro",
            "Accenture",
            "IBM",
          ].map((company) => (
            <div
              key={company}
              className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center hover:border-indigo-500 transition"
            >
              {company}
            </div>
          ))}

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t border-slate-800 py-8 text-center text-slate-400">

        © 2026 Campus Placement Portal

      </footer>

    </div>
  );
};

export default LandingPage;