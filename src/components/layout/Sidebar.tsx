import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  Settings,
  Users,
  Building2,
  ClipboardList,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

interface SidebarProps {
  role: "student" | "company" | "admin";
}

const Sidebar = ({ role }: SidebarProps) => {
  const studentMenu = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/student",
    },
    {
      icon: <User size={20} />,
      label: "Profile",
      path: "/student/profile",
    },
    {
      icon: <Briefcase size={20} />,
      label: "Jobs",
      path: "/student/jobs",
    },
    {
      icon: <FileText size={20} />,
      label: "Applications",
      path: "/student/applications",
    },
    {
  icon: <Briefcase size={20} />,
  label: "Placements",
  path: "/student/placements",
},
    {
      icon: <FileText size={20} />,
      label: "Upload Resume",
      path: "/student/upload-resume",
    },
    {
  icon: <User size={20} />,
  label: "Upload Profile Picture",
  path: "/student/upload-profile-image",
},
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/student/settings",
    },
  ];

  const companyMenu = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/company",
    },
   {
  icon: <Briefcase size={20} />,
  label: "Post Jobs",
  path: "/company/post-jobs",
},
{
  icon: <ClipboardList size={20} />,
  label: "Manage Jobs",
  path: "/company/manage-jobs",
},
{
  icon: <Building2 size={20} />,
  label: "Upload Logo",
  path: "/company/upload-logo",
},
{
  icon: <Users size={20} />,
  label: "Applicants",
  path: "/company/applicants",
},
    {
      icon: <FileText size={20} />,
      label: "Interviews",
      path: "/company/interviews",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/company/settings",
    },
  ];

  const adminMenu = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/admin",
    },
    {
      icon: <Users size={20} />,
      label: "Students",
      path: "/admin/students",
    },
    {
      icon: <Building2 size={20} />,
      label: "Companies",
      path: "/admin/companies",
    },
    {
      icon: <ClipboardList size={20} />,
      label: "Placements",
      path: "/admin/placements",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/admin/settings",
    },
  ];

  const menu =
    role === "student"
      ? studentMenu
      : role === "company"
      ? companyMenu
      : adminMenu;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col">

   {/* Logo Section */}

<div className="p-6 border-b border-slate-800">

  <div className="flex flex-col items-center text-center">

    <img
      src={logo}
      alt="Campus Placement Portal"
      className="w-64 h-24 object-contain"
    />

    <h2 className="text-lg font-bold text-white mt-3">
      Campus Placement Portal
    </h2>

    

  </div>

</div>

      {/* Navigation */}

      <nav className="flex-1 p-4">

        <ul className="space-y-2">

          {menu.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                end={item.path === "/student" || item.path === "/company" || item.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {item.icon}

                <span>{item.label}</span>

              </NavLink>
            </li>
          ))}

        </ul>

      </nav>

      {/* Footer */}

      <div className="p-4 border-t border-slate-800">

        <div className="bg-slate-800 rounded-xl p-4 text-center">

          <p className="text-xs text-slate-400">
            Campus Placement Portal
          </p>

          <p className="text-sm font-semibold text-indigo-400 mt-1">
            Version 1.0
          </p>

        </div>

      </div>

    </aside>
  );
};

import { memo } from "react";

export default memo(Sidebar);