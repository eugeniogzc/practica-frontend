import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { TextField, Button, Box, Typography, Container } from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState("");
    const { setIsLogged } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: email, password })
            });

            if (!response.ok) {
                alert("Usuario o contraseña incorrectos");
                return;
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            setIsLogged(true);
            navigate("/");

        } catch (error) {
            console.error("Error durante el login:", error);
            alert("Hubo un problema al conectarse con el servidor");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!email || !password || !name) {
            alert("Por favor completa todos los campos.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    name,
                    password
                })
            });

            if (!response.ok) {
                alert("Error al registrar el usuario.");
                return;
            }

            alert("Usuario registrado exitosamente. Ahora puedes iniciar sesión.");
            setIsRegistering(false);

        } catch (error) {
            console.error("Error durante el registro:", error);
            alert("Hubo un problema al conectarse con el servidor");
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{
                marginTop: 8, display: "flex", flexDirection: "column",
                alignItems: "center", boxShadow: 3, padding: 4, borderRadius: 2, backgroundColor: "white"
            }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    {isRegistering ? "Registrarse" : "Iniciar Sesión"}
                </Typography>

                <Box component="form" onSubmit={isRegistering ? handleRegister : handleLogin} sx={{ width: "100%", mt: 1 }}>
                    {isRegistering && (
                        <TextField margin="normal" required fullWidth label="Nombre" type="text"
                            onChange={(e) => setName(e.target.value)} />
                    )}
                    <TextField margin="normal" required fullWidth label="Correo electrónico" type="email"
                        onChange={(e) => setEmail(e.target.value)} />
                    <TextField margin="normal" required fullWidth label="Contraseña" type="password"
                        onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
                        {isRegistering ? "Registrarse" : "Iniciar Sesión"}
                    </Button>
                </Box>

                <Button onClick={() => setIsRegistering(!isRegistering)} variant="text">
                    {isRegistering ? "¿Ya tienes una cuenta? Iniciar sesión" : "¿No tienes cuenta? Regístrate"}
                </Button>
            </Box>
        </Container>
    );
};

export default Login;