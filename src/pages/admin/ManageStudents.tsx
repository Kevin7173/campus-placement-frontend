import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getStudents,
  deleteStudent,
} from "../../api/adminManagement";
import { toast } from "react-hot-toast/headless";
import { UPLOAD_URL } from "../../config/api";
// Optional
// import defaultAvatar from "../../assets/default-avatar.png";

const ManageStudents = () => {

  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("All");

  const [sortBy, setSortBy] = useState("Newest");

  const [selectedStudent, setSelectedStudent] =
    useState<any>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, search, department, sortBy]);

  const loadStudents = async () => {

    try {

      setLoading(true);

      const res = await getStudents();

      setStudents(res.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const filterStudents = () => {

    let data = [...students];

    // Search

    if (search.trim()) {

      const keyword = search.toLowerCase();

      data = data.filter((student) =>
        student.fullName
          ?.toLowerCase()
          .includes(keyword)
      );

    }

    // Department Filter

    if (department !== "All") {

      data = data.filter(
        (student) =>
          student.department === department
      );

    }

    // Sorting

    if (sortBy === "Name") {

      data.sort((a, b) =>
        a.fullName.localeCompare(
          b.fullName
        )
      );

    }

    if (sortBy === "CGPA") {

      data.sort(
        (a, b) =>
          (Number(b.cgpa) || 0) -
          (Number(a.cgpa) || 0)
      );

    }

    setFilteredStudents(data);

  };

  const handleDelete = async (
    id: string
  ) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {

      await deleteStudent(id);

      toast.success(
  "Student deleted successfully"
);

      loadStudents();

    } catch (error) {

      console.error(error);

      toast.error(
  "Unable to delete student"
);

    }

  };

  return (

    <DashboardLayout role="admin">

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-4xl font-bold">

            Manage Students

          </h1>

          <p className="text-slate-400 mt-2">

            View, search and manage all registered students.

          </p>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

            <h3 className="text-slate-400">

              Total Students

            </h3>

            <p className="text-4xl font-bold mt-3">

              {students.length}

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

            <h3 className="text-slate-400">

              CSE Students

            </h3>

            <p className="text-4xl font-bold mt-3 text-indigo-400">

              {
                students.filter(
                  (s) => s.department === "CSE"
                ).length
              }

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

            <h3 className="text-slate-400">

              Average CGPA

            </h3>

            <p className="text-4xl font-bold mt-3 text-green-400">

              {
                students.length
                  ? (
                      students.reduce(
                        (sum, s) =>
                          sum +
                          (Number(s.cgpa) || 0),
                        0
                      ) / students.length
                    ).toFixed(2)
                  : "0"
              }

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

            <h3 className="text-slate-400">

              Resume Uploaded

            </h3>

            <p className="text-4xl font-bold mt-3 text-pink-400">

              {
                students.filter(
                  (s) => s.resume
                ).length
              }

            </p>

          </div>

        </div>

        {/* Search & Filters */}

        <div className="flex flex-col lg:flex-row gap-4">

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 bg-slate-800 rounded-xl p-3"
          />
                    <select
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            className="bg-slate-800 rounded-xl px-4 py-3"
          >
            <option>All</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>ME</option>
            <option>CE</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="bg-slate-800 rounded-xl px-4 py-3"
          >
            <option>Newest</option>
            <option>Name</option>
            <option>CGPA</option>
          </select>

        </div>

        {/* Student List */}

        {loading ? (

          <div className="flex justify-center items-center h-80">

            <h2 className="text-2xl font-bold">

              Loading Students...

            </h2>

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {filteredStudents.length === 0 ? (

              <div className="col-span-full text-center py-20">

                <h2 className="text-2xl font-semibold text-slate-400">

                  No students found.

                </h2>

              </div>

            ) : (

              filteredStudents.map((student) => (

                <div
                  key={student._id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500 transition duration-300"
                >

                  <div className="flex gap-5 items-center">

                    <img
                      src={
                        student.profileImage
                          ? `${UPLOAD_URL}/profile-images/${student.profileImage}`
                          : "https://via.placeholder.com/100"
                      }
                      alt={student.fullName}
                      className="w-24 h-24 rounded-full object-cover border-2 border-slate-700"
                    />

                    <div className="flex-1">

                      <h2 className="text-2xl font-bold">

                        {student.fullName}

                      </h2>

                      <p className="text-slate-400">

                        {student.email || "No Email"}

                      </p>

                      <p className="mt-2">

                        Department :
                        <span className="ml-2 font-semibold">

                          {student.department || "N/A"}

                        </span>

                      </p>

                      <p>

                        CGPA :
                        <span className="ml-2 font-semibold text-green-400">

                          {student.cgpa ?? "N/A"}

                        </span>

                      </p>

                    </div>

                  </div>

                  {/* Skills */}

                  <div className="mt-5 flex flex-wrap gap-2">

                    {student.skills?.length ? (

                      student.skills.map(
                        (
                          skill: string,
                          index: number
                        ) => (

                          <span
                            key={index}
                            className="bg-indigo-600 px-3 py-1 rounded-full text-sm"
                          >

                            {skill}

                          </span>

                        )
                      )

                    ) : (

                      <span className="text-slate-500 text-sm">

                        No skills added

                      </span>

                    )}

                  </div>

                  {/* Buttons */}

                  <div className="grid grid-cols-3 gap-3 mt-6">

                    <button
                      onClick={() =>
                        setSelectedStudent(student)
                      }
                      className="bg-indigo-600 hover:bg-indigo-500 rounded-lg py-2 font-semibold transition"
                    >

                      View

                    </button>

                    {student.resume ? (

                      <a
                        href={`${UPLOAD_URL}/resumes/${student.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-600 hover:bg-green-500 rounded-lg py-2 text-center font-semibold transition"
                      >

                        Resume

                      </a>

                    ) : (

                      <button
                        disabled
                        className="bg-slate-700 rounded-lg py-2 cursor-not-allowed"
                      >

                        No Resume

                      </button>

                    )}

                    <button
                      onClick={() =>
                        handleDelete(student._id)
                      }
                      className="bg-red-600 hover:bg-red-500 rounded-lg py-2 font-semibold transition"
                    >

                      Delete

                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        )}
                {/* Student Profile Modal */}

        {selectedStudent && (

          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8">

              {/* Header */}

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-3xl font-bold">

                  Student Profile

                </h2>

                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-3xl text-slate-400 hover:text-white transition"
                >

                  ×

                </button>

              </div>

              {/* Profile */}

              <div className="grid md:grid-cols-3 gap-8">

                <div className="flex flex-col items-center">

                  <img
                    src={
                      selectedStudent.profileImage
                       ? `${UPLOAD_URL}/profile-images/${selectedStudent.profileImage}`
                        : "https://via.placeholder.com/180"
                    }
                    alt={selectedStudent.fullName}
                    className="w-44 h-44 rounded-full object-cover border-4 border-indigo-600"
                  />

                  <h3 className="text-2xl font-bold mt-5">

                    {selectedStudent.fullName}

                  </h3>

                  <p className="text-slate-400">

                    {selectedStudent.department}

                  </p>

                </div>

                <div className="md:col-span-2 space-y-4">

                  <div className="grid md:grid-cols-2 gap-4">

                    <div className="bg-slate-800 rounded-xl p-4">

                      <p className="text-slate-400">

                        Email

                      </p>

                      <p className="font-semibold">

                        {selectedStudent.email || "N/A"}

                      </p>

                    </div>

                    <div className="bg-slate-800 rounded-xl p-4">

                      <p className="text-slate-400">

                        Phone

                      </p>

                      <p className="font-semibold">

                        {selectedStudent.phone || "N/A"}

                      </p>

                    </div>

                    <div className="bg-slate-800 rounded-xl p-4">

                      <p className="text-slate-400">

                        CGPA

                      </p>

                      <p className="text-green-400 font-bold">

                        {selectedStudent.cgpa || "N/A"}

                      </p>

                    </div>

                    <div className="bg-slate-800 rounded-xl p-4">

                      <p className="text-slate-400">

                        Year

                      </p>

                      <p className="font-semibold">

                        {selectedStudent.year || "N/A"}

                      </p>

                    </div>

                  </div>

                  <div className="bg-slate-800 rounded-xl p-5">

                    <h4 className="font-semibold mb-3">

                      Skills

                    </h4>

                    <div className="flex flex-wrap gap-2">

                      {selectedStudent.skills?.length ? (

                        selectedStudent.skills.map(
                          (
                            skill: string,
                            index: number
                          ) => (

                            <span
                              key={index}
                              className="bg-indigo-600 px-3 py-1 rounded-full text-sm"
                            >

                              {skill}

                            </span>

                          )
                        )

                      ) : (

                        <span className="text-slate-400">

                          No skills added

                        </span>

                      )}

                    </div>

                  </div>

                  <div className="bg-slate-800 rounded-xl p-5">

                    <h4 className="font-semibold mb-2">

                      Address

                    </h4>

                    <p>

                      {selectedStudent.address || "N/A"}

                    </p>

                  </div>

                </div>

              </div>

              {/* Footer */}

              <div className="flex flex-wrap gap-4 justify-end mt-8">

                {selectedStudent.resume ? (

                  <a
                    href={`${UPLOAD_URL}/resumes/${selectedStudent.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl font-semibold transition"
                  >

                    Download Resume

                  </a>

                ) : (

                  <button
                    disabled
                    className="bg-slate-700 px-6 py-3 rounded-xl cursor-not-allowed"
                  >

                    Resume Not Uploaded

                  </button>

                )}

                <button
                  onClick={() =>
                    setSelectedStudent(null)
                  }
                  className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold transition"
                >

                  Close

                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>

  );

};

export default ManageStudents;
