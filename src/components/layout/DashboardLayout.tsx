import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import NotificationBell from "../NotificationBell";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "student" | "company" | "admin";
}

const DashboardLayout = ({
  children,
  role,
}: DashboardLayoutProps) => {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const navigate = useNavigate();
const location = useLocation();

const pageName =
  location.pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()) || "Dashboard";
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");

  };

  return (

    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Desktop Sidebar */}

      <div className="hidden lg:block">

        <Sidebar role={role} />

      </div>

      {/* Mobile Sidebar */}

      {sidebarOpen && (

        <div className="fixed inset-0 z-50 lg:hidden">

          <Sidebar role={role} />

        </div>

      )}

      {/* Main */}

      <div className="flex-1 flex flex-col">

        {/* Top Header */}

        <header className="sticky top-0 z-40 h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">

          {/* Left */}

          <div className="flex items-center gap-4">

  <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="lg:hidden"
  >
    <Menu size={24} />
  </button>

  <div>

    <h1 className="text-2xl font-bold">
      {pageName}
    </h1>

    <p className="text-sm text-slate-400">
      Campus Placement Portal
    </p>

  </div>

</div>

          {/* Right */}

          <div className="flex items-center gap-4">

            <NotificationBell />

            <button
              onClick={handleLogout}
              title="Logout"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 transition"
            >

              <LogOut size={18} />

            </button>

          </div>

        </header>

        {/* Page */}

        <main className="flex-1 p-6">

          {children}

        </main>

      </div>

    </div>

  );

};

export default DashboardLayout;