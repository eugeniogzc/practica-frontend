import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";
import Contacto from "./pages/contacto/Contacto";
import Dashboard from "./pages/dashboard/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
    const { isLogged } = useAuth();
    return isLogged ? children : <Navigate to="/login" replace />;
}

function ProtectedNavbar({ children }) {
  const { isLogged } = useAuth();
  return isLogged ? children : "";
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <ProtectedNavbar>
                  <Navbar />
                </ProtectedNavbar>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/contacto" element={<ProtectedRoute><Contacto /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;