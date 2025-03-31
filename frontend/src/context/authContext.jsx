import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const checkAuth = () => {
            setIsLogged(!!localStorage.getItem("token"));
        };

        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);