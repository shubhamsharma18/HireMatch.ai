import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Loader from '../../../ui/Loader'

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen={true} type='spinner' text='Loading...' />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default ProtectedRoute;