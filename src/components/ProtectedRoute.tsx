import { Navigate } from "react-router-dom";
import { useAuth, Role } from "@/hooks/useAuth";

interface Props {
  children: React.ReactNode;
  roles?: Role[];
}

const ProtectedRoute = ({ children, roles }: Props) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && user && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};
/*const ProtectedRoute = ({ children, roles }: Props) => {
  // هذا التعديل يتخطى فحص السيرفر بشكل مؤقت لفتح لوحة التحكم
  return <>{children}</>;
*/;
export default ProtectedRoute;