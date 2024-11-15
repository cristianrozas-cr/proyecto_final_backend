import { pool } from './db/db.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js'
import jsonwebtoken from 'jsonwebtoken';

const infoUsuario = async () => {

    const resultado = await pool.query('SELECT * FROM usuarios'); // Cambia 'users' a una tabla existente

    return resultado
}

export { infoUsuario }