const express = require('express')
const expressStatusMonitor = require('express-status-monitor');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config()



const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// Variables
const app = express()
const port = process.env.PORT

// Middlewares
app.use(cors({
    origin: '*', // Permite todas las solicitudes de cualquier dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Permite todos los métodos
    allowedHeaders: ['Content-Type', 'Authorization'] // Permite estos headers
}));
app.use(express.json()); 
app.use(expressStatusMonitor());
app.use(morgan('dev'));

// Swagger 
const swaggerDocument = YAML.load('./swagger.yaml'); // Cargar archivo Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`Documentación Swagger en http://localhost:${port}/api-docs`);
})