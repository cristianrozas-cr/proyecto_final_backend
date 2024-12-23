import { pool } from '../db/db.js';
import format from 'pg-format';

const comprobarUsuario = async ({ columna, valor }) => {
    console.log(columna)
    const query = `
            SELECT * FROM usuarios 
            WHERE %s = %s;
        `;
    const formattedQuery = format(query, columna, valor)
    console.log(formattedQuery)
    const results = await pool.query(formattedQuery);

    return results
}

const registrarUsuario = async ({ email, password, nombre, apellido, telefono }) => {

    const query = `
        INSERT INTO usuarios values (default, %L, %L, %L, %L, %L)
        RETURNING id, email, nombre, apellido, telefono;`;
    const values = [email, password, nombre, apellido, telefono || null];
    const formattedQuery = format(query, ...values)
    console.log(formattedQuery)
    const results = await pool.query(formattedQuery);
    const newUser = results.rows[0]
    return newUser;
};

const infoUsuario = async (decoded) => {
    const values = [decoded.email]
    console.log(values)
    const consulta = 'SELECT * FROM usuarios WHERE email = $1'
    const results = await pool.query(consulta, values)
    return results
};

const actualizarPerfil = async ({ id, nombre, apellido, telefono, img_perfil }) => {
    const query = `
        UPDATE usuarios SET nombre = $1, apellido = $2, telefono = $3, img_perfil = $4
        WHERE id = $5 RETURNING *`;
    const values = [nombre, apellido, telefono, img_perfil, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
};
const deleteUsuario = async (id) => {
    const query = `
    DELETE FROM usuarios WHERE id = $1 RETURNING * `
    const values = [id]
    const { rows } = await pool.query(query, values);
    return rows[0]
}

export const consultasUsuarios = { comprobarUsuario, registrarUsuario, infoUsuario, deleteUsuario, actualizarPerfil }
