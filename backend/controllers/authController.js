const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../services/userService');

const generateToken = (user) => {
    return jwt.sign({ id: user.Id, email: user.Name  }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const login = async (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).json({ message: 'Usuario o contraseña no proporcionados' });
    }

    try {
        userRecord = await getUserByEmail(user);

        if (!userRecord) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, userRecord.PasswordHash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = generateToken(userRecord);
        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

module.exports = { login };