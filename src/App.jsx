import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import FloatingShape from "./components/FloatingIcon";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import VerifyMail from "./pages/VerifyMail";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth, isLoading } = useAuthStore();

  // Show a loader while checking authentication status
  if (isCheckingAuth || isLoading) {
    return <LoadingSpinner />;
  }

  // Redirect if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user is not verified, redirect to the verify email page
  if (user && !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};


const RedirectAuthenticated = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  console.log(user);

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};
function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
      >
        <FloatingShape
          color="bg-green-500"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />
        <FloatingShape
          color="bg-emerald-500"
          size="w-48 h-48"
          top="70%"
          left="80%"
          delay={5}
        />
        <FloatingShape
          color="bg-lime-500"
          size="w-32 h-32"
          top="40%"
          left="-10%"
          delay={2}
        />

        <Routes>
          {/* Add routes here */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectAuthenticated>
                <RegisterPage />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticated>
                <LoginPage />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/verify-email"
            element={
              <RedirectAuthenticated>
                <VerifyMail />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticated>
                <ForgotPasswordPage />
              </RedirectAuthenticated>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticated>
                <ResetPasswordPage />
              </RedirectAuthenticated>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
