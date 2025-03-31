import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const API_URL = 'http://localhost:3000/api/users';

const Dashboard = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({ email: '', name: '', passwordHash: '' });
    const [editando, setEditando] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        cargarUsuarios();
    }, []);

    // Cargar usuarios desde la base de datos
    const cargarUsuarios = async () => {
        try {
            const response = await fetch(API_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error('Error cargando usuarios:', error);
        }
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
    };

    // Agregar usuario
    const agregarUsuario = async () => {
        if (nuevoUsuario.email && nuevoUsuario.name && nuevoUsuario.passwordHash) {
            try {
                console.log("Enviando usuario:", nuevoUsuario);
    
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        email: nuevoUsuario.email, 
                        name: nuevoUsuario.name, 
                        password: nuevoUsuario.passwordHash
                    })
                });
    
                const data = await response.json();
                console.log("Respuesta del servidor:", data);
    
                if (response.ok) {
                    cargarUsuarios(); // Recargar la lista de usuarios
                }
            } catch (error) {
                console.error('Error agregando usuario:', error);
            }
            setNuevoUsuario({ email: '', name: '', passwordHash: '' });
        }
    };
    

    // Editar usuario
    const editarUsuario = (usuario) => {
        setEditando(usuario.Id);
        setNuevoUsuario(usuario);
    };

    // Guardar cambios en usuario editado
    const guardarEdicion = async () => {
        try {
            const response = await fetch(`${API_URL}/${editando}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(nuevoUsuario)
            });
            if (response.ok) cargarUsuarios();
        } catch (error) {
            console.error('Error actualizando usuario:', error);
        }
        setEditando(null);
        setNuevoUsuario({ email: '', name: '', passwordHash: '' });
    };

    // Eliminar usuario
    const eliminarUsuario = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) cargarUsuarios();
        } catch (error) {
            console.error('Error eliminando usuario:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Gestión de Usuarios</h2>
            <div className="form-container">
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={nuevoUsuario.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={nuevoUsuario.name}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="passwordHash"
                    placeholder="Password"
                    value={nuevoUsuario.passwordHash}
                    onChange={handleChange}
                />
                {editando ? (
                    <button className="save-btn" onClick={guardarEdicion}>Guardar Cambios</button>
                ) : (
                    <button className="add-btn" onClick={agregarUsuario}>Agregar Usuario</button>
                )}
            </div>
            <ul className="user-list">
                {usuarios.map((usuario) => (
                    <li key={usuario.Id} className="user-item">
                        <span>{usuario.Email} - {usuario.Name}</span>
                        <div className="button-group">
                            <button className="edit-btn" onClick={() => editarUsuario(usuario)}>Editar</button>
                            <button className="delete-btn" onClick={() => eliminarUsuario(usuario.Id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;