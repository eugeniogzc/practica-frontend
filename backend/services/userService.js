const { poolPromise, sql } = require('../db');
const { tableName } = require('../models/userModel');

const getUserByEmail = async (email) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('email', sql.NVarChar, email)
        .query(`SELECT * FROM ${tableName} WHERE email = @email`);
    return result.recordset[0];
};

module.exports = { getUserByEmail };