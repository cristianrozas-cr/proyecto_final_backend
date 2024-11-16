import { pool } from '../db/db.js';
import format from 'pg-format';
import bcrypt from 'bcryptjs/dist/bcrypt.js';



const verificarUsuario = async ({ email, telefono }) => {
    const query = `
            SELECT * FROM usuarios 
            WHERE email = '%s' OR telefono = '%s';
        `;
    const formattedQuery = format(query, email, telefono)

    const results = await pool.query(formattedQuery);
    console.log(results)
    return results
}

const registrarUsuario = async ({ email, password, nombre, apellido, telefono, img_perfil }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
        INSERT INTO usuarios values (%s, %s, %s, %s, %s, %s)`;
    const values = [email, hashedPassword, nombre, apellido, telefono, img_perfil];
    const formattedQuery = format(query, values)

    const results = await pool.query(formattedQuery);
    const newUser = results.rows[0]
    return newUser;
};

const loginUsuario = async (email, password) => {
    const query = "SELECT * FROM usuarios WHERE email = $1"
    const { rows, rowsCount } = await pool.query(query, [email]);
    if (!rowsCount) throw { code: 404, message: "usuario no encontrado" };
    const usuario = rows[0];
    const passwordMatch = await bcrypt.compare(password, usuario.password);
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { token };
};

const obtenerPerfil = async (id) => {
    const query = "SELECT * FROM usuarios WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

const actualizarPerfil = async (id, { nombre, apellido, telefono, img_perfil }) => {
    const query = `
        UPDATE usuarios SET nombre = $1, apelido = $2, telefono = $3, img_perfil = $4
        WHERE id = $5 RETURNING *`;
    const values = [nombre, apellido, telefono, img_perfil, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

export const consultasUsuarios = { verificarUsuario, registrarUsuario, loginUsuario, obtenerPerfil, actualizarPerfil }
