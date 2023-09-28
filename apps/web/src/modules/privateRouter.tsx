import { Navigate } from "react-router";
import { useAuthStore } from "./auth/hooks/useAuth";

const PrivateRouter = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
export default PrivateRouter
