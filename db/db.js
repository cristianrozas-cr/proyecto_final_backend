import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();  // Cargar las variables de entorno desde el archivo .env

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'defaultUser', // usuario por defecto, si no se define en .env
  password: process.env.DB_PASSWORD || 'defaultPassword', // contraseña por defecto
  database: process.env.DB_NAME || 'softjobs',
  port: process.env.DB_PORT || 5432,
  allowExitOnIdle: true,
});

export { pool };