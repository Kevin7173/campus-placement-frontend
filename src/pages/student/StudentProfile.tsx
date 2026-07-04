import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getStudentProfile, updateStudentProfile } from "../../api/student";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Award,
  MapPin,
  Calendar,
  Wrench,
  Save,
} from "lucide-react";

import { UPLOAD_URL } from "../../config/api";

interface StudentProfileData {
  fullName: string;
  email: string;
  department: string;
  cgpa: number;
  phone: string;
  address: string;
  graduationYear: number;
  skills: string[];
  profileImage?: string;
}

const StudentProfile = () => {
  const [profile, setProfile] = useState<StudentProfileData>({
    fullName: "",
    email: "",
    department: "",
    cgpa: 0,
    phone: "",
    address: "",
    graduationYear: new Date().getFullYear(),
    skills: [],
  });

  const [skillsInput, setSkillsInput] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getStudentProfile();

      setProfile(res.data);

      setSkillsInput(
        res.data.skills
          ? res.data.skills.join(", ")
          : ""
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.name === "cgpa" ||
        e.target.name === "graduationYear"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      setSaving(true);

      await updateStudentProfile({
        ...profile,
        skills: skillsInput
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
      });

      setMessage("Profile updated successfully.");

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {
      console.error(error);

      setMessage("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-2xl font-bold">
            Loading Profile...
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">

      <div className="space-y-8">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              My Profile
            </h1>

            <p className="text-slate-400 mt-2">
              Update your personal information.
            </p>

          </div>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl transition"
          >
            <Save size={18} />

            {saving ? "Saving..." : "Save Profile"}
          </button>

        </div>

        {message && (
          <div className="bg-green-600 p-4 rounded-xl">
            {message}
          </div>
        )}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

  <div className="flex flex-col md:flex-row items-center gap-8">

    <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-700">

      {profile.profileImage ? (

        <img
         src={`${UPLOAD_URL}/profile-images/${profile.profileImage}`}
        alt="Profile"
          className="w-full h-full object-cover"
        />

      ) : (

        <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-5xl font-bold">

          {profile.fullName
            ? profile.fullName.charAt(0)
            : "S"}

        </div>

      )}

    </div>

    <div>

      <h2 className="text-3xl font-bold">
        {profile.fullName || "Student"}
      </h2>

      <p className="text-slate-400">
        {profile.department}
      </p>

    </div>

  </div>

</div>

        

            
              

                <div className="grid lg:grid-cols-2 gap-8">

          {/* Personal Information */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

            <h2 className="text-2xl font-bold mb-6">
              Personal Information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="flex items-center gap-2 mb-2 text-slate-300">
                  <User size={18} />
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-slate-300">
                  <Mail size={18} />
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-slate-300">
                  <Phone size={18} />
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-slate-300">
                  <MapPin size={18} />
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500"
                />
              </div>

            </div>

          </div>

          {/* Academic Information */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

            <h2 className="text-2xl font-bold mb-6">
              Academic Details
            </h2>

            <div className="space-y-5">

              <div>
                <label className="flex items-center gap-2 mb-2 text-slate-300">
                  <GraduationCap size={18} />
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  value={profile.department}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-slate-300">
                  <Award size={18} />
                  CGPA
                </label>

                <input
                  type="number"
                  step="0.01"
                  name="cgpa"
                  value={profile.cgpa}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-slate-300">
                  <Calendar size={18} />
                  Graduation Year
                </label>

                <input
                  type="number"
                  name="graduationYear"
                  value={profile.graduationYear}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-indigo-500"
                />
              </div>

            </div>

          </div>

        </div>

                {/* Skills */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Wrench size={22} />
            Skills
          </h2>

          <p className="text-slate-400 mb-4">
            Enter your skills separated by commas.
          </p>

          <textarea
            rows={5}
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            placeholder="React, Node.js, MongoDB, Express, TypeScript"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-indigo-500 resize-none"
          />

          <div className="mt-6 flex flex-wrap gap-3">

            {skillsInput
              .split(",")
              .map((skill) => skill.trim())
              .filter((skill) => skill !== "")
              .map((skill) => (
                <span
                  key={skill}
                  className="bg-indigo-600 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}

          </div>

        </div>

        {/* Bottom Save Button */}

        <div className="flex justify-end">

          <button
            onClick={saveProfile}
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition disabled:opacity-60"
          >
            <Save size={20} />

            {saving ? "Saving..." : "Save Profile"}

          </button>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default StudentProfile;