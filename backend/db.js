const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        enableArithAbort: true,
    },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Conectado a SQL Server Azure');
        return pool;
    })
    .catch(err => console.error('Error de conexión a SQL Server: ', err));

module.exports = {
    sql, poolPromise,
};