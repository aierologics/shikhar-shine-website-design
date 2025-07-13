// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute:", { user, loading });


  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/auth" replace />;
  
};

export default ProtectedRoute;