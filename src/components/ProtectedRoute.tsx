import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedin");
    if (loggedIn !== "true") {
      // Redirect to vendor login if not logged in
      window.location.href = "http://localhost:8080/vendor/login";
    }
  }, [location]);

  const loggedIn = localStorage.getItem("loggedin");
  
  if (loggedIn !== "true") {
    return null; // Return null while redirecting
  }

  return <>{children}</>;
};

export default ProtectedRoute;

