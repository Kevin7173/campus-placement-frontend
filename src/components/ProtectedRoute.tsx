import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  allowedRole: string;
}

const ProtectedRoute = ({
  children,
  allowedRole,
}: Props) => {
  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;