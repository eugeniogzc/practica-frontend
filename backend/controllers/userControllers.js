const bcrypt = require("bcrypt");
const { poolPromise, sql } = require('../db');
const { tableName } = require('../models/userModel');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`SELECT * FROM ${tableName}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Crear nuevo usuario
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        console.log("Datos recibidos:", req.body); // Muestra los datos que llegan
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Contraseña encriptada:", hashedPassword);

        const pool = await poolPromise;
        await pool.request()
            .input('Name', sql.NVarChar, name)
            .input('Email', sql.NVarChar, email)
            .input('PasswordHash', sql.NVarChar, hashedPassword)
            .query(`INSERT INTO ${tableName} (Name, Email, PasswordHash) VALUES (@Name, @Email, @PasswordHash)`);

        res.status(201).json({ message: "Usuario creado" });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};


// Actualizar usuario
const updateUser = async (req, res) => {
    const { name, email } = req.body;
    const userId = req.params.Id || req.query.Id; 

    if (!userId || !name || !email) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('Id', sql.Int, userId)
            .input('Name', sql.NVarChar, name)
            .input('Email', sql.NVarChar, email)
            .query(`UPDATE ${tableName} SET Name = @Name, Email = @Email WHERE Id = @Id`);

        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
    const userId = req.params.Id || req.query.Id; 

    if (!userId) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('Id', sql.Int, userId)
            .query(`DELETE FROM ${tableName} WHERE Id = @Id`);
        res.send('Usuario eliminado');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getUsers, 
    createUser,
    updateUser,
    deleteUser,
};